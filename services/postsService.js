const db = require('../config/config');
const { Op, Sequelize } = require("sequelize");

module.exports = {
    getAll,
    getByIdentifier,
    getHomePageData,
    getPageData,
    getPostsByCategory,
    commentCreate,
    views,
    commentDelete,
    answerPoll,

    getData
};


async function getAll({ page = 1, pageSize = 10, orderBy = 'id', orderType = 'DESC', tag = null, title = null, langId = null, post_type = null }, redisClient) {

    page = Math.max(1, parseInt(page, 10));
    pageSize = Math.max(1, parseInt(pageSize, 10));

    const offset = (page - 1) * pageSize;
    let where = {
        status: 1,
        is_scheduled: 0
    };


    if (tag !== null) {
        where = {
            ...where,
            [Op.or]: [
                { keywords: { [Op.like]: `%${tag}%` } }
            ]
        };
    }

    if (title !== null) {
        where = {
            ...where,
            title: { [Op.like]: `%${title}%` },
        };
    }
    if (langId !== null) {
        where = {
            ...where,
            lang_id: { [Op.like]: `%${langId}%` },
        };
    }

    if (post_type !== null) {
        where = {
            ...where,
            post_type: { [Op.like]: `%${post_type}%` },
        };
    }


    // const cacheKey = `posts_${page}_${pageSize}_${orderBy}_${orderType}_${tag || 'none'}_${title}_${langId}`;

    // try {
    //     const cachedData = await redisClient.get(cacheKey);
    //     if (cachedData) {
    //         console.log('Serving from cache');
    //         return JSON.parse(cachedData);
    //     }
    // } catch (err) {
    //     console.error('Error retrieving from cache:', err);
    // }

    const result = await db.posts.findAndCountAll({
        where,
        offset,
        limit: pageSize,
        order: [[orderBy, orderType]],
        attributes: ['id', 'title', 'title_slug', 'summary', 'keywords', 'post_type', 'isOld', 'image_url', 'image_default', 'image_mid', 'pageviews', 'created_at'],
        include: [
            {
                model: db.categories,
                attributes: ['id', 'name', 'name_slug']
            }, {
                model: db.users,
                attributes: ['id', 'username', 'slug']
            }]
    });

    const totalPages = parseInt(Math.ceil(result.count / pageSize));

    if (page > totalPages) {
        return { message: "No more data" };
    }

    const response = {
        total: result.count,
        totalPages,
        currentPage: parseInt(page),
        pageSize,
        posts: result.rows
    };

    // try {
    //     await redisClient.set(cacheKey, JSON.stringify(response), { EX: 6000 });
    //     console.log('Data cached successfully');
    // } catch (err) {
    //     console.error('Error setting cache:', err);
    // }
    return response;
}

// async function getByIdentifier(identifier) {
//     let whereCondition;

//     if (isNaN(parseInt(identifier, 10))) {
//         whereCondition = { title_slug: identifier };
//     } else {
//         whereCondition = { id: parseInt(identifier, 10) };
//     }
//     try {
//         const result = await db.posts.findOne({
//             where: whereCondition,
//             include: [
//                 {
//                     model: db.post_audios,
//                     include: [
//                         {
//                             model: db.audios,
//                             attributes: ['id', 'audio_name', 'audio_path']
//                         }
//                     ],
//                 },
//                 {
//                     model: db.categories,
//                     attributes: ['id', 'name', 'name_slug']
//                 },
//                 {
//                     model: db.users,
//                     attributes: ['id', 'username','slug']
//                 }
//             ]
//         });

//         if (!result) {
//             return { message: "Post not found" };
//         }

//         if (isNaN(parseInt(identifier, 10))) {
//             const sortedListItem = await db.post_sorted_list_items.findAll({
//                 where: { post_id: result.id },
//                 order: [['item_order', 'ASC']]
//             });

//             if (sortedListItem) {
//                 return {
//                     post: result,
//                     post_sorted_list_item: sortedListItem
//                 };
//             }
//         }

//         return {
//             post: result
//         };
//     } catch (error) {
//         console.error('Error fetching post by ID:', error);
//         return { message: "An error occurred" };
//     }
// }


