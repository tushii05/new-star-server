const db = require('../config/config');
const { Op, Sequelize } = require("sequelize");
const RSS = require('rss');

module.exports = {
    getAll,
    getBySlugPost,
    getDataSlug,
    generateCategoriesRSS,
    getCategoryHierarchy
};

async function getAll({ orderBy = 'category_order', orderType = 'ASC', search = null, langId = 1 }, redisClient) {
    // const cacheKey = `categories_lang_${langId}_orderBy_${orderBy}_orderType_${orderType}_search_${search || 'none'}`;
    // try {
    //     const cachedData = await redisClient.get(cacheKey);
    //     if (cachedData) {
    //         console.log('Serving from cache');
    //         return JSON.parse(cachedData);
    //     }
    // } catch (err) {
    //     console.error('Error retrieving from cache:', err);
    // }

    const menuLimit = await db.general_settings.findOne();
    const showHomeLink = menuLimit ? menuLimit.show_home_link : 0;

    let categoryWhere = {
        show_on_menu: 1,
        lang_id: langId

    };

    if (search !== null) {
        categoryWhere = {
            ...categoryWhere,
            [Op.and]: [
                { [Op.or]: [{ parent_id: { [Op.like]: `%${search}%` } }] }
            ]
        };
    }

    const categoryOptions = {
        where: categoryWhere,
        attributes: ['id', 'lang_id', 'name', 'name_slug', 'parent_id', 'sub_parent_id', 'category_order',],
        order: [
            [orderBy, orderType],
            ['id', 'ASC']
        ],
    };

    const categoriesData = await db.categories.findAll(categoryOptions);

    let pagesData = [];
    try {
        pagesData = await db.pages.findAll({
            where: {
                lang_id: langId,
                [Op.or]: [
                    { location: 'main' },
                    {
                        [Op.and]: [
                            { location: 'none' },
                            { parent_id: { [Op.ne]: 0 } }
                        ]
                    }
                ],
                visibility: 1
            },
            attributes: ['id', 'lang_id', 'title', 'slug', 'description', 'keywords', 'page_default_name', 'parent_id'],
            order: [
                ['page_order', orderType]
            ]
        });
    } catch (err) {
        console.error('Error retrieving pages data:', err);
        throw err;
    }

    const categoriesJson = categoriesData.map(category => category.toJSON());

    const pagesJson = pagesData.map(page => page.toJSON());

    const categoryMap = new Map();
    const pageMap = new Map();

    categoriesJson.forEach(category => {
        categoryMap.set(category.id, { ...category, children: [], sub_children: [] });
    });

    pagesJson.forEach(page => {
        pageMap.set(page.id, { ...page, children: [] });
    });

    const rootCategories = [];
    const rootPages = [];

    categoriesJson.forEach(category => {
        const mappedCategory = categoryMap.get(category.id);
        if (category.parent_id === 0) {
            rootCategories.push(mappedCategory);
        }
        else if (category.sub_parent_id !== null) {
            const parentCategory = categoryMap.get(category.sub_parent_id);
            if (parentCategory) {
                parentCategory.sub_children.push(mappedCategory);
            }
        }
        else {
            const parentCategory = categoryMap.get(category.parent_id);
            if (parentCategory) {
                parentCategory.children.push(mappedCategory);
            }
        }
    });

    pagesJson.forEach(page => {
        const mappedPage = pageMap.get(page.id);
        if (page.parent_id === 0) {
            rootPages.push(mappedPage);
        } else {
            const parentPage = pageMap.get(page.parent_id);
            if (parentPage) {
                parentPage.children.push(mappedPage);
            }
        }
    });

    if (showHomeLink === 1) {
        rootCategories.unshift({
            name: 'Home',
            name_slug: '/',
            children: [],
            category_order: -1
        });
    }

    rootCategories.sort((a, b) => {
        const aOrder = a.category_order || 0;
        const bOrder = b.category_order || 0;
        return (orderType === 'ASC' ? 1 : -1) * (aOrder - bOrder);
    });

    rootPages.sort((a, b) => {
        const aOrder = a.page_order || 0;
        const bOrder = b.page_order || 0;
        return (orderType === 'ASC' ? 1 : -1) * (aOrder - bOrder);
    });

    const combinedData = [...rootCategories, ...rootPages];

    combinedData.sort((a, b) => {
        const aOrder = a.category_order !== undefined ? a.category_order : a.page_order || 0;
        const bOrder = b.category_order !== undefined ? b.category_order : b.page_order || 0;
        return (orderType === 'ASC' ? 1 : -1) * (aOrder - bOrder);
    });
    const response = {
        total: combinedData.length,
        menuLimit: menuLimit.menu_limit,
        category: combinedData
    };
    // try {
    //     await redisClient.set(cacheKey, JSON.stringify(response), { EX: 6000 });
    //     console.log('Data cached successfully');
    // } catch (err) {
    //     console.error('Error setting cache:', err);
    // }

    return response;
}

