const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes = {
        lang_id: { type: DataTypes.INTEGER, allowNull: true },
        ad_space: { type: DataTypes.TEXT, allowNull: true },
        ad_code_desktop: { type: DataTypes.TEXT, allowNull: true },
        desktop_width: { type: DataTypes.INTEGER, allowNull: true },
        desktop_height: { type: DataTypes.INTEGER, allowNull: true },
        ad_code_mobile: { type: DataTypes.TEXT, allowNull: true },
        mobile_width: { type: DataTypes.INTEGER, allowNull: true },
        mobile_height: { type: DataTypes.INTEGER, allowNull: true },
        display_category_id: { type: DataTypes.TEXT, allowNull: true },
        paragraph_number: { type: DataTypes.TEXT, allowNull: true },
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

    return sequelize.define('ad_spaces', attributes, options);
}