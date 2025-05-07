const db = require('../config/config');

module.exports = {
    getAll
};


async function getAll(lang_id) {
    try {
        const generalSettings = await db.general_settings.findAll({
            attributes: ['id', 'site_lang', 'theme_mode', 'multilingual_system', 'show_rss', 'adsense_activation_code', 'pwa_status', 'logo', 'logo_footer', 'favicon', 'maintenance_mode_title', 'maintenance_mode_description', 'maintenance_mode_status', 'comment_system', 'custom_header_codes', 'custom_footer_codes']
        });
        const settings = await db.settings.findAll({
            attributes: ['id', 'lang_id', 'site_title', 'home_title', 'site_description', 'keywords', 'application_name', 'optional_url_button_name', 'about_footer', 'contact_text', 'contact_address', 'contact_email', 'contact_phone', 'copyright', 'cookies_warning', 'cookies_warning_text'],
            where: {
                lang_id: lang_id
            }
        });
        return {
            generalSettings,
            settings
        };
    } catch (error) {
        console.error('Error in generalSettingsService:', error);
        throw new Error('Error fetching general settings');
    }
}