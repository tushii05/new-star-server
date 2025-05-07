const db = require('../config/config');
const { Op } = require("sequelize");

module.exports = {
    getAll,
    getByIdentifier

};

async function getAll(req, { page = 1, pageSize = 10, orderBy = 'id', orderType = 'DESC', search = null, epaper_date = null }) {
    page = parseInt(page, 10);
    pageSize = parseInt(pageSize, 10);
    const offset = (page - 1) * pageSize;
    let where = {};

    if (search !== null) {
        where = {
            [Op.or]: [
                { epaper_group: { [Op.like]: `%${search}%` } },
            ]
        };
    }

    if (epaper_date) {
        where.epaper_date = epaper_date; 
    }

    const result = await db.epaper.findAndCountAll({
        where,
        offset,
        limit: pageSize,
        order: [[orderBy, orderType]]
    });
    const totalPages = parseInt(Math.ceil(result.count / pageSize));

    if (page > totalPages) {
        return { message: "No more data" };
    }

    const baseUrl = `${req.protocol}://${req.get('host')}`;
    const epaperWithImages = result.rows.map(epaper => {
        if (epaper && epaper.image) {
            epaper.image = `${baseUrl}/uploads/${epaper.image}`;
        }
        return epaper;
    });


    return {
        total: result.count,
        totalPages,
        currentPage: parseInt(page),
        pageSize,
        epaper: epaperWithImages
    };
}

async function getByIdentifier(identifier, req) {
    let whereCondition;

    if (!/^\d+$/.test(identifier)) {
        whereCondition = { epaper_group: identifier };
    } else {
        whereCondition = { id: parseInt(identifier, 10) };
    }

    try {
        const result = await db.epaper.findOne({
            where: whereCondition
        });

        if (!result) {
            throw new Error('E-paper not found');
        }

        const baseUrl = `${req.protocol}://${req.get('host')}`;
        result.dataValues.image = `${baseUrl}/uploads/${result.dataValues.image}`;

        return result;
    } catch (error) {
        throw new Error(`Error fetching epaper: ${error.message}`);
    }
}