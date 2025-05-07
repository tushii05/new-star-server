const db = require('../config/config');
const { Op } = require("sequelize");

module.exports = {
    getAll
};


// async function getAll({ page = 1, pageSize = 10, orderBy = 'id', orderType = 'DESC', search = null }) {

//     const offset = (page - 1) * pageSize;
//     let where = {};

//     if (search !== null) {
//         where = {
//             [Op.or]: [
//                 { parent_id: { [Op.like]: `%${search}%` } },
//             ]
//         };
//     }

//     const result = await db.Categories.findAndCountAll({
//         where,
//         offset,
//         limit: pageSize,
//         order: [[orderBy, orderType]]
//     });

//     const totalPages = parseInt(Math.ceil(result.count / pageSize));

//     if (page > totalPages) {
//         return { message: "No more data" };
//     }

//     return {
//         total: result.count,
//         totalPages,
//         currentPage: parseInt(page),
//         pageSize,
//         categories: result.rows
//     };
// }

// async function getAll({ page = 1, pageSize = 10, orderBy = 'id', orderType = 'DESC', search = null, includeAll = false }) {
//     const offset = (page - 1) * pageSize;
//     if (!includeAll) {
//         pageSize = 8;
//     };

//     let where = {
//         parent_id: 0
//     };

//     if (search !== null) {
//         where = {
//             [Op.and]: [
//                 { [Op.or]: [{ parent_id: { [Op.like]: `%${search}%` } }] }
//             ]
//         };
//     }

//     let result;
//     if (includeAll) {
//         result = await db.Categories.findAll({
//             where,
//             order: [[orderBy, orderType]]
//         });

//         return {
//             total: result.length,
//             totalPages: 1,
//             currentPage: 1,
//             pageSize: result.length,
//             categories: result
//         };
//     } else {
//         result = await db.Categories.findAndCountAll({
//             where,
//             offset,
//             limit: pageSize,
//             order: [[orderBy, orderType]]
//         });

//         const totalPages = parseInt(Math.ceil(result.count / pageSize));

//         if (page > totalPages) {
//             return { message: "No more data" };
//         }

//         return {
//             total: result.count,
//             totalPages,
//             currentPage: parseInt(page),
//             pageSize,
//             categories: result.rows
//         };
//     }
// }


// async function getAll({ page = 1, pageSize = 10, orderBy = 'category_order', orderType = 'ASC', search = null, includeAll = false }) {
//     const menuLimit = await db.General_Settings.findOne();
//     if (!includeAll) {
//         pageSize = menuLimit.menu_limit;
//     }

//     const offset = (page - 1) * pageSize;

//     // Define the basic where condition for Categories
//     let categoryWhere = {
//         parent_id: 0,
//         show_on_menu: 1
//     };

//     if (search !== null) {
//         categoryWhere = {
//             [Op.and]: [
//                 { parent_id: 0 },
//                 { [Op.or]: [{ parent_id: { [Op.like]: `%${search}%` } }] }
//             ]
//         };
//     }

//     // Fetch Categories
//     let categories;
//     if (includeAll) {
//         categories = await db.Categories.findAll({
//             where: categoryWhere,
//             order: [
//                 [orderBy, orderType],
//                 ['id', 'ASC']
//             ]
//         });
//     } else {
//         const result = await db.Categories.findAndCountAll({
//             where: categoryWhere,
//             offset,
//             limit: pageSize,
//             order: [
//                 [orderBy, orderType],
//                 ['id', 'ASC']
//             ]
//         });

//         categories = result.rows;
//         const totalPages = Math.ceil(result.count / pageSize);

//         if (page > totalPages) {
//             return { message: "No more data" };
//         }
//     }

//     // Fetch Pages where location is 'main' and visibility is 1
//     const pages = await db.Pages.findAll({
//         where: {
//             location: 'main',
//             visibility: 1
//         }
//     });

//     const pageData = pages.map(page => page.toJSON());

//     // Add pages data to each category
//     const categoriesWithPages = categories.map(category => {
//         const categoryData = category.toJSON(); // Convert category to plain object
//         categoryData.pages = pageData; // Add pages to category
//         return categoryData;
//     });

//     return {
//         total,
//         totalPages: includeAll ? 1 : Math.ceil(total / pageSize),
//         currentPage: page,
//         pageSize: includeAll ? categories.length : pageSize,
//         categories: categoriesWithPages
//     };
// }