async function getBySlugPost(query) {
    try {
        const { name_slug, lang_id =1, page = 1, pageSize = 10, orderBy = 'created_at', orderType = 'DESC' } = query;

        const offset = (page - 1) * pageSize;
        const limit = parseInt(pageSize, 10);

        const data = await db.categories.findOne({
            where: { name_slug, lang_id },
            include: [{
                model: db.posts,
                attributes: ['id', 'lang_id', 'title', 'category_id', 'title_slug', 'summary', 'keywords', 'image_mid', 'isOld', 'pageviews', 'created_at', 'image_url',
                    [Sequelize.literal(`(SELECT COUNT(*) FROM comments WHERE comments.post_id = posts.id)`), 'comment_count']
                ],
                as: 'posts',
                where: { status: 1, is_scheduled: 0 },
                order: [[orderBy, orderType]],
                limit,
                offset,
                include: {
                    model: db.users,
                    attributes: ['id', 'username', 'slug']
                }
            }]
        });

        return data;
    } catch (error) {
        throw new Error(error);
    }
}

async function getDataSlug(query, langId) {
    try {
        const { slug } = query;

        const pagesData = await db.pages.findOne({
            where: { slug, lang_id: langId, visibility: 1 },
            attributes: ['id', 'title', 'description', 'slug', 'page_default_name']
        });

        const postsData = await db.posts.findOne({
            where: { title_slug: slug, lang_id: langId, visibility: 1, status: 1, is_scheduled: 0 },
            attributes: ['id', 'title', 'title_slug']
        });

        const singleCategoryData = await db.categories.findOne({
            where: { name_slug: slug, lang_id: langId },
            attributes: ['id', 'name', 'description', 'name_slug', 'parent_id']
        });

        let matchedCategoryWithHierarchy = null;
        if (singleCategoryData) {
            const allCategoriesData = await db.categories.findAll({
                attributes: ['id', 'name', 'description', 'name_slug', 'parent_id', 'sub_parent_id']
            });

            const categoriesJson = allCategoriesData.map(category => category.toJSON());
            const categoryMap = new Map();

            categoriesJson.forEach(category => {
                categoryMap.set(category.id, { ...category, children: [], sub_children: [] });
            });

            categoriesJson.forEach(category => {
                const mappedCategory = categoryMap.get(category.id);

                if (category.parent_id === 0) {
                } else if (category.sub_parent_id !== null) {
                    const parentCategory = categoryMap.get(category.sub_parent_id);
                    if (parentCategory) {
                        parentCategory.sub_children.push(mappedCategory);
                    }
                } else {
                    const parentCategory = categoryMap.get(category.parent_id);
                    if (parentCategory) {
                        parentCategory.children.push(mappedCategory);
                    }
                }
            });

            matchedCategoryWithHierarchy = categoryMap.get(singleCategoryData.id);
        }

        if (pagesData) {
            return { type: 'page', data: pagesData };
        } else if (postsData) {
            return { type: 'post', data: postsData };
        } else if (singleCategoryData) {
            return { type: 'category', data: matchedCategoryWithHierarchy };
        } else {
            return { message: 'No match found' };
        }
    } catch (error) {
        throw new Error(error);
    }
}

async function getLanguageSettings(langId) {
    const settings = await db.settings.findOne({
        where: { lang_id: langId }
    });
    if (!settings) throw new Error('Language settings not found');

    const language = await db.languages.findOne({
        where: { id: settings.lang_id }
    })
    return {
        title: settings.site_title,
        description: settings.site_description,
        langName: language.short_form,
        copyright: settings.copyright
    };
}

async function getCategoryByIdentifier(identifier) {
    let whereCondition;
    if (!/^\d+$/.test(identifier)) {
        whereCondition = { name_slug: identifier };
    } else {
        whereCondition = { id: parseInt(identifier, 10) };
    }

    const category = await db.categories.findOne({
        where: whereCondition,
        attributes: ['id', 'name', 'name_slug']
    });
    if (!category) throw new Error('Category not found');
    return category;
}

