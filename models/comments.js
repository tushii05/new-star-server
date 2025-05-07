const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes = {
        parent_id: { type: DataTypes.INTEGER, allowNull: true, defaultValue: 0 },
        post_id: { type: DataTypes.INTEGER, allowNull: true },
        user_id: { type: DataTypes.INTEGER, allowNull: true },
        email: { type: DataTypes.STRING, allowNull: true },
        name: { type: DataTypes.STRING, allowNull: true },
        comment: { type: DataTypes.STRING, allowNull: true },
        ip_address: { type: DataTypes.STRING, allowNull: true },
        like_count: { type: DataTypes.INTEGER, allowNull: true, defaultValue: 0 },
        status: { type: DataTypes.TINYINT, allowNull: true, defaultValue: 1 },
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

    return sequelize.define('comments', attributes, options);
}