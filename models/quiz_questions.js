const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes = {
        post_id: { type: DataTypes.INTEGER, allowNull: true },
        question: { type: DataTypes.STRING, allowNull: true },
        image_path: { type: DataTypes.STRING, allowNull: true },
        image_storage: { type: DataTypes.STRING, allowNull: true },
        description: { type: DataTypes.TEXT, allowNull: true },
        question_order: { type: DataTypes.INTEGER, allowNull: true },
        answer_format: { type: DataTypes.STRING, allowNull: true },
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

    return sequelize.define('quiz_questions', attributes, options);
}