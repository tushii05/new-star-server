const db = require('../config/config');

module.exports = {
    getMenusData
}

async function getMenusData(langId) {
    try {
        const topMenu = await db.pages.findAll({
            where: { location: 'top', visibility: 1, lang_id: langId },
            attributes: ['id', 'title', 'slug', 'page_order'],
            order: [['page_order', 'ASC']]
        });

        const footerMenu = await db.pages.findAll({
            where: { location: 'footer', visibility: 1, lang_id: langId },
            attributes: ['id', 'title', 'slug', 'page_order'],
            order: [['page_order', 'ASC']]
        });

        return {
            topMenu,
            footerMenu
        };
    } catch (error) {
        throw new Error(error);
    }
}