// async function getHomePageData(redisClient, langId = 1) {
//     const cacheKey = `homepage_data_${langId}`;

//     try {
//         const cachedData = await redisClient.get(cacheKey);
//         if (cachedData) {
//             console.log('Serving home page data from cache');
//             return JSON.parse(cachedData);
//         }
//     } catch (err) {
//         console.error('Error retrieving home page data from cache:', err);
//     }

//     try {
//         const postAttributes = ['id', 'title', 'title_slug', 'summary', 'image_url', 'pageviews', 'created_at', 'image_mid', 'image_big'];
//         const categoryAttributes = ['id', 'name'];

//         const [featuredPosts, breakingNews, categories, videos] = await Promise.all([
//             db.posts.findAll({
//                 where: { is_featured: 1, lang_id: langId },
//                 limit: 8,
//                 order: [['created_at', 'DESC']],
//                 attributes: postAttributes,
//                 include: [{ model: db.categories, attributes: categoryAttributes, as: 'category' }]
//             }),
//             db.posts.findAll({
//                 where: { is_breaking: 1, lang_id: langId },
//                 limit: 8,
//                 order: [['created_at', 'DESC']],
//                 attributes: postAttributes,
//                 include: [{ model: db.categories, attributes: categoryAttributes, as: 'category' }]
//             }),
//             db.categories.findAll({
//                 where: { show_on_menu: true, parent_id: 0, lang_id: langId },
//                 order: [['category_order', 'ASC']],
//             }),
//             db.posts.findAll({
//                 where: { post_type: 'video', lang_id: langId },
//                 limit: 8,
//                 order: [['created_at', 'DESC']],
//                 attributes: postAttributes,
//                 include: [{ model: db.categories, attributes: categoryAttributes, as: 'category' }]
//             })
//         ]);

//         const categorizedPosts = await Promise.all(categories.map(async (category) => {
//             const posts = await db.posts.findAll({
//                 where: {
//                     category_id: category.id,
//                     lang_id: langId
//                 },
//                 limit: 8,
//                 order: [['created_at', 'DESC']],
//                 attributes: postAttributes,
//             });
//             return {
//                 categoryName: category.name,
//                 categoryId: category.id,
//                 posts,
//             };
//         }));

//         const response = { featuredPosts, breakingNews, categorizedPosts, videos };

//         try {
//             await redisClient.set(cacheKey, JSON.stringify(response), { EX: 6000 });
//             console.log('Home page data cached successfully');
//         } catch (err) {
//             console.error('Error setting home page data cache:', err);
//         }

//         return response;
//     } catch (error) {
//         console.error('Error fetching home page data:', error);
//         throw error;
//     }
// }

