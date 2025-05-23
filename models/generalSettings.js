const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes = {
        site_lang: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 1 },
        multilingual_system: { type: DataTypes.TINYINT, allowNull: true, defaultValue: 1 },
        theme_mode: { type: DataTypes.STRING, allowNull: true, defaultValue: 'light' },
        logo: { type: DataTypes.STRING, allowNull: true },
        logo_footer: { type: DataTypes.STRING, allowNull: true },
        logo_email: { type: DataTypes.STRING, allowNull: true },
        favicon: { type: DataTypes.STRING, allowNull: true },
        show_hits: { type: DataTypes.TINYINT, allowNull: true, defaultValue: 1 },
        show_rss: { type: DataTypes.TINYINT, allowNull: true, defaultValue: 1 },
        rss_content_type: { type: DataTypes.STRING, allowNull: true, defaultValue: 'summary' },
        show_newsticker: { type: DataTypes.TINYINT, allowNull: true, defaultValue: 1 },
        pagination_per_page: { type: DataTypes.SMALLINT, allowNull: true, defaultValue: 10 },
        google_analytics: { type: DataTypes.TEXT, allowNull: true },
        mail_service: { type: DataTypes.STRING, allowNull: true, defaultValue: 'swift' },
        mail_protocol: { type: DataTypes.STRING, allowNull: true, defaultValue: 'smtp' },
        mail_encryption: { type: DataTypes.STRING, allowNull: true, defaultValue: 'tls' },
        mail_host: { type: DataTypes.STRING, allowNull: true },
        mail_port: { type: DataTypes.STRING, allowNull: true, defaultValue: 587 },
        mail_username: { type: DataTypes.STRING, allowNull: true },
        mail_password: { type: DataTypes.STRING, allowNull: true },
        mail_title: { type: DataTypes.STRING, allowNull: true },
        mail_reply_to: { type: DataTypes.STRING, allowNull: true, defaultValue: 'noreply@domain.com' },
        mailjet_api_key: { type: DataTypes.STRING, allowNull: true },
        mailjet_secret_key: { type: DataTypes.STRING, allowNull: true },
        mailjet_email_address: { type: DataTypes.STRING, allowNull: true },
        google_client_id: { type: DataTypes.STRING, allowNull: true },
        google_client_secret: { type: DataTypes.STRING, allowNull: true },
        vk_app_id: { type: DataTypes.STRING, allowNull: true },
        vk_secure_key: { type: DataTypes.STRING, allowNull: true },
        facebook_app_id: { type: DataTypes.STRING, allowNull: true },
        facebook_app_secret: { type: DataTypes.STRING, allowNull: true },
        facebook_comment: { type: DataTypes.TEXT, allowNull: true },
        facebook_comment_active: { type: DataTypes.TINYINT, allowNull: true, defaultValue: 1 },
        show_featured_section: { type: DataTypes.TINYINT, allowNull: true, defaultValue: 1 },
        show_latest_posts: { type: DataTypes.TINYINT, allowNull: true, defaultValue: 1 },
        pwa_status: { type: DataTypes.TINYINT, allowNull: true, defaultValue: 0 },
        registration_system: { type: DataTypes.TINYINT, allowNull: true, defaultValue: 1 },
        post_url_structure: { type: DataTypes.STRING, allowNull: true, defaultValue: 'slug' },
        comment_system: { type: DataTypes.TINYINT, allowNull: true, defaultValue: 1 },
        comment_approval_system: { type: DataTypes.TINYINT, allowNull: true, defaultValue: 1 },
        show_post_author: { type: DataTypes.TINYINT, allowNull: true, defaultValue: 1 },
        show_post_date: { type: DataTypes.TINYINT, allowNull: true, defaultValue: 1 },
        menu_limit: { type: DataTypes.TINYINT, allowNull: true, defaultValue: 8 },
        custom_header_codes: { type: DataTypes.TEXT, allowNull: true },
        custom_footer_codes: { type: DataTypes.TEXT, allowNull: true },
        adsense_activation_code: { type: DataTypes.TEXT, allowNull: true },
        recaptcha_site_key: { type: DataTypes.STRING, allowNull: true },
        recaptcha_secret_key: { type: DataTypes.STRING, allowNull: true },
        emoji_reactions: { type: DataTypes.TINYINT, allowNull: true, defaultValue: 1 },
        mail_contact_status: { type: DataTypes.TINYINT, allowNull: true, defaultValue: 0 },
        mail_contact: { type: DataTypes.STRING, allowNull: true },
        cache_system: { type: DataTypes.TINYINT, allowNull: true, defaultValue: 0 },
        cache_refresh_time: { type: DataTypes.INTEGER, allowNull: true, defaultValue: 1800 },
        refresh_cache_database_changes: { type: DataTypes.TINYINT, allowNull: true, defaultValue: 0 },
        email_verification: { type: DataTypes.TINYINT, allowNull: true, defaultValue: 0 },
        file_manager_show_files: { type: DataTypes.TINYINT, allowNull: true, defaultValue: 1 },
        audio_download_button: { type: DataTypes.TINYINT, allowNull: true, defaultValue: 1 },
        approve_added_user_posts: { type: DataTypes.TINYINT, allowNull: true, defaultValue: 1 },
        approve_updated_user_posts: { type: DataTypes.TINYINT, allowNull: true, defaultValue: 1 },
        timezone: { type: DataTypes.STRING, allowNull: true, defaultValue: 'America/New_York' },
        show_latest_posts_on_slider: { type: DataTypes.TINYINT, allowNull: true, defaultValue: 0 },
        show_latest_posts_on_featured: { type: DataTypes.TINYINT, allowNull: true, defaultValue: 0 },
        sort_slider_posts: { type: DataTypes.STRING, allowNull: true, defaultValue: 'by_slider_order' },
        sort_featured_posts: { type: DataTypes.STRING, allowNull: true, defaultValue: 'by_featured_order' },
        newsletter_status: { type: DataTypes.TINYINT, allowNull: true, defaultValue: 1 },
        newsletter_popup: { type: DataTypes.TINYINT, allowNull: true, defaultValue: 0 },
        show_home_link: { type: DataTypes.TINYINT, allowNull: true, defaultValue: 1 },
        post_format_article: { type: DataTypes.TINYINT, allowNull: true, defaultValue: 1 },
        post_format_gallery: { type: DataTypes.TINYINT, allowNull: true, defaultValue: 1 },
        post_format_sorted_list: { type: DataTypes.TINYINT, allowNull: true, defaultValue: 1 },
        post_format_video: { type: DataTypes.TINYINT, allowNull: true, defaultValue: 1 },
        post_format_audio: { type: DataTypes.TINYINT, allowNull: true, defaultValue: 1 },
        post_format_trivia_quiz: { type: DataTypes.TINYINT, allowNull: true, defaultValue: 1 },
        post_format_personality_quiz: { type: DataTypes.TINYINT, allowNull: true, defaultValue: 1 },
        post_format_poll: { type: DataTypes.TINYINT, allowNull: true, defaultValue: 1 },
        post_format_table_of_contents: { type: DataTypes.TINYINT, allowNull: true, defaultValue: 1 },
        post_format_recipe: { type: DataTypes.TINYINT, allowNull: true, defaultValue: 1 },
        maintenance_mode_title: { type: DataTypes.STRING, allowNull: true, defaultValue: 'Coming Soon!' },
        maintenance_mode_description: { type: DataTypes.STRING, allowNull: true },
        maintenance_mode_status: { type: DataTypes.TINYINT, allowNull: true, defaultValue: 0 },
        sitemap_frequency: { type: DataTypes.STRING, allowNull: true, defaultValue: 'monthly' },
        sitemap_last_modification: { type: DataTypes.STRING, allowNull: true, defaultValue: 'server_response' },
        sitemap_priority: { type: DataTypes.STRING, allowNull: true, defaultValue: 'automatically' },
        show_user_email_on_profile: { type: DataTypes.TINYINT, allowNull: true, defaultValue: 1 },
        reward_system_status: { type: DataTypes.TINYINT, allowNull: true, defaultValue: 0 },
        reward_amount: { type: DataTypes.DOUBLE, allowNull: true, defaultValue: 1 },
        currency_name: { type: DataTypes.STRING, allowNull: true, defaultValue: 'US Dollar' },
        currency_symbol: { type: DataTypes.STRING, allowNull: true, defaultValue: '$' },
        currency_format: { type: DataTypes.STRING, allowNull: true, defaultValue: 'us' },
        currency_symbol_format: { type: DataTypes.STRING, allowNull: true, defaultValue: 'left' },
        payout_paypal_status: { type: DataTypes.TINYINT, allowNull: true, defaultValue: 1 },
        payout_iban_status: { type: DataTypes.TINYINT, allowNull: true, defaultValue: 1 },
        payout_swift_status: { type: DataTypes.TINYINT, allowNull: true, defaultValue: 1 },
        storage: { type: DataTypes.STRING, allowNull: true, defaultValue: 'local' },
        aws_key: { type: DataTypes.STRING, allowNull: true },
        aws_secret: { type: DataTypes.STRING, allowNull: true },
        aws_bucket: { type: DataTypes.STRING, allowNull: true },
        aws_region: { type: DataTypes.STRING, allowNull: true },
        auto_post_deletion: { type: DataTypes.TINYINT, allowNull: true, defaultValue: 0 },
        auto_post_deletion_days: { type: DataTypes.SMALLINT, allowNull: true, defaultValue: 30 },
        auto_post_deletion_delete_all: { type: DataTypes.TINYINT, allowNull: true, defaultValue: 0 },
        redirect_rss_posts_to_original: { type: DataTypes.TINYINT, allowNull: true, defaultValue: 0 },
        image_file_format: { type: DataTypes.STRING, allowNull: true, defaultValue: 'JPG' },
        allowed_file_extensions: { type: DataTypes.STRING, allowNull: true, defaultValue: 'jpg,jpeg,png,gif,svg,csv,doc,docx,pdf,ppt,psd,mp4,mp3,zip' },
        google_news: { type: DataTypes.TINYINT, allowNull: true, defaultValue: 0 },
        delete_images_with_post: { type: DataTypes.TINYINT, allowNull: true, defaultValue: 0 },
        sticky_sidebar: { type: DataTypes.TINYINT, allowNull: true, defaultValue: 0 },
        last_cron_update: { type: DataTypes.DATE, allowNull: true },
        version: { type: DataTypes.STRING, allowNull: true }
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

    return sequelize.define('general_settings', attributes, options);
}
