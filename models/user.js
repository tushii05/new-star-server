const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes = {
        username: { type: DataTypes.STRING, allowNull: true },
        slug: { type: DataTypes.STRING, allowNull: true },
        email: { type: DataTypes.STRING, allowNull: true, defaultValue: 'name@domain.com' },
        email_status: { type: DataTypes.TINYINT, allowNull: true, defaultValue: 0 },
        token: { type: DataTypes.STRING, allowNull: true },
        password: { type: DataTypes.STRING, allowNull: true },
        role: { type: DataTypes.STRING, allowNull: true, defaultValue: 'user' },
        user_type: { type: DataTypes.STRING, allowNull: true, defaultValue: 'registered' },
        google_id: { type: DataTypes.STRING, allowNull: true },
        facebook_id: { type: DataTypes.STRING, allowNull: true },
        vk_id: { type: DataTypes.STRING, allowNull: true },
        avatar: { type: DataTypes.STRING, allowNull: true },
        cover_image: { type: DataTypes.STRING, allowNull: true },
        status: { type: DataTypes.TINYINT, allowNull: true, defaultValue: 1 },
        about_me: { type: DataTypes.STRING, allowNull: true },
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
        personal_website_url: { type: DataTypes.STRING, allowNull: true },
        last_seen: { type: DataTypes.DATE, allowNull: true },
        show_email_on_profile: { type: DataTypes.TINYINT, allowNull: true, defaultValue: 1 },
        show_rss_feeds: { type: DataTypes.TINYINT, allowNull: true, defaultValue: 1 },
        reward_system_enabled: { type: DataTypes.TINYINT, allowNull: true, defaultValue: 0 },
        balance: { type: DataTypes.DOUBLE, allowNull: true, defaultValue: 0 },
        total_pageviews: { type: DataTypes.INTEGER, allowNull: true, defaultValue: 0 },
        verificationOtp: { type: DataTypes.INTEGER, allowNull: true, defaultValue: 0 },
        isEmailVerified: { type: DataTypes.TINYINT, allowNull: false, defaultValue: 0 },
        otpExpirationTime: { type: DataTypes.DATE, allowNull: true },
        createdAt: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW, field: 'created_at' }
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

    return sequelize.define('users', attributes, options);
}