async function getByIdentifier(identifier, userId = null, req, page = 1, pageSize = 10) {
    let whereCondition;
    if (!/^\d+$/.test(identifier)) {
        whereCondition = { title_slug: identifier };
    } else {
        whereCondition = { id: parseInt(identifier, 10) };
    }
    try {
        const commentValue = await db.general_settings.findOne();

        const result = await db.posts.findOne({
            where: whereCondition,
            include: [
                {
                    model: db.post_audios,
                    include: [
                        {
                            model: db.audios,
                            attributes: ['id', 'audio_name', 'audio_path']
                        }
                    ]
                },
                {
                    model: db.post_files,
                    include: [
                        {
                            model: db.files,
                            attributes: ['id', 'file_name', 'file_path']
                        }
                    ]
                },
                {
                    model: db.categories,
                    attributes: ['id', 'name', 'name_slug']
                },
                {
                    model: db.users,
                    attributes: ['id', 'username', 'avatar', 'slug']
                },
                {
                    model: db.tags,
                    attributes: ['tag', 'tag_slug']
                },
                {
                    model: db.post_images,
                    attributes: ['image_big', 'image_default']
                }
            ]
        });

        if (!result) {
            return { message: "Post not found" };
        }

        const comments = await db.comments.findAll({
            where: { post_id: result.id, status: 1 },
            attributes: ['id', 'comment', 'created_at', 'user_id', 'parent_id'],
            order: [['created_at', 'ASC']],
            include: [
                {
                    model: db.users,
                    attributes: ['id', 'username', 'avatar']
                }
            ]
        });

        const nestComments = (comments) => {
            const commentMap = {};
            const nestedComments = [];

            comments.forEach(comment => {
                comment.dataValues.childComments = [];
                commentMap[comment.dataValues.id] = comment.dataValues;
            });

            comments.forEach(comment => {
                const parentId = comment.dataValues.parent_id;
                if (parentId === 0) {
                    nestedComments.push(comment.dataValues);
                } else if (commentMap[parentId]) {
                    commentMap[parentId].childComments.push(comment.dataValues);
                }
            });

            return nestedComments;
        };

        const nestedCommentStructure = nestComments(comments);

        const totalComments = comments.length;

        let sortedListItems = null;
        if (!/^\d+$/.test(identifier)) {
            sortedListItems = await db.post_sorted_list_items.findAll({
                where: { post_id: result.id },
                order: [['item_order', 'ASC']]
            });
        }

        let table_of_contents = null;
        if (result.post_type === "table_of_contents") {
            const tableOfContentsItems = await db.post_sorted_list_items.findAll({
                where: { post_id: result.id },
                order: [['item_order', 'ASC']],
                raw: true
            });

            const modifiedTableOfContentsItems = tableOfContentsItems.map((item, index) => ({
                ...item,
                index: index,
                children: [],
            }));

            function buildTree(items) {
                const itemMap = new Map();
                const result = [];

                items.forEach(item => {
                    item.children = [];
                    itemMap.set(item.index, item);
                });

                items.forEach(item => {
                    if (item.parent_link_num === 0) {
                        result.push(item);
                    } else {
                        const parentItem = itemMap.get(item.parent_link_num - 1);
                        if (parentItem) {
                            parentItem.children.push(item);
                        }
                    }
                });

                return result;
            }
            table_of_contents = buildTree(modifiedTableOfContentsItems);
            sortedListItems = null
        }

        let trivia_quiz = null;
        if (result.post_type === "trivia_quiz") {
            const quizQuestions = await db.quiz_questions.findAll({
                where: { post_id: result.id },
                include: [{
                    model: db.quiz_answers,
                }]
            });
            trivia_quiz = quizQuestions;
        }

        let personality_quiz = null;
        if (result.post_type === "personality_quiz") {
            const quizQuestions = await db.quiz_questions.findAll({
                where: { post_id: result.id },
                include: [{
                    model: db.quiz_answers,
                    include: {
                        model: db.quiz_results,
                    }
                }]
            });
            personality_quiz = quizQuestions;
        }

        let poll = null;
        if (result.post_type === "poll") {
            const quizQuestions = await db.quiz_questions.findAll({
                where: { post_id: result.id },
                include: [{
                    model: db.quiz_answers,
                }]
            });

            for (let question of quizQuestions) {
                const totalVotes = await db.post_poll_votes.count({
                    where: { question_id: question.id }
                });

                question.dataValues.total_votes = totalVotes;

                for (let answer of question.quiz_answers) {
                    const answerVotes = await db.post_poll_votes.count({
                        where: {
                            question_id: question.id,
                            answer_id: answer.id
                        }
                    });

                    const percentage = totalVotes > 0 ? ((answerVotes / totalVotes) * 100).toFixed(2) : 0;

                    answer.dataValues.vote_count = answerVotes;
                    answer.dataValues.percentage = percentage;
                }
            }

            poll = quizQuestions;
        }

        let readingListData = null;
        if (userId) {
            readingListData = await db.reading_lists.findOne({
                where: { post_id: result.id, user_id: userId },
            });
        }

        return {
            post: result,
            comments: nestedCommentStructure || [],
            totalComments: totalComments || 0,
            post_sorted_list_item: sortedListItems || null,
            table_of_contents_item: table_of_contents || null,
            trivia_quiz_item: trivia_quiz || null,
            personality_quiz_item: personality_quiz || null,
            poll_item: poll || null,
            saved: readingListData || null,
            comment_system: commentValue.comment_system || null

        };
    } catch (error) {
        console.error('Error fetching post by identifier:', error);
        return { message: "An error occurred" };
    }
}

