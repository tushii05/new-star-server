const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes = {
        web_id: { type: DataTypes.INTEGER, allowNull: true },
        title: { type: DataTypes.STRING, allowNull: true },
        slug: { type: DataTypes.STRING, allowNull: true },
        content: { type: DataTypes.TEXT, allowNull: true },
        cover_image: { type: DataTypes.STRING, allowNull: true },
        meta_title: { type: DataTypes.STRING, allowNull: true },
        meta_description: { type: DataTypes.STRING, allowNull: true },
    };

    const options = {
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        defaultScope: {
            attributes: { exclude: [] }
        },
        scopes: {
            withDetails: { attributes: {} }
        }
    };

    return sequelize.define('web_sub_stories', attributes, options);
}