const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes = {
        post_id: { type: DataTypes.INTEGER, allowNull: true },
        result_title: { type: DataTypes.STRING, allowNull: true },
        image_path: { type: DataTypes.STRING, allowNull: true },
        image_storage: { type: DataTypes.STRING, allowNull: true },
        description: { type: DataTypes.TEXT, allowNull: true },
        min_correct_count: { type: DataTypes.INTEGER.UNSIGNED, allowNull: true },
        max_correct_count: { type: DataTypes.INTEGER.UNSIGNED, allowNull: true },
        result_order: { type: DataTypes.INTEGER, allowNull: true },
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

    return sequelize.define('quiz_results', attributes, options);
}