async function getHomePageData(redisClient, langId = 1) {
    // const cacheKey = `homepage_data_${langId}`;

    // try {
    //     const cachedData = await redisClient.get(cacheKey);
    //     if (cachedData) {
    //         console.log('Serving home page data from cache');
    //         return JSON.parse(cachedData);
    //     }
    // } catch (err) {
    //     console.error('Error retrieving home page data from cache:', err);
    // }

    try {
        // const postAttributes = ['id', 'title', 'title_slug', 'summary', 'post_type', 'image_url', 'pageviews', 'created_at', 'image_mid', 'image_big'];
        const postAttributes = [
            'id', 'title', 'title_slug', 'summary', 'image_url', 'pageviews',
            'post_type', 'category_id', 'created_at', 'isOld', 'image_mid', 'image_big',
            [Sequelize.literal(`(SELECT COUNT(*) FROM comments WHERE comments.post_id = posts.id)`), 'comment_count']
        ];

        const categoryAttributes = ['id', 'name'];

        const [featuredPosts, breakingNews, categories, videos] = await Promise.all([
            db.posts.findAll({
                where: { is_featured: 1, lang_id: langId, status: 1, is_scheduled: 0 },
                limit: 8,
                order: [['created_at', 'DESC']],
                attributes: postAttributes,
                include: [{ model: db.categories, attributes: categoryAttributes, as: 'category' },
                {
                    model: db.users,
                    attributes: ['id', 'username', 'slug']
                }]
            }),
            db.posts.findAll({
                where: { is_breaking: 1, lang_id: langId, status: 1, is_scheduled: 0 },
                limit: 8,
                order: [['created_at', 'DESC']],
                attributes: postAttributes,
                include: [{ model: db.categories, attributes: categoryAttributes, as: 'category' },
                {
                    model: db.users,
                    attributes: ['id', 'username', 'slug']
                }]
            }),
            db.categories.findAll({
                where: { show_on_menu: true, lang_id: langId },
                order: [['category_order', 'ASC']],
            }),
            db.posts.findAll({
                where: { post_type: 'video', lang_id: langId, status: 1, is_scheduled: 0 },
                limit: 8,
                order: [['created_at', 'DESC']],
                attributes: postAttributes,
                include: [{ model: db.categories, attributes: categoryAttributes, as: 'category' },
                {
                    model: db.users,
                    attributes: ['id', 'username', 'slug']
                }]
            })
        ]);

        const categorizedPosts = await Promise.all(categories.map(async (category) => {

            const childCategories = await db.categories.findAll({
                where: { parent_id: category.id, lang_id: langId },
                attributes: ['id', 'name', 'name_slug'],
            });

            const posts = await db.posts.findAll({
                where: {
                    [Sequelize.Op.or]: [
                        { category_id: category.id },
                        { '$category.parent_id$': category.id }
                    ],
                    lang_id: langId, status: 1, is_scheduled: 0
                },
                limit: 8,
                order: [['created_at', 'DESC']],
                attributes: postAttributes,
                include: [
                    {
                        model: db.categories,
                        attributes: ['parent_id', 'name_slug']
                    },
                    {
                        model: db.users,
                        attributes: ['id', 'username', 'slug']
                    }
                ]
            });
            if (posts.length > 0 && category.parent_id === 0) {

                return {
                    categoryName: category.name,
                    categoryId: category.id,
                    childCategories: childCategories.map((child) => ({
                        id: child.id,
                        name: child.name,
                        name_slug: child.name_slug
                    })),
                    posts,
                };
            }
        }));

        const response = {};
        if (featuredPosts.length > 0) response.featuredPosts = featuredPosts;
        if (breakingNews.length > 0) response.breakingNews = breakingNews;
        if (categorizedPosts.filter(Boolean).length > 0) response.categorizedPosts = categorizedPosts.filter(Boolean);
        if (videos.length > 0) response.videos = videos;

        // if (Object.keys(response).length > 0) {

        //     try {
        //         await redisClient.set(cacheKey, JSON.stringify(response), { EX: 6000 });
        //         console.log('Home page data cached successfully');
        //     } catch (err) {
        //         console.error('Error setting home page data cache:', err);
        //     }
        // }
        return response;
    } catch (error) {
        console.error('Error fetching home page data:', error);
        throw error;
    }
}

// async function getPageData(pageId) {
//     const pageData = await db.pages.findOne({
//         where: { id: pageId },
//     });

