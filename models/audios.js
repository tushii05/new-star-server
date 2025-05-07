const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes = {
        audio_name: { type: DataTypes.STRING, allowNull: true },
        audio_path: { type: DataTypes.STRING, allowNull: true },
        download_button: { type: DataTypes.TINYINT, allowNull: true, defaultValue: 1 },
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

    return sequelize.define('audios', attributes, options);
}