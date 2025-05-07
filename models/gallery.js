const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes = {
        lang_id: { type: DataTypes.INTEGER, allowNull: true, defaultValue: 1 },
        title: { type: DataTypes.STRING, allowNull: true },
        album_id: { type: DataTypes.INTEGER, allowNull: true },
        category_id: { type: DataTypes.INTEGER, allowNull: true },
        path_big: { type: DataTypes.STRING, allowNull: true },
        path_small: { type: DataTypes.STRING, allowNull: true },
        is_album_cover: { type: DataTypes.BOOLEAN, allowNull: true, defaultValue: 0 },
        storage: { type: DataTypes.STRING, allowNull: true, defaultValue: 'local' },
        created_at: { type: DataTypes.DATE, allowNull: true }
    };

    const options = {
        freezeTableName: true,
        timestamps: false,
        createdAt: 'created_at',
        defaultScope: {
            attributes: { exclude: [] }
        },
        scopes: {
            withDetails: { attributes: {} }
        }
    };

    return sequelize.define('gallery', attributes, options);
}
