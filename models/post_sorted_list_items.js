const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes = {
        post_id: { type: DataTypes.INTEGER, allowNull: true },
        title: { type: DataTypes.STRING, allowNull: true },
        content: { type: DataTypes.TEXT, allowNull: true },
        image: { type: DataTypes.STRING, allowNull: true },
        image_large: { type: DataTypes.STRING, allowNull: true },
        image_description: { type: DataTypes.STRING, allowNull: true },
        item_order: { type: DataTypes.INTEGER, allowNull: true },
        parent_link_num: { type: DataTypes.INTEGER, allowNull: true, defaultValue: 0 },
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

    return sequelize.define('post_sorted_list_items', attributes, options);
}