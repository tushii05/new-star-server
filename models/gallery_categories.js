const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes = {
        lang_id: { type: DataTypes.INTEGER, allowNull: true, defaultValue: 1 },
        name: { type: DataTypes.STRING, allowNull: true },
        album_id: { type: DataTypes.INTEGER, allowNull: true, },
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

    return sequelize.define('gallery_categories', attributes, options);
}
