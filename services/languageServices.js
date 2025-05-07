const db = require('../config/config');
const { Op } = require("sequelize");

module.exports = {
    getAll
};


async function getAll({ page = 1, pageSize = 10, orderBy = 'id', orderType = 'DESC', search = null }) {

    page = Math.max(1, parseInt(page, 10));
    pageSize = Math.max(1, parseInt(pageSize, 10));

    const offset = (page - 1) * pageSize;
    let where = {};

    if (search !== null) {
        where = {
            [Op.or]: [
                { short_form: { [Op.like]: `%${search}%` } },
            ]
        };
    };

    const siteLangSetting = await db.general_settings.findOne();
    const siteLangId = siteLangSetting ? siteLangSetting.site_lang : null;

    const result = await db.languages.findAndCountAll({
        where,
        offset,
        limit: pageSize,
        order: [[orderBy, orderType]]
    });

    const totalPages = parseInt(Math.ceil(result.count / pageSize));

    if (page > totalPages) {
        return { message: "No more data" };
    }

    let defaultLanguage = null;
    if (siteLangId) {
        defaultLanguage = result.rows.find(lang => lang.id === parseInt(siteLangId, 10));
    }

    return {
        total: result.count,
        totalPages,
        currentPage: parseInt(page),
        pageSize,
        languages: result.rows,
        defaultLanguage: defaultLanguage || null
    };
};
