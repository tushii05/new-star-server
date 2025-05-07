const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes = {
        question_id: { type: DataTypes.INTEGER, allowNull: true },
        image_path: { type: DataTypes.STRING, allowNull: true },
        image_storage: { type: DataTypes.STRING, allowNull: true },
        answer_text: { type: DataTypes.STRING, allowNull: true },
        is_correct: { type: DataTypes.TINYINT, allowNull: true },
        assigned_result_id: { type: DataTypes.INTEGER, allowNull: true },
        total_votes: { type: DataTypes.INTEGER, allowNull: true },

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

    return sequelize.define('quiz_answers', attributes, options);
}