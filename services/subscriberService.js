const db = require('../config/config');
const { Op } = require("sequelize");

module.exports = {
    getAll,
    create
};


async function getAll({ page = 1, pageSize = 10, orderBy = 'id', orderType = 'DESC', search = null }) {

    const offset = (page - 1) * pageSize;
    let where = {};

    if (search !== null) {
        where = {
            [Op.or]: [
                // { parent_id: { [Op.like]: `%${search}%` } },
            ]
        };
    }

    const result = await db.subscribers.findAndCountAll({
        where,
        offset,
        limit: pageSize,
        order: [[orderBy, orderType]]
    });

    const totalPages = parseInt(Math.ceil(result.count / pageSize));

    if (page > totalPages) {
        return { message: "No more data" };
    }

    return {
        total: result.count,
        totalPages,
        currentPage: parseInt(page),
        pageSize,
        subscribers: result.rows
    };
}


async function create(params) {
    try {
        const oldData = await db.subscribers.findOne({ where: { email: params.email } });

        if (oldData) {
            throw new Error(`Your email address is already registered!`);
        }

        const subscriber = await db.subscribers.create(params);
        return subscriber;
    } catch (error) {
        throw error;
    }
}
