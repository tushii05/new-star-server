const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes = {
        lang_id: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 1 },
        site_title: { type: DataTypes.STRING, allowNull: true },
        home_title: { type: DataTypes.STRING, allowNull: true },
        site_description: { type: DataTypes.STRING, allowNull: true },
        keywords: { type: DataTypes.STRING, allowNull: true },
        application_name: { type: DataTypes.STRING, allowNull: true },
        primary_font: { type: DataTypes.SMALLINT, allowNull: true, defaultValue: 19 },
        secondary_font: { type: DataTypes.SMALLINT, allowNull: true, defaultValue: 25 },
        tertiary_font: { type: DataTypes.SMALLINT, allowNull: true, defaultValue: 32 },
        facebook_url: { type: DataTypes.STRING, allowNull: true },
        twitter_url: { type: DataTypes.STRING, allowNull: true },
        instagram_url: { type: DataTypes.STRING, allowNull: true },
        tiktok_url: { type: DataTypes.STRING, allowNull: true },
        whatsapp_url: { type: DataTypes.STRING, allowNull: true },
        youtube_url: { type: DataTypes.STRING, allowNull: true },
        discord_url: { type: DataTypes.STRING, allowNull: true },
        telegram_url: { type: DataTypes.STRING, allowNull: true },
        pinterest_url: { type: DataTypes.STRING, allowNull: true },
        linkedin_url: { type: DataTypes.STRING, allowNull: true },
        twitch_url: { type: DataTypes.STRING, allowNull: true },
        vk_url: { type: DataTypes.STRING, allowNull: true },
        optional_url_button_name: { type: DataTypes.STRING, allowNull: true, defaultValue: 'Click Here To See More' },
        about_footer: { type: DataTypes.STRING, allowNull: true },
        contact_text: { type: DataTypes.TEXT, allowNull: true },
        contact_address: { type: DataTypes.STRING, allowNull: true },
        contact_email: { type: DataTypes.STRING, allowNull: true },
        contact_phone: { type: DataTypes.STRING, allowNull: true },
        copyright: { type: DataTypes.STRING, allowNull: true },
        cookies_warning: { type: DataTypes.TINYINT, allowNull: true, defaultValue: 0 },
        cookies_warning_text: { type: DataTypes.TEXT, allowNull: true }
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

    return sequelize.define('settings', attributes, options);
}
