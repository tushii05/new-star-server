const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes = {
        epaper_group: { type: DataTypes.STRING, allowNull: true },
        image: { type: DataTypes.TEXT, allowNull: true },
        epaper_date: { type: DataTypes.STRING, allowNull: true, defaultValue: 0 },
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

    return sequelize.define('epaper', attributes, options);
}