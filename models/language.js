const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes = {
        name: { type: DataTypes.STRING, allowNull: true },
        short_form: { type: DataTypes.STRING, allowNull: true },
        language_code: { type: DataTypes.STRING, allowNull: true },
        text_direction: { type: DataTypes.STRING, allowNull: true },
        text_editor_lang: { type: DataTypes.STRING, allowNull: true },
        status: { type: DataTypes.TINYINT, allowNull: true },
        language_order: { type: DataTypes.INTEGER, allowNull: true },
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

    return sequelize.define('languages', attributes, options);
}
