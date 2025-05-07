const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes = {
        lang_id: { type: DataTypes.INTEGER, allowNull: true, defaultValue: 1 },
        title: { type: DataTypes.STRING, allowNull: true },
        content: { type: DataTypes.TEXT, allowNull: true },
        type: { type: DataTypes.STRING, allowNull: true },
        widget_order: { type: DataTypes.INTEGER, allowNull: true, defaultValue: 1 },
        visibility: { type: DataTypes.INTEGER, allowNull: true, defaultValue: 1 },
        is_custom: { type: DataTypes.INTEGER, allowNull: true, defaultValue: 1 },
        display_category_id: { type: DataTypes.INTEGER, allowNull: true },
        created_at: { type: DataTypes.DATE, allowNull: true, defaultValue: DataTypes.NOW }
    };

    const options = {
        timestamps: false,
        defaultScope: {
            attributes: { exclude: [] }
        },
        scopes: {
            withDetails: { attributes: {} }
        }
    };

    return sequelize.define('widgets', attributes, options);
}