//     if (!pageData) {
//         throw new Error('Page not found');
//     }

//     return pageData;
// }

async function getPageData(pageIdentifier) {
    const where = isNaN(pageIdentifier) ? { slug: pageIdentifier } : { id: pageIdentifier };

    const pageData = await db.pages.findOne({
        where,
    });

    if (!pageData) {
        throw new Error('Page not found');
    }

    return pageData;
}


// async function getPostsByCategory({ page = 1, pageSize = 10, orderBy = 'id', orderType = 'DESC', categoryId }) {
//     page = Math.max(1, parseInt(page, 10));
//     pageSize = Math.max(1, parseInt(pageSize, 10));

//     const offset = (page - 1) * pageSize;

//     const where = {
//         category_id: categoryId, status: 1, is_scheduled: 0
//     };

//     const result = await db.posts.findAndCountAll({
//         where,
//         offset,
//         limit: pageSize,
//         order: [[orderBy, orderType]],
//         attributes: ['id', 'title', 'summary', 'keywords', 'image_default', 'post_type', 'image_big', 'pageviews', 'created_at',
//             [Sequelize.literal(`(SELECT COUNT(*) FROM comments WHERE comments.post_id = posts.id)`), 'comment_count']
//         ],
//         include: [{
//             model: db.categories,
//             attributes: ['id', 'name', 'name_slug']
//         },
//         {
//             model: db.users,
//             attributes: ['id', 'username', 'slug']
//         }]
//     });

//     const totalPages = Math.ceil(result.count / pageSize);

//     if (page > totalPages) {
//         return { message: "No more data" };
//     }

//     return {
//         total: result.count,
//         totalPages,
//         currentPage: page,
//         pageSize,
//         posts: result.rows
//     };
// }

async function getPostsByCategory({ page = 1, pageSize = 10, orderBy = 'id', orderType = 'DESC', categoryId, categorySlug }) {
    page = Math.max(1, parseInt(page, 10));
    pageSize = Math.max(1, parseInt(pageSize, 10));

    const offset = (page - 1) * pageSize;

    let where = {
        status: 1,
        is_scheduled: 0,
    };

    if (categoryId) {
        where.category_id = categoryId;
    } else if (categorySlug) {
        const category = await db.categories.findOne({ where: { name_slug: categorySlug } });
        if (!category) {
            return { message: "Category not found" };
        }
        where.category_id = category.id;
    }

    const result = await db.posts.findAndCountAll({
        where,
        offset,
        limit: pageSize,
        order: [[orderBy, orderType]],
        attributes: ['id', 'title', 'summary', 'keywords', 'image_default', 'post_type', 'image_big', 'pageviews', 'created_at',
            [Sequelize.literal(`(SELECT COUNT(*) FROM comments WHERE comments.post_id = posts.id)`), 'comment_count']
        ],
        include: [{
            model: db.categories,
            attributes: ['id', 'name', 'name_slug']
        },
        {
            model: db.users,
            attributes: ['id', 'username', 'slug']
        }]
    });

    const totalPages = Math.ceil(result.count / pageSize);

    if (page > totalPages) {
        return { message: "No more data" };
    }

    return {
        total: result.count,
        totalPages,
        currentPage: page,
        pageSize,
        posts: result.rows
    };
}

async function commentCreate(params, req) {
    try {
        const ipAddress = getIp(req);
        params.ip_address = ipAddress;

        const setting = await db.general_settings.findOne({
            attributes: ['comment_approval_system']
        });


        const user = await db.users.findOne({
            where: { email: params.email },
            attributes: ['id']
        });

        if (user) {
            params.user_id = user.id;
        } else {
            params.user_id = 0;
        }

        if (setting.comment_approval_system === 1) {
            params.status = 0;
        } else {
            params.status = 1;
        }
        const comments = await db.comments.create(params);
        return comments;
    } catch (error) {
        throw error;
    };
};

