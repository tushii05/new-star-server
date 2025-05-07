const db = require('../config/config');
const { Op } = require("sequelize");

module.exports = {
    getAll,
    getCategoryData
};


async function getAll(langId = 1, orderBy = 'id', orderType = 'DESC', search = null) {
    let where = {
        lang_id: langId
    };

    if (search !== null) {
        where = {
            [Op.and]: [
                { lang_id: langId },
                {
                    [Op.or]: [
                        { name: { [Op.like]: `%${search}%` } }
                    ]
                }
            ]
        };
    }

    const albums = await db.gallery_albums.findAll({
        where,
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
        // albumData.image = latestGallery
        //     ? `${process.env.IMAGE_URL}${latestGallery.path_small}`
        //     : null;

        albumData.images = latestGalleries.length
            ? latestGalleries.map(gallery => gallery.path_small)
            : [];

        return albumData;
    }));

    return {
        total: gallery.length,
        gallery
    };
}


async function getCategoryData({ id, orderBy = 'id', orderType = 'DESC', categoryId = null, page = 1, pageSize = 10 }) {
    page = Math.max(1, parseInt(page, 10));
    pageSize = Math.max(1, parseInt(pageSize, 10));

    if (!id) {
        return { message: "ID is required" };
    }

    const album = await db.gallery_albums.findOne({ where: { id }, order: [[orderBy, orderType]] });

    if (!album) {
        return { message: "Album not found" };
    }

    const categories = await db.gallery_categories.findAll({ where: { album_id: album.id } });

    const galleryWhere = { album_id: album.id };
    if (categoryId) {
        galleryWhere.category_id = categoryId;
    }

    const [galleryData, totalGalleryCount] = await Promise.all([
        db.gallery.findAll({
            where: galleryWhere,
            offset: (page - 1) * pageSize,
            limit: pageSize,
            order: [[orderBy, orderType]],
            attributes: ['id', 'album_id', 'path_small', 'title', 'created_at', 'category_id']
        }),
        db.gallery.count({ where: galleryWhere })
    ]);

    const totalPages = Math.ceil(totalGalleryCount / pageSize);

    return {
        message: "Success",
        data: {
            album: { ...album.toJSON(), categories },
            gallery: {
                total: totalGalleryCount,
                totalPages,
                currentPage: page,
                pageSize,
                items: galleryData.map(galleryItem => galleryItem.toJSON())
            }
        }
    };
}