async function getAll({ page = 1, pageSize = 10, orderBy = 'category_order', orderType = 'ASC', search = null, includeAll = false }) {
    const menuLimit = await db.General_Settings.findOne();
    if (!includeAll) {
        pageSize = menuLimit.menu_limit;
    }

    const offset = (page - 1) * pageSize;

    let categoryWhere = {
        parent_id: 0,
        show_on_menu: 1
    };

    if (search !== null) {
        categoryWhere = {
            [Op.and]: [
                { [Op.or]: [{ parent_id: { [Op.like]: `%${search}%` } }] }
            ]
        };
    }

    const categoryOptions = {
        where: categoryWhere,
        order: [
            [orderBy, orderType],
            ['id', 'ASC']
        ]
    };

    if (!includeAll) {
        categoryOptions.offset = offset;
        categoryOptions.limit = pageSize;
    }

    let categoriesData = includeAll ? await db.Categories.findAll(categoryOptions) : await db.Categories.findAndCountAll(categoryOptions);

    let pages = [];
    if (search === null) {
        pages = await db.Pages.findAll({
            where: {
                location: 'main',
                visibility: 1
            }
        });
    }

    const combinedData = includeAll ? categoriesData.concat(pages) : categoriesData.rows.concat(pages);

    combinedData.sort((a, b) => {
        const aOrder = a.category_order || a.page_order;
        const bOrder = b.category_order || b.page_order;
        return (orderType === 'ASC' ? 1 : -1) * (aOrder - bOrder);
    });

    if (includeAll) {
        return {
            total: combinedData.length,
            totalPages: 1,
            currentPage: 1,
            pageSize: combinedData.length,
            categories: combinedData
        };
    } else {
        const totalPages = Math.ceil(categoriesData.count / pageSize);
        if (page > totalPages) {
            return { message: "No more data" };
        }
        return {
            total: categoriesData.count,
            totalPages,
            currentPage: page,
            pageSize,
            categories: combinedData
        };
    }
}





//Done Without pages
// async function getAll({ page = 1, pageSize = 10, orderBy = 'category_order', orderType = 'ASC', search = null, includeAll = false }) {

//     const menuLimit = await db.General_Settings.findOne();
//     if (!includeAll) {
//         pageSize = menuLimit.menu_limit;
//     }

//     const offset = (page - 1) * pageSize;

//     let where = {
//         parent_id: 0,
//         show_on_menu: 1
//     };

//     if (search !== null) {
//         where = {
//             [Op.and]: [
//                 { parent_id: 0 },
//                 { [Op.or]: [{ parent_id: { [Op.like]: `%${search}%` } }] }
//             ]
//         };
//     }

//     let result;
//     if (includeAll) {
//         result = await db.Categories.findAll({
//             where,
//             order: [
//                 [orderBy, orderType],
//                 ['id', 'ASC']
//             ]
//         });

//         return {
//             total: result.length,
//             totalPages: 1,
//             currentPage: 1,
//             pageSize: result.length,
//             categories: result
//         };
//     } else {
//         result = await db.Categories.findAndCountAll({
//             where,
//             offset,
//             limit: pageSize,
//             order: [
//                 [orderBy, orderType],
//                 ['id', 'ASC']
//             ]
//         });

//         const totalPages = Math.ceil(result.count / pageSize);

//         if (page > totalPages) {
//             return { message: "No more data" };
//         }

//         return {
//             total: result.count,
//             totalPages,
//             currentPage: page,
//             pageSize,
//             categories: result.rows
//         };
//     }
// }






// const db = require('../config/config');
// const { Op } = require("sequelize");

// module.exports = {
//     getAll
// };

// async function getAll({ page = 1, pageSize = 10, orderBy = 'category_order', orderType = 'ASC', search = null, includeAll = false }) {
//     const menuLimit = await db.General_Settings.findOne();
//     if (!includeAll) {
//         pageSize = menuLimit.menu_limit;
//     }

//     const offset = (page - 1) * pageSize;

//     let categoryWhere = {
//         parent_id: 0,
//         show_on_menu: 1
//     };

//     if (search !== null) {
//         categoryWhere = {
//             [Op.and]: [
//                 { [Op.or]: [{ parent_id: { [Op.like]: `%${search}%` } }] }
//             ]
//         };
//     }

