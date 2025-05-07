const db = require('../config/config');
const { Op } = require("sequelize");

module.exports = {
    getAll
};

async function getAll({ page = 1, pageSize = 100, orderBy = 'id', orderType = 'DESC', langId = null }) {

    page = parseInt(page);
    pageSize = parseInt(pageSize);

    const offset = (page - 1) * pageSize;
    let where = {};

    if (langId !== null) {
        where = {
            lang_id: { [Op.like]: `%${langId}%` },
        };
    }
    where = {
        ...where,
        [Op.or]: [
            { ad_code_mobile: { [Op.and]: { [Op.ne]: null, [Op.ne]: '' } } },
            { ad_code_desktop: { [Op.and]: { [Op.ne]: null, [Op.ne]: '' } } }
        ]
    };

    const result = await db.ad_spaces.findAndCountAll({
        where,
        offset,
        limit: pageSize,
        order: [[orderBy, orderType]]
    });

    const setting = await db.general_settings.findOne({
        attributes: ['adsense_activation_code']
    });

    const totalPages = parseInt(Math.ceil(result.count / pageSize));

    if (page > totalPages) {
        return {
            message: "No more data",
            adsense_activation_code: setting?.adsense_activation_code || null

        };
    }

    return {
        total: result.count,
        totalPages,
        currentPage: parseInt(page),
        pageSize,
        ad_spaces: result.rows,
        adsense_activation_code: setting?.adsense_activation_code || null

    };
}
