const db = require('../config/config');
const { Op } = require("sequelize");

module.exports = {
    getAll,
    getBySlug
};

async function getAll({ page = 1, pageSize = 10, orderBy = 'id', orderType = 'DESC', search = null }) {
    page = parseInt(page, 10);
    pageSize = parseInt(pageSize, 10);
    const offset = (page - 1) * pageSize;
    let where = {};

    if (search !== null) {
        where = {
            [Op.or]: [
                { parent_id: { [Op.like]: `%${search}%` } },
            ]
        };
    }

    const result = await db.web_stories.findAndCountAll({
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
        web_stories: result.rows
    };
}

async function getBySlug(slug) {
    const result = await db.web_stories.findOne({
        where: { slug: slug },
        include: [{
            model: db.web_sub_stories,
            attributes: ['title', 'slug', 'content', 'cover_image']
        }]
    });

    if (!result) {
        return { message: "Story not found" };
    }

    const mainStory = result.toJSON();
    delete mainStory.web_sub_stories;
    const allStories = [mainStory, ...result.web_sub_stories];

    return allStories;
}