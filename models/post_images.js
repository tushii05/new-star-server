const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes = {
        post_id: { type: DataTypes.INTEGER, allowNull: true },
        image_big: { type: DataTypes.STRING, allowNull: true },
        image_big: { type: DataTypes.STRING, allowNull: true },
        storage: { type: DataTypes.STRING, allowNull: true, defaultValue: 'local' },
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

    return sequelize.define('post_images', attributes, options);
}