const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes = {
        following_id: { type: DataTypes.INTEGER, allowNull: true },
        follower_id: { type: DataTypes.INTEGER, allowNull: true },
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

    return sequelize.define('followers', attributes, options);
}