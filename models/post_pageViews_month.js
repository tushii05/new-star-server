const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes = {
        post_id: { type: DataTypes.INTEGER, allowNull: false },
        post_user_id: { type: DataTypes.INTEGER, allowNull: false },
        ip_address: { type: DataTypes.STRING, allowNull: true },
        user_agent: { type: DataTypes.STRING, allowNull: true },
        reward_amount: { type: DataTypes.DOUBLE, allowNull: true, defaultValue: 0 },
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

    return sequelize.define('post_pageviews_month', attributes, options);
}