async function views(req, params) {
    const { post_id, post_user_id } = params;

    try {
        const user_agent = req.headers['user-agent'];
        const ipAddress = getIp(req);
        params.ip_address = ipAddress;
        params.user_agent = user_agent;
        const existingView = await db.post_pageviews_month.findOne({
            where: { post_id, user_agent }
        });

        if (existingView) {
            return { message: 'View already exists for this post and user_agent address.' };
        }

        const newView = await db.post_pageviews_month.create({
            post_id,
            post_user_id,
            ip_address: ipAddress,
            user_agent
        });

        await db.posts.increment('pageviews', {
            by: 1,
            where: { id: post_id }
        });

        await db.users.increment('total_pageviews', {
            by: 1,
            where: { id: post_user_id }
        });

        return newView;
    } catch (error) {
        console.error('Error saving post view:', error);
        throw error;
    }
}

const getIp = (req) => {
    let ip;
    if (req.headers["x-forwarded-for"]) {
        ip = req.headers["x-forwarded-for"].split(",").pop().trim();
    } else if (req.connection && req.connection.remoteAddress) {
        ip = req.connection.remoteAddress;
    } else {
        ip = req.ip;
    }

    if (ip.includes("::")) {
        ip = ip.split(":").pop();
    }
    return ip;
};

async function commentDelete(params) {
    try {
        const { user_id, comment_id } = params;
        const existingComment = await db.comments.findOne({
            where: { id: comment_id, user_id: user_id },
        });

        if (!existingComment) {
            throw new Error('Comment not found or you do not have permission to delete this comment.');
        }

        const childComments = await db.comments.findAll({
            where: { parent_id: comment_id },
        });

        if (childComments.length > 0) {
            await db.comments.destroy({
                where: { parent_id: comment_id },
            });
        }

        await db.comments.destroy({
            where: { id: comment_id },
        });

        return { message: 'Comment and its replies (if any) have been deleted successfully.' };
    } catch (error) {
        throw error;
    }
}

async function answerPoll(params, req) {
    try {
        const ipAddress = getIp(req);
        params.ip_address = ipAddress;

        if (params.user_id === 0) {
            const existingVote = await db.post_poll_votes.findOne({
                where: {
                    ip_address: params.ip_address,
                    question_id: params.question_id
                }
            });

            if (existingVote) {
                return {
                    message: 'You have already voted on this poll with this IP address.',
                    statusCode: 403
                };
            }
        } else {
            const existingVote = await db.post_poll_votes.findOne({
                where: {
                    user_id: params.user_id,
                    question_id: params.question_id
                }
            });

            if (existingVote) {
                return {
                    message: 'You have already voted on this poll.',
                    statusCode: 403
                };
            }
        }

        const vote = await db.post_poll_votes.create(params);
        return vote;

    } catch (error) {
        throw new Error(`Error processing poll vote: ${error.message}`);
    }
}

