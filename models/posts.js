const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes = {
        lang_id: { type: DataTypes.INTEGER, allowNull: true },
        title: { type: DataTypes.STRING, allowNull: true },
        title_slug: { type: DataTypes.STRING, allowNull: true },
        title_hash: { type: DataTypes.STRING, allowNull: true },
        keywords: { type: DataTypes.STRING, allowNull: true },
        summary: { type: DataTypes.STRING, allowNull: true },
        content: { type: DataTypes.TEXT('long'), allowNull: true },
        category_id: { type: DataTypes.INTEGER, allowNull: true },
        image_big: { type: DataTypes.STRING, allowNull: true },
        image_default: { type: DataTypes.STRING, allowNull: true },
        image_slider: { type: DataTypes.STRING, allowNull: true },
        image_mid: { type: DataTypes.STRING, allowNull: true },
        image_small: { type: DataTypes.STRING, allowNull: true },
        image_mime: { type: DataTypes.STRING, allowNull: true, defaultValue: 'jpg' },
        image_storage: { type: DataTypes.STRING, allowNull: true, defaultValue: 'local' },
        optional_url: { type: DataTypes.STRING, allowNull: true },
        pageviews: { type: DataTypes.INTEGER, allowNull: true, defaultValue: 0 },
        need_auth: { type: DataTypes.TINYINT, allowNull: true, defaultValue: 0 },
        is_slider: { type: DataTypes.TINYINT, allowNull: true, defaultValue: 0 },
        slider_order: { type: DataTypes.TINYINT, allowNull: true, defaultValue: 1 },
        is_featured: { type: DataTypes.TINYINT, allowNull: true, defaultValue: 0 },
        featured_order: { type: DataTypes.TINYINT, allowNull: true, defaultValue: 1 },
        is_recommended: { type: DataTypes.TINYINT, allowNull: true, defaultValue: 0 },
        is_breaking: { type: DataTypes.TINYINT, allowNull: true, defaultValue: 1 },
        is_scheduled: { type: DataTypes.TINYINT, allowNull: true, defaultValue: 0 },
        visibility: { type: DataTypes.TINYINT, allowNull: true, defaultValue: 1 },
        show_right_column: { type: DataTypes.TINYINT, allowNull: true, defaultValue: 1 },
        isOld: { type: DataTypes.TINYINT, allowNull: true, defaultValue: 0 },
        post_type: { type: DataTypes.STRING, allowNull: true, defaultValue: 'post' },
        video_path: { type: DataTypes.STRING, allowNull: true },
        video_storage: { type: DataTypes.STRING, allowNull: true, defaultValue: 'local' },
        image_url: { type: DataTypes.STRING, allowNull: true },
        video_url: { type: DataTypes.STRING, allowNull: true },
        video_embed_code: { type: DataTypes.STRING, allowNull: true },
        user_id: { type: DataTypes.INTEGER, allowNull: true },
        status: { type: DataTypes.TINYINT, allowNull: true, defaultValue: 1 },
        feed_id: { type: DataTypes.INTEGER, allowNull: true },
        post_url: { type: DataTypes.STRING, allowNull: true },
        show_post_url: { type: DataTypes.TINYINT, allowNull: true, defaultValue: 1 },
        image_description: { type: DataTypes.STRING, allowNull: true },
        show_item_numbers: { type: DataTypes.TINYINT, allowNull: true, defaultValue: 1 },
        is_poll_public: { type: DataTypes.TINYINT, allowNull: true, defaultValue: 0 },
        link_list_style: { type: DataTypes.STRING, allowNull: true },
        recipe_info: { type: DataTypes.TEXT, allowNull: true },
        post_data: { type: DataTypes.TEXT, allowNull: true },
        updated_at: { type: DataTypes.DATE, allowNull: true },
        created_at: { type: DataTypes.DATE, allowNull: true }
    };

    const options = {
        timestamps: false,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        defaultScope: {
            attributes: { exclude: [] }
        },
        scopes: {
            withDetails: { attributes: {} }
        }
    };

    return sequelize.define('posts', attributes, options);
}
