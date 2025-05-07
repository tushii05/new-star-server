const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes = {
        post_id: { type: DataTypes.INTEGER, allowNull: true },
        question_id: { type: DataTypes.INTEGER, allowNull: true },
        answer_id: { type: DataTypes.INTEGER, allowNull: true },
        user_id: { type: DataTypes.INTEGER, allowNull: true, defaultValue: 0 },
        ip_address: { type: DataTypes.STRING, allowNull: true },
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

    return sequelize.define('post_poll_votes', attributes, options);
}