const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes = {
        lang_id: { type: DataTypes.INTEGER, allowNull: true },
        name: { type: DataTypes.STRING, allowNull: true },
        name_slug: { type: DataTypes.STRING, allowNull: true },
        parent_id: { type: DataTypes.INTEGER, allowNull: true },
        sub_parent_id: { type: DataTypes.INTEGER, allowNull: true },
        description: { type: DataTypes.STRING, allowNull: true },
        keywords: { type: DataTypes.STRING, allowNull: true },
        color: { type: DataTypes.STRING, allowNull: true },
        block_type: { type: DataTypes.STRING, allowNull: true },
        category_order: { type: DataTypes.INTEGER, allowNull: true },
        show_on_homepage: { type: DataTypes.TINYINT, allowNull: true },
        show_on_menu: { type: DataTypes.TINYINT, allowNull: true },
        created_at: { type: DataTypes.DATE, allowNull: true, defaultValue: DataTypes.NOW }
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

    return sequelize.define('categories', attributes, options);
}
