const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes = {
        lang_id: { type: DataTypes.INTEGER, allowNull: true, defaultValue: 1 },
        question: { type: DataTypes.TEXT, allowNull: true },
        option1: { type: DataTypes.TEXT, allowNull: true },
        option2: { type: DataTypes.TEXT, allowNull: true },
        option3: { type: DataTypes.TEXT, allowNull: true },
        option4: { type: DataTypes.TEXT, allowNull: true },
        option5: { type: DataTypes.TEXT, allowNull: true },
        option6: { type: DataTypes.TEXT, allowNull: true },
        option7: { type: DataTypes.TEXT, allowNull: true },
        option8: { type: DataTypes.TEXT, allowNull: true },
        option9: { type: DataTypes.TEXT, allowNull: true },
        option10: { type: DataTypes.TEXT, allowNull: true },
        status: { type: DataTypes.TINYINT, allowNull: true, defaultValue: 1 },
        vote_permission: { type: DataTypes.STRING(50), allowNull: true, defaultValue: 'all' },
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

    return sequelize.define('polls', attributes, options);
}