async function getCategoryPosts(categoryId, langId) {
    const postAttributes = [
        'id', 'lang_id', 'title', 'title_slug', 'summary', 'image_default', 'pageviews',
        'post_type', 'category_id', 'isOld',  'created_at', 'keywords', 'image_mid', 'image_big',
    ];

    return await db.posts.findAll({
        where: { category_id: categoryId, lang_id: langId },
        attributes: postAttributes,
        include: [{
            model: db.users,
            attributes: ['username']
        }],
        order: [['created_at', 'DESC']],
    });
}

function createRSSFeed(languageSettings, category, posts) {
    const feed = new RSS({
        title: `${languageSettings.title} - : ${category.name}`,
        description: `${languageSettings.title} - : ${category.name}`,
        feed_url: `${process.env.BASE_URL}/rss/category/${languageSettings.langName}/${category.name_slug}`,
        custom_elements: [
            { link: `${process.env.BASE_URL}/rss/category/${languageSettings.langName}/${category.name_slug}` },
            { 'dc:language': languageSettings.langName },
            { 'dc:rights': languageSettings.copyright }
        ]
    });

    posts.forEach(post => {
        feed.item({
            title: post.title,
            url: `${process.env.BASE_URL}/${languageSettings.langName}/${post.title_slug}`,
            description: post.summary,
            enclosure: { url: `${process.env.IMAGE_URL}/${post.image_default}`, type: 'image/jpeg' },
            date: post.created_at,
            custom_elements: [
                { 'dc:creator': post.user.username },
                { 'dc:keywords': post.keywords }
            ]
        });
    });

    return feed.xml({ indent: true });
}

async function generateCategoriesRSS(identifier, langId) {
    try {
        const category = await getCategoryByIdentifier(identifier);
        const languageSettings = await getLanguageSettings(langId);
        const posts = await getCategoryPosts(category.id, langId);
        return createRSSFeed(languageSettings, category, posts);
    } catch (error) {
        console.error('Error generating RSS feed:', error);
        throw error;
    }
}

async function getCategoryHierarchy(identifier, type = 'category') {
    const categoryAttributes = ['id', 'name', 'name_slug', 'parent_id', 'sub_parent_id'];

    if (type === 'page') {

        const page = await db.pages.findOne({
            where: { slug: identifier },
            attributes: ['id', 'title', 'slug', 'parent_id'],
        });

        if (!page) {
            return {
                parent: [],
                sub_parent: [],
            };
        }
        let parent = [];
        let sub_parent = [];
        if ((page.parent_id === null || page.parent_id === 0)) {
            parent.push(page);
            return {
                parent,
                sub_parent: [],
            };
        }
        else if (page.parent_id !== null && page.parent_id !== 0) {
            parent = await db.pages.findAll({
                where: { id: page.parent_id },
                attributes: ['id', 'title', 'slug', 'parent_id'],
            });
            sub_parent.push(page);
            return {
                parent,
                sub_parent,
            };
        }

        return {
            parent,
            sub_parent,
        };
    }

    const category = await db.categories.findOne({
        where: { name_slug: identifier },
        attributes: categoryAttributes,
    });

    if (!category) {
        return {
            parent: [],
            sub_parent: [],
            children: [],
        };
    }

    let parent = [];
    let sub_parent = [];
    let children = [];

    if ((category.parent_id === null || category.parent_id === 0) && (category.sub_parent_id === null || category.sub_parent_id === 0)) {
        parent.push(category);
        return {
            parent,
            sub_parent: [],
            children: [],
        };
    } else if (category.parent_id !== null && category.parent_id !== 0 && (category.sub_parent_id === null || category.sub_parent_id === 0)) {
        parent = await db.categories.findAll({
            where: { id: category.parent_id },
            attributes: categoryAttributes,
        });
        sub_parent.push(category);
        return {
            parent,
            sub_parent,
            children: [],
        };
    } else if (category.parent_id !== null && category.parent_id !== 0 && category.sub_parent_id !== null && category.sub_parent_id !== 0) {
        const [parentData, subParentData, childrenData] = await Promise.all([
            db.categories.findAll({
                where: { id: category.parent_id },
                attributes: categoryAttributes,
            }),
            db.categories.findAll({
                where: { id: category.sub_parent_id },
                attributes: categoryAttributes,
            }),
            db.categories.findAll({
                where: {
                    parent_id: category.parent_id,
                    sub_parent_id: category.sub_parent_id,
                },
                attributes: categoryAttributes,
            }),
        ]);

        parent = parentData;
        sub_parent = subParentData;
        children = childrenData;
    }

    return {
        parent,
        sub_parent,
        children,
    };
}