async function getData(identifier, langId, categoryId = null, userId = null, page = 1, pageSize = 10, orderBy = 'created_at', orderType = 'DESC') {
    page = Math.max(1, parseInt(page, 10) || 1);
    pageSize = Math.max(1, parseInt(pageSize, 10) || 10);
    const offset = (page - 1) * pageSize;

    try {
        let type = null;

        const pagesData = await db.pages.findOne({
            where: { slug: identifier, lang_id: langId, visibility: 1 },
            attributes: ['id', 'title', 'description', 'slug', 'page_default_name']
        });
        if (pagesData) {
            type = 'page';
        }

        if (!type) {
            const postsData = await db.posts.findOne({
                where: { title_slug: identifier, lang_id: langId, visibility: 1, status: 1, is_scheduled: 0 },
                attributes: ['id', 'title', 'title_slug']
            });
            if (postsData) {
                type = 'post';
            }
        }

        if (!type) {
            const singleCategoryData = await db.categories.findOne({
                where: { name_slug: identifier, lang_id: langId },
                attributes: ['id', 'name', 'description', 'name_slug', 'parent_id']
            });
            if (singleCategoryData) {
                type = 'category';
            }
        }
        if (identifier === 'gallery') {
            const galleryData = await db.gallery_albums.findOne({
                where: { lang_id: langId },
            });
            if (galleryData) {
                type = 'gallery';
            }
        }

        if (!type) {
            return { message: "No matching data found for the provided slug or identifier." };
        }


        switch (type) {
            case 'category': {
                const category = await db.categories.findOne({
                    where: { [isNaN(identifier) ? 'name_slug' : 'id']: identifier }
                });
                if (!category) return { message: "Category not found" };

                const wherePosts = {
                    status: 1,
                    is_scheduled: 0,
                    category_id: category.id,
                };

                const postsResult = await db.posts.findAndCountAll({
                    where: wherePosts,
                    offset,
                    limit: pageSize,
                    order: [[orderBy, orderType]],
                    attributes: [
                        'id', 'title', 'title_slug', 'summary', 'keywords', 'image_default', 'post_type', 'image_mid', 'pageviews', 'isOld', 'created_at',
                        [Sequelize.literal(`(SELECT COUNT(*) FROM comments WHERE comments.post_id = posts.id)`), 'comment_count']
                    ],
                    include: [
                        { model: db.categories, attributes: ['id', 'name', 'name_slug'] },
                        { model: db.users, attributes: ['id', 'username', 'slug'] }
                    ]
                });

                return {
                    type: 'category',
                    category,
                    total: postsResult.count,
                    totalPages: Math.ceil(postsResult.count / pageSize),
                    currentPage: page,
                    posts: postsResult.rows,
                };
            }

            case 'gallery': {
                let where = { lang_id: langId };

                const albums = await db.gallery_albums.findAll({
                    where,
                    offset,
                    limit: pageSize,
                    order: [[orderBy, orderType]]
                });

                const gallery = await Promise.all(albums.map(async album => {
                    const latestGalleries = await db.gallery.findAll({
                        where: {
                            album_id: album.id
                        },
                        order: [['created_at', 'DESC']],
                        attributes: ['path_small'],
                        limit: 3
                    });

                    const albumData = album.toJSON();
                    albumData.images = latestGalleries.length
                        ? latestGalleries.map(gallery => gallery.path_small)
                        : [];

                    return albumData;
                }));

                const totalGalleryCount = albums.length;
                const totalPages = Math.ceil(totalGalleryCount / pageSize);

                return {
                    type: 'gallery',
                    data: {
                        total: totalGalleryCount,
                        totalPages,
                        currentPage: page,
                        pageSize,
                        items: gallery

                    }
                };
            }

            case 'page': {
                const pageData = await db.pages.findOne({
                    where: isNaN(identifier)
                        ? { slug: identifier }
                        : (isNaN(Number(identifier)) ? { page_default_name: identifier } : { id: identifier })
                });

                if (!pageData) return { message: "Page not found" };

                return {
                    type: 'page',
                    pageData
                };
            }

            case 'post': {

                let whereCondition;
                if (!/^\d+$/.test(identifier)) {
                    whereCondition = { title_slug: identifier };
                } else {
                    whereCondition = { id: parseInt(identifier, 10) };
                }

                const commentValue = await db.general_settings.findOne();

                const result = await db.posts.findOne({
                    where: whereCondition,
                    include: [
                        {
                            model: db.post_audios,
                            include: [
                                {
                                    model: db.audios,
                                    attributes: ['id', 'audio_name', 'audio_path']
                                }
                            ]
                        },
                        {
                            model: db.post_files,
                            include: [
                                {
                                    model: db.files,
                                    attributes: ['id', 'file_name', 'file_path']
                                }
                            ]
                        },
                        {
                            model: db.categories,
                            attributes: ['id', 'name', 'name_slug']
                        },
                        {
                            model: db.users,
                            attributes: ['id', 'username', 'avatar', 'slug']
                        },
                        {
                            model: db.tags,
                            attributes: ['tag', 'tag_slug']
                        },
                        {
                            model: db.post_images,
                            attributes: ['image_big', 'image_default']
                        }
                    ]
                });

                if (!result) {
                    return { message: "Post not found" };
                }

                const comments = await db.comments.findAll({
                    where: { post_id: result.id, status: 1 },
                    attributes: ['id', 'comment', 'created_at', 'user_id', 'parent_id'],
                    order: [['created_at', 'ASC']],
                    include: [
                        {
                            model: db.users,
                            attributes: ['id', 'username', 'avatar']
                        }
                    ]
                });

                const nestComments = (comments) => {
                    const commentMap = {};
                    const nestedComments = [];

                    comments.forEach(comment => {
                        comment.dataValues.childComments = [];
                        commentMap[comment.dataValues.id] = comment.dataValues;
                    });

                    comments.forEach(comment => {
                        const parentId = comment.dataValues.parent_id;
                        if (parentId === 0) {
                            nestedComments.push(comment.dataValues);
                        } else if (commentMap[parentId]) {
                            commentMap[parentId].childComments.push(comment.dataValues);
                        }
                    });

                    return nestedComments;
                };

                const nestedCommentStructure = nestComments(comments);

                const totalComments = await db.comments.count({
                    where: { post_id: result.id, status: 1 }
                });

                let sortedListItems = null;
                if (!/^\d+$/.test(identifier)) {
                    sortedListItems = await db.post_sorted_list_items.findAll({
                        where: { post_id: result.id },
                        order: [['item_order', 'ASC']]
                    });
                }

                let table_of_contents = null;
                if (result.post_type === "table_of_contents") {
                    const tableOfContentsItems = await db.post_sorted_list_items.findAll({
                        where: { post_id: result.id },
                        order: [['item_order', 'ASC']],
                        raw: true
                    });

                    const modifiedTableOfContentsItems = tableOfContentsItems.map((item, index) => ({
                        ...item,
                        index: index,
                        children: [],
                    }));

                    function buildTree(items) {
                        const itemMap = new Map();
                        const result = [];

                        items.forEach(item => {
                            item.children = [];
                            itemMap.set(item.index, item);
                        });

                        items.forEach(item => {
                            if (item.parent_link_num === 0) {
                                result.push(item);
                            } else {
                                const parentItem = itemMap.get(item.parent_link_num - 1);
                                if (parentItem) {
                                    parentItem.children.push(item);
                                }
                            }
                        });

                        return result;
                    }
                    table_of_contents = buildTree(modifiedTableOfContentsItems);
                    sortedListItems = null
                }

                let trivia_quiz = null;
                if (result.post_type === "trivia_quiz") {
                    const quizQuestions = await db.quiz_questions.findAll({
                        where: { post_id: result.id },
                        include: [{
                            model: db.quiz_answers,
                        }]
                    });
                    trivia_quiz = quizQuestions;
                }

                let personality_quiz = null;
                if (result.post_type === "personality_quiz") {
                    const quizQuestions = await db.quiz_questions.findAll({
                        where: { post_id: result.id },
                        include: [{
                            model: db.quiz_answers,
                            include: {
                                model: db.quiz_results,
                            }
                        }]
                    });
                    personality_quiz = quizQuestions;
                }

                let poll = null;
                if (result.post_type === "poll") {
                    const quizQuestions = await db.quiz_questions.findAll({
                        where: { post_id: result.id },
                        include: [{
                            model: db.quiz_answers,
                        }]
                    });

                    for (let question of quizQuestions) {
                        const totalVotes = await db.post_poll_votes.count({
                            where: { question_id: question.id }
                        });

                        question.dataValues.total_votes = totalVotes;

                        for (let answer of question.quiz_answers) {
                            const answerVotes = await db.post_poll_votes.count({
                                where: {
                                    question_id: question.id,
                                    answer_id: answer.id
                                }
                            });

                            const percentage = totalVotes > 0 ? ((answerVotes / totalVotes) * 100).toFixed(2) : 0;

                            answer.dataValues.vote_count = answerVotes;
                            answer.dataValues.percentage = percentage;
                        }
                    }

                    poll = quizQuestions;
                }

                let readingListData = null;
                if (userId) {
                    readingListData = await db.reading_lists.findOne({
                        where: { post_id: result.id, user_id: userId },
                    });
                }

                return {
                    type: 'post',
                    post: result,
                    comments: nestedCommentStructure,
                    totalComments,
                    post_sorted_list_item: sortedListItems || null,
                    table_of_contents_item: table_of_contents || null,
                    trivia_quiz_item: trivia_quiz || null,
                    personality_quiz_item: personality_quiz || null,
                    poll_item: poll || null,
                    saved: readingListData || null,
                    comment_system: commentValue.comment_system || null
                }

            }
            default:
                return { message: "Invalid type provided" };
        }
    } catch (error) {
        console.error("Error fetching data:", error);
        return { message: "An error occurred", error };
    }
}