//     const categoryOptions = {
//         where: categoryWhere,
//         order: [
//             [orderBy, orderType],
//             ['id', 'ASC']
//         ]
//     };

//     if (!includeAll) {
//         categoryOptions.offset = offset;
//         categoryOptions.limit = pageSize;
//     }

//     let categoriesData = includeAll ? await db.Categories.findAll(categoryOptions) : await db.Categories.findAndCountAll(categoryOptions);

//     let pages = [];
//     if (search === null) {
//         pages = await db.Pages.findAll({
//             where: {
//                 location: 'main',
//                 visibility: 1
//             }
//         });
//     }

//     const combinedData = includeAll ? categoriesData.concat(pages) : categoriesData.rows.concat(pages);

//     combinedData.sort((a, b) => {
//         const aOrder = a.category_order || a.page_order;
//         const bOrder = b.category_order || b.page_order;
//         return (orderType === 'ASC' ? 1 : -1) * (aOrder - bOrder);
//     });

//     if (includeAll) {
//         return {
//             total: combinedData.length,
//             totalPages: 1,
//             currentPage: 1,
//             pageSize: combinedData.length,
//             categories: combinedData
//         };
//     } else {
//         const totalPages = Math.ceil(categoriesData.count / pageSize);
//         if (page > totalPages) {
//             return { message: "No more data" };
//         }
//         return {
//             total: categoriesData.count,
//             totalPages,
//             currentPage: page,
//             pageSize,
//             categories: combinedData
//         };
//     }
// }


// const db = require('../config/config');
// const { Op } = require("sequelize");
// const util = require('util');

// module.exports = {
//     getAll
// };

// async function getAll({ page = 1, pageSize = 10, orderBy = 'category_order', orderType = 'ASC', search = null, includeAll = false }, redisClient) {
//     const cacheKey = `categories_${page}_${pageSize}_${orderBy}_${orderType}_${search}_${includeAll}`;

//     try {
//         const cachedData = await redisClient.get(cacheKey);
//         if (cachedData) {
//             console.log('Serving from cache');
//             return JSON.parse(cachedData);
//         }
//     } catch (err) {
//         console.error('Error retrieving from cache:', err);
//     }

//     const menuLimit = await db.General_Settings.findOne();
//     if (!includeAll) {
//         pageSize = menuLimit.menu_limit;
//     }

//     const offset = (page - 1) * pageSize;

//     let categoryWhere = {
//         parent_id: 0,
//         show_on_menu: 1
//     };

//     if (search !== null) {
//         categoryWhere = {
//             [Op.and]: [
//                 { [Op.or]: [{ parent_id: { [Op.like]: `%${search}%` } }] }
//             ]
//         };
//     }

//     const categoryOptions = {
//         where: categoryWhere,
//         order: [
//             [orderBy, orderType],
//             ['id', 'ASC']
//         ]
//     };

//     if (!includeAll) {
//         categoryOptions.offset = offset;
//         categoryOptions.limit = pageSize;
//     }

//     let categoriesData = includeAll ? await db.Categories.findAll(categoryOptions) : await db.Categories.findAndCountAll(categoryOptions);

//     let pages = [];
//     if (search === null) {
//         pages = await db.Pages.findAll({
//             where: {
//                 location: 'main',
//                 visibility: 1
//             }
//         });
//     }

//     const combinedData = includeAll ? categoriesData.concat(pages) : categoriesData.rows.concat(pages);

//     combinedData.sort((a, b) => {
//         const aOrder = a.category_order || a.page_order;
//         const bOrder = b.category_order || b.page_order;
//         return (orderType === 'ASC' ? 1 : -1) * (aOrder - bOrder);
//     });

//     const response = includeAll ? {
//         total: combinedData.length,
//         totalPages: 1,
//         currentPage: 1,
//         pageSize: combinedData.length,
//         categories: combinedData
//     } : {
//         total: categoriesData.count,
//         totalPages: Math.ceil(categoriesData.count / pageSize),
//         currentPage: page,
//         pageSize,
//         categories: combinedData
//     };

//     try {
//         await redisClient.set(cacheKey, JSON.stringify(response), { EX: 600 }); // Cache for 10 minutes
//         console.log('Data cached successfully');
//     } catch (err) {
//         console.error('Error setting cache:', err);
//     }

//     return response;
// }

