const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes = {
        lang_id: { type: DataTypes.INTEGER, allowNull: true, defaultValue: 1 },
        title: { type: DataTypes.STRING, allowNull: true, defaultValue: null },
        slug: { type: DataTypes.STRING, allowNull: true, defaultValue: null },
        description: { type: DataTypes.STRING, allowNull: true, defaultValue: null },
        keywords: { type: DataTypes.STRING, allowNull: true, defaultValue: null },
        is_custom: { type: DataTypes.TINYINT, allowNull: true, defaultValue: 1 },
        page_default_name: { type: DataTypes.STRING, allowNull: true, defaultValue: null },
        page_content: { type: DataTypes.TEXT, allowNull: true, defaultValue: null },
        page_order: { type: DataTypes.SMALLINT, allowNull: true, defaultValue: 1 },
        visibility: { type: DataTypes.TINYINT, allowNull: true, defaultValue: 1 },
        title_active: { type: DataTypes.TINYINT, allowNull: true, defaultValue: 1 },
        breadcrumb_active: { type: DataTypes.TINYINT, allowNull: true, defaultValue: 1 },
        right_column_active: { type: DataTypes.TINYINT, allowNull: true, defaultValue: 1 },
        need_auth: { type: DataTypes.TINYINT, allowNull: true, defaultValue: 0 },
        location: { type: DataTypes.STRING, allowNull: true, defaultValue: 'top' },
        link: { type: DataTypes.STRING, allowNull: true, defaultValue: null },
        parent_id: { type: DataTypes.INTEGER, allowNull: true, defaultValue: 0 },
        page_type: { type: DataTypes.STRING, allowNull: true, defaultValue: 'page' },
        created_at: { type: DataTypes.DATE, allowNull: true }
    };

    const options = {
        timestamps: false,
        createdAt: 'created_at',
        defaultScope: {
            attributes: { exclude: [] }
        },
        scopes: {
            withDetails: { attributes: {} }
        }
    };

    return sequelize.define('pages', attributes, options);
}
