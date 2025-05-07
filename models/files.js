const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes = {
        file_name: { type: DataTypes.STRING, allowNull: true },
        file_path: { type: DataTypes.STRING, allowNull: true },
        storage: { type: DataTypes.STRING, allowNull: true, defaultValue: "local" },
        user_id: { type: DataTypes.INTEGER, allowNull: true, defaultValue: 1 },
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

    return sequelize.define('files', attributes, options);
}