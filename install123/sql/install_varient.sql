-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Apr 22, 2024 at 01:23 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;

--
-- Database: `install_varient`
--

-- --------------------------------------------------------

--
-- Table structure for table `ad_spaces`
--

CREATE TABLE `ad_spaces` (
  `id` int(11) NOT NULL,
  `lang_id` int(11) DEFAULT 1,
  `ad_space` text DEFAULT NULL,
  `ad_code_desktop` text DEFAULT NULL,
  `desktop_width` int(11) DEFAULT NULL,
  `desktop_height` int(11) DEFAULT NULL,
  `ad_code_mobile` text DEFAULT NULL,
  `mobile_width` int(11) DEFAULT NULL,
  `mobile_height` int(11) DEFAULT NULL,
  `display_category_id` int(11) DEFAULT NULL,
  `paragraph_number` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `audios`
--

CREATE TABLE `audios` (
  `id` int(11) NOT NULL,
  `audio_name` varchar(255) DEFAULT NULL,
  `audio_path` varchar(255) DEFAULT NULL,
  `download_button` tinyint(1) DEFAULT 1,
  `storage` varchar(20) DEFAULT 'local',
  `user_id` int(11) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `id` int(11) NOT NULL,
  `lang_id` int(11) DEFAULT 1,
  `name` varchar(255) DEFAULT NULL,
  `name_slug` varchar(255) DEFAULT NULL,
  `parent_id` int(11) DEFAULT 0,
  `description` varchar(500) DEFAULT NULL,
  `keywords` varchar(500) DEFAULT NULL,
  `color` varchar(255) DEFAULT NULL,
  `block_type` varchar(255) DEFAULT NULL,
  `category_order` int(11) DEFAULT 0,
  `show_on_homepage` tinyint(1) DEFAULT 1,
  `show_on_menu` tinyint(1) DEFAULT 1,
  `created_at` timestamp NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `ci_sessions`
--

CREATE TABLE `ci_sessions` (
  `id` varchar(128) NOT NULL,
  `ip_address` varchar(45) NOT NULL,
  `timestamp` timestamp NOT NULL DEFAULT current_timestamp(),
  `data` blob NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `comments`
--

CREATE TABLE `comments` (
  `id` int(11) NOT NULL,
  `parent_id` int(11) DEFAULT 0,
  `post_id` int(11) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `comment` varchar(5000) DEFAULT NULL,
  `ip_address` varchar(45) DEFAULT NULL,
  `like_count` int(11) DEFAULT 0,
  `status` tinyint(1) DEFAULT 1,
  `created_at` timestamp NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `contacts`
--

CREATE TABLE `contacts` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `message` varchar(5000) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `files`
--

CREATE TABLE `files` (
  `id` int(11) NOT NULL,
  `file_name` varchar(255) DEFAULT NULL,
  `file_path` varchar(255) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `storage` varchar(20) DEFAULT 'local'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `followers`
--

CREATE TABLE `followers` (
  `id` int(11) NOT NULL,
  `following_id` int(11) DEFAULT NULL,
  `follower_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `fonts`
--

CREATE TABLE `fonts` (
  `id` int(11) NOT NULL,
  `font_name` varchar(255) DEFAULT NULL,
  `font_key` varchar(255) DEFAULT NULL,
  `font_url` varchar(2000) DEFAULT NULL,
  `font_family` varchar(500) DEFAULT NULL,
  `font_source` varchar(50) DEFAULT 'google',
  `has_local_file` tinyint(1) DEFAULT 0,
  `is_default` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `fonts`
--

INSERT INTO `fonts` (`id`, `font_name`, `font_key`, `font_url`, `font_family`, `font_source`, `has_local_file`, `is_default`) VALUES
(1, 'Arial', 'arial', NULL, 'font-family: Arial, Helvetica, sans-serif', 'local', 0, 1),
(2, 'Arvo', 'arvo', '<link href=\"https://fonts.googleapis.com/css?family=Arvo:400,700&display=swap\" rel=\"stylesheet\">\r\n', 'font-family: \"Arvo\", Helvetica, sans-serif', 'google', 0, 0),
(3, 'Averia Libre', 'averia-libre', '<link href=\"https://fonts.googleapis.com/css?family=Averia+Libre:300,400,700&display=swap\" rel=\"stylesheet\">\r\n', 'font-family: \"Averia Libre\", Helvetica, sans-serif', 'google', 0, 0),
(4, 'Bitter', 'bitter', '<link href=\"https://fonts.googleapis.com/css?family=Bitter:400,400i,700&display=swap&subset=latin-ext\" rel=\"stylesheet\">\r\n', 'font-family: \"Bitter\", Helvetica, sans-serif', 'google', 0, 0),
(5, 'Cabin', 'cabin', '<link href=\"https://fonts.googleapis.com/css?family=Cabin:400,500,600,700&display=swap&subset=latin-ext,vietnamese\" rel=\"stylesheet\">\r\n', 'font-family: \"Cabin\", Helvetica, sans-serif', 'google', 0, 0),
(6, 'Cherry Swash', 'cherry-swash', '<link href=\"https://fonts.googleapis.com/css?family=Cherry+Swash:400,700&display=swap&subset=latin-ext\" rel=\"stylesheet\">\r\n', 'font-family: \"Cherry Swash\", Helvetica, sans-serif', 'google', 0, 0),
(7, 'Encode Sans', 'encode-sans', '<link href=\"https://fonts.googleapis.com/css?family=Encode+Sans:300,400,500,600,700&display=swap&subset=latin-ext,vietnamese\" rel=\"stylesheet\">\r\n', 'font-family: \"Encode Sans\", Helvetica, sans-serif', 'google', 0, 0),
(8, 'Helvetica', 'helvetica', NULL, 'font-family: Helvetica, sans-serif', 'local', 0, 1),
(9, 'Hind', 'hind', '<link href=\"https://fonts.googleapis.com/css?family=Hind:300,400,500,600,700&display=swap&subset=devanagari,latin-ext\" rel=\"stylesheet\">', 'font-family: \"Hind\", Helvetica, sans-serif', 'google', 0, 0),
(10, 'Inter', 'inter', '<link href=\"https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap\" rel=\"stylesheet\">', 'font-family: \"Inter\", sans-serif;', 'local', 1, 0),
(11, 'Josefin Sans', 'josefin-sans', '<link href=\"https://fonts.googleapis.com/css?family=Josefin+Sans:300,400,600,700&display=swap&subset=latin-ext,vietnamese\" rel=\"stylesheet\">\r\n', 'font-family: \"Josefin Sans\", Helvetica, sans-serif', 'google', 0, 0),
(12, 'Kalam', 'kalam', '<link href=\"https://fonts.googleapis.com/css?family=Kalam:300,400,700&display=swap&subset=devanagari,latin-ext\" rel=\"stylesheet\">\r\n', 'font-family: \"Kalam\", Helvetica, sans-serif', 'google', 0, 0),
(13, 'Khula', 'khula', '<link href=\"https://fonts.googleapis.com/css?family=Khula:300,400,600,700&display=swap&subset=devanagari,latin-ext\" rel=\"stylesheet\">\r\n', 'font-family: \"Khula\", Helvetica, sans-serif', 'google', 0, 0),
(14, 'Lato', 'lato', '<link href=\"https://fonts.googleapis.com/css?family=Lato:300,400,700&display=swap&subset=latin-ext\" rel=\"stylesheet\">', 'font-family: \"Lato\", Helvetica, sans-serif', 'google', 0, 0),
(15, 'Lora', 'lora', '<link href=\"https://fonts.googleapis.com/css?family=Lora:400,700&display=swap&subset=cyrillic,cyrillic-ext,latin-ext,vietnamese\" rel=\"stylesheet\">\r\n', 'font-family: \"Lora\", Helvetica, sans-serif', 'google', 0, 0),
(16, 'Merriweather', 'merriweather', '<link href=\"https://fonts.googleapis.com/css?family=Merriweather:300,400,700&display=swap&subset=cyrillic,cyrillic-ext,latin-ext,vietnamese\" rel=\"stylesheet\">\r\n', 'font-family: \"Merriweather\", Helvetica, sans-serif', 'google', 0, 0),
(17, 'Montserrat', 'montserrat', '<link href=\"https://fonts.googleapis.com/css?family=Montserrat:300,400,500,600,700&display=swap&subset=cyrillic,cyrillic-ext,latin-ext,vietnamese\" rel=\"stylesheet\">\r\n', 'font-family: \"Montserrat\", Helvetica, sans-serif', 'google', 0, 0),
(18, 'Mukta', 'mukta', '<link href=\"https://fonts.googleapis.com/css?family=Mukta:300,400,500,600,700&display=swap&subset=devanagari,latin-ext\" rel=\"stylesheet\">\r\n', 'font-family: \"Mukta\", Helvetica, sans-serif', 'google', 0, 0),
(19, 'Nunito', 'nunito', '<link href=\"https://fonts.googleapis.com/css?family=Nunito:300,400,600,700&display=swap&subset=cyrillic,cyrillic-ext,latin-ext,vietnamese\" rel=\"stylesheet\">\r\n', 'font-family: \"Nunito\", Helvetica, sans-serif', 'google', 0, 0),
(20, 'Open Sans', 'open-sans', '<link href=\"https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700&display=swap\" rel=\"stylesheet\">', 'font-family: \"Open Sans\", Helvetica, sans-serif', 'local', 1, 0),
(21, 'Oswald', 'oswald', '<link href=\"https://fonts.googleapis.com/css?family=Oswald:300,400,500,600,700&display=swap&subset=cyrillic,cyrillic-ext,latin-ext,vietnamese\" rel=\"stylesheet\">', 'font-family: \"Oswald\", Helvetica, sans-serif', 'google', 0, 0),
(22, 'Oxygen', 'oxygen', '<link href=\"https://fonts.googleapis.com/css?family=Oxygen:300,400,700&display=swap&subset=latin-ext\" rel=\"stylesheet\">\r\n', 'font-family: \"Oxygen\", Helvetica, sans-serif', 'google', 0, 0),
(23, 'Poppins', 'poppins', '<link href=\"https://fonts.googleapis.com/css?family=Poppins:300,400,500,600,700&display=swap&subset=devanagari,latin-ext\" rel=\"stylesheet\">', 'font-family: \"Poppins\", Helvetica, sans-serif', 'google', 0, 0),
(24, 'PT Sans', 'pt-sans', '<link href=\"https://fonts.googleapis.com/css?family=PT+Sans:400,700&display=swap&subset=cyrillic,cyrillic-ext,latin-ext\" rel=\"stylesheet\">\r\n', 'font-family: \"PT Sans\", Helvetica, sans-serif', 'google', 0, 0),
(25, 'PT Serif', 'pt-serif', '<link href=\"https://fonts.googleapis.com/css2?family=PT+Serif:wght@400;700&display=swap\" rel=\"stylesheet\">', 'font-family: \"PT Serif\", serif;', 'local', 1, 0),
(26, 'Raleway', 'raleway', '<link href=\"https://fonts.googleapis.com/css?family=Raleway:300,400,500,600,700&display=swap&subset=latin-ext\" rel=\"stylesheet\">\r\n', 'font-family: \"Raleway\", Helvetica, sans-serif', 'google', 0, 0),
(27, 'Roboto', 'roboto', '<link href=\"https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap&subset=cyrillic,cyrillic-ext,greek,greek-ext,latin-ext,vietnamese\" rel=\"stylesheet\">', 'font-family: \"Roboto\", Helvetica, sans-serif', 'local', 1, 0),
(28, 'Roboto Condensed', 'roboto-condensed', '<link href=\"https://fonts.googleapis.com/css?family=Roboto+Condensed:300,400,700&display=swap&subset=cyrillic,cyrillic-ext,greek,greek-ext,latin-ext,vietnamese\" rel=\"stylesheet\">\r\n', 'font-family: \"Roboto Condensed\", Helvetica, sans-serif', 'google', 0, 0),
(29, 'Roboto Slab', 'roboto-slab', '<link href=\"https://fonts.googleapis.com/css?family=Roboto+Slab:300,400,500,600,700&display=swap&subset=cyrillic,cyrillic-ext,greek,greek-ext,latin-ext,vietnamese\" rel=\"stylesheet\">\r\n', 'font-family: \"Roboto Slab\", Helvetica, sans-serif', 'google', 0, 0),
(30, 'Rokkitt', 'rokkitt', '<link href=\"https://fonts.googleapis.com/css?family=Rokkitt:300,400,500,600,700&display=swap&subset=latin-ext,vietnamese\" rel=\"stylesheet\">\r\n', 'font-family: \"Rokkitt\", Helvetica, sans-serif', 'google', 0, 0),
(31, 'Source Sans Pro', 'source-sans-pro', '<link href=\"https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,600,700&display=swap&subset=cyrillic,cyrillic-ext,greek,greek-ext,latin-ext,vietnamese\" rel=\"stylesheet\">', 'font-family: \"Source Sans Pro\", Helvetica, sans-serif', 'google', 0, 0),
(32, 'Titillium Web', 'titillium-web', '<link href=\"https://fonts.googleapis.com/css?family=Titillium+Web:300,400,600,700&display=swap&subset=latin-ext\" rel=\"stylesheet\">', 'font-family: \"Titillium Web\", Helvetica, sans-serif', 'google', 0, 0),
(33, 'Ubuntu', 'ubuntu', '<link href=\"https://fonts.googleapis.com/css?family=Ubuntu:300,400,500,700&display=swap&subset=cyrillic,cyrillic-ext,greek,greek-ext,latin-ext\" rel=\"stylesheet\">', 'font-family: \"Ubuntu\", Helvetica, sans-serif', 'google', 0, 0),
(34, 'Verdana', 'verdana', NULL, 'font-family: Verdana, Helvetica, sans-serif', 'local', 0, 1);

-- --------------------------------------------------------

--
-- Table structure for table `gallery`
--

CREATE TABLE `gallery` (
  `id` int(11) NOT NULL,
  `lang_id` int(11) DEFAULT 1,
  `title` varchar(500) DEFAULT NULL,
  `album_id` int(11) DEFAULT NULL,
  `category_id` int(11) DEFAULT NULL,
  `path_big` varchar(255) DEFAULT NULL,
  `path_small` varchar(255) DEFAULT NULL,
  `is_album_cover` tinyint(1) DEFAULT 0,
  `storage` varchar(20) DEFAULT 'local',
  `created_at` timestamp NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `gallery_albums`
--

CREATE TABLE `gallery_albums` (
  `id` int(11) NOT NULL,
  `lang_id` int(11) DEFAULT 1,
  `name` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `gallery_categories`
--

CREATE TABLE `gallery_categories` (
  `id` int(11) NOT NULL,
  `lang_id` int(11) DEFAULT 1,
  `name` varchar(255) DEFAULT NULL,
  `album_id` int(11) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `general_settings`
--

CREATE TABLE `general_settings` (
  `id` int(11) NOT NULL,
  `site_lang` int(11) NOT NULL DEFAULT 1,
  `multilingual_system` tinyint(1) DEFAULT 1,
  `theme_mode` varchar(25) DEFAULT 'light',
  `logo` varchar(255) DEFAULT NULL,
  `logo_footer` varchar(255) DEFAULT NULL,
  `logo_email` varchar(255) DEFAULT NULL,
  `favicon` varchar(255) DEFAULT NULL,
  `show_hits` tinyint(1) DEFAULT 1,
  `show_rss` tinyint(1) DEFAULT 1,
  `rss_content_type` varchar(50) DEFAULT '''summary''',
  `show_newsticker` tinyint(1) DEFAULT 1,
  `pagination_per_page` smallint(6) DEFAULT 10,
  `google_analytics` text DEFAULT NULL,
  `mail_service` varchar(100) DEFAULT 'swift',
  `mail_protocol` varchar(100) DEFAULT 'smtp',
  `mail_encryption` varchar(100) DEFAULT 'tls',
  `mail_host` varchar(255) DEFAULT NULL,
  `mail_port` varchar(255) DEFAULT '587',
  `mail_username` varchar(255) DEFAULT NULL,
  `mail_password` varchar(255) DEFAULT NULL,
  `mail_title` varchar(255) DEFAULT NULL,
  `mail_reply_to` varchar(255) DEFAULT 'noreply@domain.com',
  `mailjet_api_key` varchar(255) DEFAULT NULL,
  `mailjet_secret_key` varchar(255) DEFAULT NULL,
  `mailjet_email_address` varchar(255) DEFAULT NULL,
  `google_client_id` varchar(500) DEFAULT NULL,
  `google_client_secret` varchar(500) DEFAULT NULL,
  `vk_app_id` varchar(500) DEFAULT NULL,
  `vk_secure_key` varchar(500) DEFAULT NULL,
  `facebook_app_id` varchar(500) DEFAULT NULL,
  `facebook_app_secret` varchar(500) DEFAULT NULL,
  `facebook_comment` text DEFAULT NULL,
  `facebook_comment_active` tinyint(1) DEFAULT 1,
  `show_featured_section` tinyint(1) DEFAULT 1,
  `show_latest_posts` tinyint(1) DEFAULT 1,
  `pwa_status` tinyint(1) DEFAULT 0,
  `registration_system` tinyint(1) DEFAULT 1,
  `post_url_structure` varchar(50) DEFAULT '''slug''',
  `comment_system` tinyint(1) DEFAULT 1,
  `comment_approval_system` tinyint(1) DEFAULT 1,
  `show_post_author` tinyint(1) DEFAULT 1,
  `show_post_date` tinyint(1) DEFAULT 1,
  `menu_limit` tinyint(4) DEFAULT 8,
  `custom_header_codes` mediumtext DEFAULT NULL,
  `custom_footer_codes` mediumtext DEFAULT NULL,
  `adsense_activation_code` text DEFAULT NULL,
  `recaptcha_site_key` varchar(255) DEFAULT NULL,
  `recaptcha_secret_key` varchar(255) DEFAULT NULL,
  `emoji_reactions` tinyint(1) DEFAULT 1,
  `mail_contact_status` tinyint(1) DEFAULT 0,
  `mail_contact` varchar(255) DEFAULT NULL,
  `cache_system` tinyint(1) DEFAULT 0,
  `cache_refresh_time` int(11) DEFAULT 1800,
  `refresh_cache_database_changes` tinyint(1) DEFAULT 0,
  `email_verification` tinyint(1) DEFAULT 0,
  `file_manager_show_files` tinyint(1) DEFAULT 1,
  `audio_download_button` tinyint(1) DEFAULT 1,
  `approve_added_user_posts` tinyint(1) DEFAULT 1,
  `approve_updated_user_posts` tinyint(1) DEFAULT 1,
  `timezone` varchar(255) DEFAULT 'America/New_York',
  `show_latest_posts_on_slider` tinyint(1) DEFAULT 0,
  `show_latest_posts_on_featured` tinyint(1) DEFAULT 0,
  `sort_slider_posts` varchar(100) DEFAULT 'by_slider_order',
  `sort_featured_posts` varchar(100) DEFAULT 'by_featured_order',
  `newsletter_status` tinyint(1) DEFAULT 1,
  `newsletter_popup` tinyint(1) DEFAULT 0,
  `show_home_link` tinyint(1) DEFAULT 1,
  `post_format_article` tinyint(1) DEFAULT 1,
  `post_format_gallery` tinyint(1) DEFAULT 1,
  `post_format_sorted_list` tinyint(1) DEFAULT 1,
  `post_format_video` tinyint(1) DEFAULT 1,
  `post_format_audio` tinyint(1) DEFAULT 1,
  `post_format_trivia_quiz` tinyint(1) DEFAULT 1,
  `post_format_personality_quiz` tinyint(1) DEFAULT 1,
  `post_format_poll` tinyint(1) DEFAULT 1,
  `post_format_table_of_contents` tinyint(1) DEFAULT 1,
  `post_format_recipe` tinyint(1) DEFAULT 1,
  `maintenance_mode_title` varchar(500) DEFAULT 'Coming Soon!',
  `maintenance_mode_description` varchar(5000) DEFAULT NULL,
  `maintenance_mode_status` tinyint(1) DEFAULT 0,
  `sitemap_frequency` varchar(30) DEFAULT 'monthly',
  `sitemap_last_modification` varchar(30) DEFAULT 'server_response',
  `sitemap_priority` varchar(30) DEFAULT 'automatically',
  `show_user_email_on_profile` tinyint(1) DEFAULT 1,
  `reward_system_status` tinyint(1) DEFAULT 0,
  `reward_amount` double DEFAULT 1,
  `currency_name` varchar(100) DEFAULT 'US Dollar',
  `currency_symbol` varchar(10) DEFAULT '$',
  `currency_format` varchar(10) DEFAULT 'us',
  `currency_symbol_format` varchar(10) DEFAULT 'left',
  `payout_paypal_status` tinyint(1) DEFAULT 1,
  `payout_iban_status` tinyint(1) DEFAULT 1,
  `payout_swift_status` tinyint(1) DEFAULT 1,
  `storage` varchar(20) DEFAULT 'local',
  `aws_key` varchar(255) DEFAULT NULL,
  `aws_secret` varchar(255) DEFAULT NULL,
  `aws_bucket` varchar(255) DEFAULT NULL,
  `aws_region` varchar(255) DEFAULT NULL,
  `auto_post_deletion` tinyint(1) DEFAULT 0,
  `auto_post_deletion_days` smallint(6) DEFAULT 30,
  `auto_post_deletion_delete_all` tinyint(1) DEFAULT 0,
  `redirect_rss_posts_to_original` tinyint(1) DEFAULT 0,
  `image_file_format` varchar(30) DEFAULT '''JPG''',
  `allowed_file_extensions` varchar(500) DEFAULT '''jpg,jpeg,png,gif,svg,csv,doc,docx,pdf,ppt,psd,mp4,mp3,zip''',
  `google_news` tinyint(1) DEFAULT 0,
  `delete_images_with_post` tinyint(1) DEFAULT 0,
  `sticky_sidebar` tinyint(1) DEFAULT 0,
  `last_cron_update` timestamp NULL DEFAULT NULL,
  `version` varchar(30) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `general_settings`
--

INSERT INTO `general_settings` (`id`, `site_lang`, `multilingual_system`, `theme_mode`, `logo`, `logo_footer`, `logo_email`, `favicon`, `show_hits`, `show_rss`, `rss_content_type`, `show_newsticker`, `pagination_per_page`, `google_analytics`, `mail_service`, `mail_protocol`, `mail_encryption`, `mail_host`, `mail_port`, `mail_username`, `mail_password`, `mail_title`, `mail_reply_to`, `mailjet_api_key`, `mailjet_secret_key`, `mailjet_email_address`, `google_client_id`, `google_client_secret`, `vk_app_id`, `vk_secure_key`, `facebook_app_id`, `facebook_app_secret`, `facebook_comment`, `facebook_comment_active`, `show_featured_section`, `show_latest_posts`, `pwa_status`, `registration_system`, `post_url_structure`, `comment_system`, `comment_approval_system`, `show_post_author`, `show_post_date`, `menu_limit`, `custom_header_codes`, `custom_footer_codes`, `adsense_activation_code`, `recaptcha_site_key`, `recaptcha_secret_key`, `emoji_reactions`, `mail_contact_status`, `mail_contact`, `cache_system`, `cache_refresh_time`, `refresh_cache_database_changes`, `email_verification`, `file_manager_show_files`, `audio_download_button`, `approve_added_user_posts`, `approve_updated_user_posts`, `timezone`, `show_latest_posts_on_slider`, `show_latest_posts_on_featured`, `sort_slider_posts`, `sort_featured_posts`, `newsletter_status`, `newsletter_popup`, `show_home_link`, `post_format_article`, `post_format_gallery`, `post_format_sorted_list`, `post_format_video`, `post_format_audio`, `post_format_trivia_quiz`, `post_format_personality_quiz`, `post_format_poll`, `post_format_table_of_contents`, `post_format_recipe`, `maintenance_mode_title`, `maintenance_mode_description`, `maintenance_mode_status`, `sitemap_frequency`, `sitemap_last_modification`, `sitemap_priority`, `show_user_email_on_profile`, `reward_system_status`, `reward_amount`, `currency_name`, `currency_symbol`, `currency_format`, `currency_symbol_format`, `payout_paypal_status`, `payout_iban_status`, `payout_swift_status`, `storage`, `aws_key`, `aws_secret`, `aws_bucket`, `aws_region`, `auto_post_deletion`, `auto_post_deletion_days`, `auto_post_deletion_delete_all`, `redirect_rss_posts_to_original`, `image_file_format`, `allowed_file_extensions`, `google_news`, `delete_images_with_post`, `sticky_sidebar`, `last_cron_update`, `version`) VALUES
(1, 1, 1, 'light', NULL, NULL, NULL, NULL, 1, 1, 'summary', 1, 16, NULL, 'swift', 'smtp', 'tls', NULL, '587', NULL, NULL, 'Varient', 'noreply@domain.com', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, 1, 1, 0, 1, 'slug', 1, 1, 1, 1, 9, NULL, NULL, NULL, NULL, NULL, 1, 0, NULL, 0, 1800, 0, 0, 0, 1, 1, 1, 'America/New_York', 0, 0, 'by_slider_order', 'by_featured_order', 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 'Coming Soon!', 'Our website is under construction. We\'ll be here soon with our new awesome site.', 0, 'hourly', 'server_response', 'automatically', 1, 0, 0.25, 'USD', '$', 'us', 'left', 1, 1, 1, 'local', NULL, NULL, NULL, NULL, 0, 30, 0, 0, 'JPG', 'jpg,jpeg,png,gif,svg,csv,doc,docx,pdf,ppt,psd,mp4,mp3,zip', 0, 0, 0, NULL, '2.2');

-- --------------------------------------------------------

--
-- Table structure for table `images`
--

CREATE TABLE `images` (
  `id` int(11) NOT NULL,
  `image_big` varchar(255) DEFAULT NULL,
  `image_default` varchar(255) DEFAULT NULL,
  `image_slider` varchar(255) DEFAULT NULL,
  `image_mid` varchar(255) DEFAULT NULL,
  `image_small` varchar(255) DEFAULT NULL,
  `image_mime` varchar(50) DEFAULT 'jpg',
  `file_name` varchar(255) DEFAULT NULL,
  `storage` varchar(20) DEFAULT 'local',
  `user_id` int(11) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `languages`
--

CREATE TABLE `languages` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `short_form` varchar(255) NOT NULL,
  `language_code` varchar(100) NOT NULL,
  `text_direction` varchar(50) NOT NULL,
  `text_editor_lang` varchar(30) DEFAULT 'en',
  `status` tinyint(1) NOT NULL DEFAULT 1,
  `language_order` smallint(6) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `languages`
--

INSERT INTO `languages` (`id`, `name`, `short_form`, `language_code`, `text_direction`, `text_editor_lang`, `status`, `language_order`) VALUES
(1, 'English', 'en', 'en-US', 'ltr', 'en', 1, 1);

-- --------------------------------------------------------

--
-- Table structure for table `language_translations`
--

CREATE TABLE `language_translations` (
  `id` int(11) NOT NULL,
  `lang_id` smallint(6) DEFAULT NULL,
  `label` varchar(255) DEFAULT NULL,
  `translation` varchar(500) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `language_translations`
--

INSERT INTO `language_translations` (`id`, `lang_id`, `label`, `translation`) VALUES
(1, 1, 'about_me', 'About Me'),
(2, 1, 'accept_cookies', 'Accept Cookies'),
(3, 1, 'activate', 'Activate'),
(4, 1, 'activated', 'Activated'),
(5, 1, 'active', 'Active'),
(6, 1, 'additional_images', 'Additional Images'),
(7, 1, 'address', 'Address'),
(8, 1, 'add_album', 'Add Album'),
(9, 1, 'add_answer', 'Add Answer'),
(10, 1, 'add_article', 'Add Article'),
(11, 1, 'add_audio', 'Add Audio'),
(12, 1, 'add_breaking', 'Add to Breaking'),
(13, 1, 'add_category', 'Add Category'),
(14, 1, 'add_featured', 'Add to Featured'),
(15, 1, 'add_font', 'Add Font'),
(16, 1, 'add_gallery', 'Add Gallery'),
(17, 1, 'add_iframe', 'Add Iframe'),
(18, 1, 'add_image', 'Add Image'),
(19, 1, 'add_image_url', 'Add Image Url'),
(20, 1, 'add_language', 'Add Language'),
(21, 1, 'add_link', 'Add Menu Link'),
(22, 1, 'add_new', 'Add New'),
(23, 1, 'add_new_item', 'Add New Item'),
(24, 1, 'add_page', 'Add Page'),
(25, 1, 'add_payout', 'Add Payout'),
(26, 1, 'add_personality_quiz', 'Add Personality Quiz'),
(27, 1, 'add_poll', 'Add Poll'),
(28, 1, 'add_post', 'Add Post'),
(29, 1, 'add_posts_as_draft', 'Add Posts as Draft'),
(30, 1, 'add_question', 'Add Question'),
(31, 1, 'add_quiz', 'Add Quiz'),
(32, 1, 'add_reading_list', 'Add to Reading List'),
(33, 1, 'add_recipe', 'Add Recipe'),
(34, 1, 'add_recommended', 'Add to Recommended'),
(35, 1, 'add_result', 'Add Result'),
(36, 1, 'add_slider', 'Add to Slider'),
(37, 1, 'add_sorted_list', 'Add Sorted List'),
(38, 1, 'add_table_of_contents', 'Add Table of Contents'),
(39, 1, 'add_trivia_quiz', 'Add Trivia Quiz'),
(40, 1, 'add_user', 'Add User'),
(41, 1, 'add_video', 'Add Video'),
(42, 1, 'add_widget', 'Add Widget'),
(43, 1, 'admin', 'Admin'),
(44, 1, 'administrators', 'Administrators'),
(45, 1, 'admin_panel', 'Admin Panel'),
(46, 1, 'admin_panel_link', 'Admin Panel Link'),
(47, 1, 'adsense_activation_code', 'AdSense Activation Code'),
(48, 1, 'advanced', 'Advanced'),
(49, 1, 'ad_size', 'Ad Size'),
(50, 1, 'ad_space', 'Ad Space'),
(51, 1, 'ad_spaces', 'Ad Spaces'),
(52, 1, 'ad_space_header', 'Header'),
(53, 1, 'ad_space_index_bottom', 'Index (Bottom)'),
(54, 1, 'ad_space_index_top', 'Index (Top)'),
(55, 1, 'ad_space_in_article', 'In-Article'),
(56, 1, 'ad_space_paragraph_exp', 'The ad will be displayed after the paragraph number you selected'),
(57, 1, 'ad_space_posts_bottom', 'Posts (Bottom)'),
(58, 1, 'ad_space_posts_exp', 'This ad will be displayed on Posts, Category, Profile, Tag, Search and Profile pages'),
(59, 1, 'ad_space_posts_top', 'Posts (Top)'),
(60, 1, 'ad_space_post_bottom', 'Post Details (Bottom)'),
(61, 1, 'ad_space_post_top', 'Post Details (Top)'),
(62, 1, 'ago', 'ago'),
(63, 1, 'album', 'Album'),
(64, 1, 'albums', 'Albums'),
(65, 1, 'album_cover', 'Album Cover'),
(66, 1, 'album_name', 'Album Name'),
(67, 1, 'all', 'All'),
(68, 1, 'allowed_file_extensions', 'Allowed File Extensions'),
(69, 1, 'all_permissions', 'All Permissions'),
(70, 1, 'all_posts', 'All Posts'),
(71, 1, 'all_time', 'All Time'),
(72, 1, 'all_users_can_vote', 'All Users Can Vote'),
(73, 1, 'always', 'Always'),
(74, 1, 'amount', 'Amount'),
(75, 1, 'angry', 'Angry'),
(76, 1, 'answers', 'Answers'),
(77, 1, 'answer_format', 'Answer Format'),
(78, 1, 'answer_text', 'Answer Text'),
(79, 1, 'api_key', 'API Key'),
(80, 1, 'approve', 'Approve'),
(81, 1, 'approved_comments', 'Approved Comments'),
(82, 1, 'approve_added_user_posts', 'Approve Added User Posts'),
(83, 1, 'approve_updated_user_posts', 'Approve Updated User Posts'),
(84, 1, 'app_id', 'App ID'),
(85, 1, 'app_name', 'Application Name'),
(86, 1, 'app_secret', 'App Secret'),
(87, 1, 'April', 'Apr'),
(88, 1, 'article', 'Article'),
(89, 1, 'article_post_exp', 'An article with images and embed videos'),
(90, 1, 'audio', 'Audio'),
(91, 1, 'audios', 'Audios'),
(92, 1, 'audios_exp', 'Select your audios and create your playlist'),
(93, 1, 'audio_download_button', 'Audio Download Button'),
(94, 1, 'audio_post_exp', 'Upload audios and create playlist'),
(95, 1, 'August', 'Aug'),
(96, 1, 'author', 'Author'),
(97, 1, 'auto_post_deletion', 'Auto Post Deletion'),
(98, 1, 'auto_update', 'Auto Update'),
(99, 1, 'avatar', 'Avatar'),
(100, 1, 'aws_key', 'AWS Access Key'),
(101, 1, 'aws_secret', 'AWS Secret Key'),
(102, 1, 'aws_storage', 'AWS S3 Storage'),
(103, 1, 'back', 'Back'),
(104, 1, 'balance', 'Balance'),
(105, 1, 'bank_account_holder_name', 'Bank Account Holder\'s Name'),
(106, 1, 'bank_branch_city', 'Bank Branch City'),
(107, 1, 'bank_branch_country', 'Bank Branch Country'),
(108, 1, 'bank_name', 'Bank Name'),
(109, 1, 'banned', 'Banned'),
(110, 1, 'banner', 'Banner'),
(111, 1, 'banner_desktop', 'Desktop Banner'),
(112, 1, 'banner_desktop_exp', 'This ad will be displayed on screens larger than 992px'),
(113, 1, 'banner_mobile', 'Mobile Banner'),
(114, 1, 'banner_mobile_exp', 'This ad will be displayed on screens smaller than 992px'),
(115, 1, 'ban_user', 'Ban User'),
(116, 1, 'block_color', 'Top Header and Block Heads Color'),
(117, 1, 'breaking', 'Breaking'),
(118, 1, 'breaking_news', 'Breaking News'),
(119, 1, 'browse_files', 'Browse Files'),
(120, 1, 'btn_goto_home', 'Go Back to the Homepage'),
(121, 1, 'btn_reply', 'Reply'),
(122, 1, 'btn_send', 'Send'),
(123, 1, 'btn_submit', 'Submit'),
(124, 1, 'bucket_name', 'Bucket Name'),
(125, 1, 'bulk_post_upload', 'Bulk Post Upload'),
(126, 1, 'bulk_post_upload_exp', 'You can add your posts with a CSV file from this section'),
(127, 1, 'by_date', 'by Date'),
(128, 1, 'by_featured_order', 'by Featured Order'),
(129, 1, 'by_slider_order', 'by Slider Order'),
(130, 1, 'cache_refresh_time', 'Cache Refresh Time (Minute)'),
(131, 1, 'cache_refresh_time_exp', 'After this time, your cache files will be refreshed.'),
(132, 1, 'cache_system', 'Cache System'),
(133, 1, 'cancel', 'Cancel'),
(134, 1, 'categories', 'Categories'),
(135, 1, 'category', 'Category'),
(136, 1, 'category_block_style', 'Category Block Style'),
(137, 1, 'category_ids_list', 'Category Ids list'),
(138, 1, 'category_name', 'Category Name'),
(139, 1, 'category_select_widget', 'Select the widgets you want to show in the sidebar'),
(140, 1, 'change', 'Change'),
(141, 1, 'change_avatar', 'Change Avatar'),
(142, 1, 'change_favicon', 'Change favicon'),
(143, 1, 'change_logo', 'Change logo'),
(144, 1, 'change_password', 'Change Password'),
(145, 1, 'change_user_role', 'Change User Role'),
(146, 1, 'choose_post_format', 'Choose a Post Format'),
(147, 1, 'circle', 'Circle'),
(148, 1, 'city', 'City'),
(149, 1, 'client_id', 'Client ID'),
(150, 1, 'client_secret', 'Client Secret'),
(151, 1, 'close', 'Close'),
(152, 1, 'color', 'Color'),
(153, 1, 'color_code', 'Color Code'),
(154, 1, 'comment', 'Comment'),
(155, 1, 'comments', 'Comments'),
(156, 1, 'comment_approval_system', 'Comment Approval System'),
(157, 1, 'comment_system', 'Comment System'),
(158, 1, 'completed', 'Completed'),
(159, 1, 'confirmed', 'Confirmed'),
(160, 1, 'confirm_album', 'Are you sure you want to delete this album?'),
(161, 1, 'confirm_answer', 'Are you sure you want to delete this answer?'),
(162, 1, 'confirm_ban', 'Are you sure you want to ban this user?'),
(163, 1, 'confirm_category', 'Are you sure you want to delete this category?'),
(164, 1, 'confirm_comment', 'Are you sure you want to delete this comment?'),
(165, 1, 'confirm_comments', 'Are you sure you want to delete selected comments?'),
(166, 1, 'confirm_image', 'Are you sure you want to delete this image?'),
(167, 1, 'confirm_item', 'Are you sure you want to delete this item?'),
(168, 1, 'confirm_language', 'Are you sure you want to delete this language?'),
(169, 1, 'confirm_link', 'Are you sure you want to delete this link?'),
(170, 1, 'confirm_message', 'Are you sure you want to delete this message?'),
(171, 1, 'confirm_messages', 'Are you sure you want to delete selected messages?'),
(172, 1, 'confirm_page', 'Are you sure you want to delete this page?'),
(173, 1, 'confirm_password', 'Confirm Password'),
(174, 1, 'confirm_poll', 'Are you sure you want to delete this poll?'),
(175, 1, 'confirm_post', 'Are you sure you want to delete this post?'),
(176, 1, 'confirm_posts', 'Are you sure you want to delete selected posts?'),
(177, 1, 'confirm_question', 'Are you sure you want to delete this question?'),
(178, 1, 'confirm_record', 'Are you sure you want to delete this record?'),
(179, 1, 'confirm_result', 'Are you sure you want to delete this result?'),
(180, 1, 'confirm_rss', 'Are you sure you want to delete this feed?'),
(181, 1, 'confirm_user', 'Are you sure you want to delete this user?'),
(182, 1, 'confirm_user_email', 'Confirm User Email'),
(183, 1, 'confirm_widget', 'Are you sure you want to delete this widget?'),
(184, 1, 'confirm_your_email', 'Confirm Your Email'),
(185, 1, 'connect_with_facebook', 'Connect with Facebook'),
(186, 1, 'connect_with_google', 'Connect with Google'),
(187, 1, 'connect_with_vk', 'Connect with VK'),
(188, 1, 'contact', 'Contact'),
(189, 1, 'contact_message', 'Contact Message'),
(190, 1, 'contact_messages', 'Contact Messages'),
(191, 1, 'contact_messages_will_send', 'Contact messages will be sent to this email.'),
(192, 1, 'contact_settings', 'Contact Settings'),
(193, 1, 'contact_text', 'Contact Text'),
(194, 1, 'content', 'Content'),
(195, 1, 'cookies_warning', 'Cookies Warning'),
(196, 1, 'cookie_prefix', 'Cookie Prefix'),
(197, 1, 'cook_time', 'Cook Time'),
(198, 1, 'copyright', 'Copyright'),
(199, 1, 'correct', 'Correct'),
(200, 1, 'correct_answer', 'Correct Answer'),
(201, 1, 'country', 'Country'),
(202, 1, 'create_account', 'Create an Account'),
(203, 1, 'create_ad_exp', 'If you don\'t have an ad code, you can create an ad code by selecting an image and adding an URL'),
(204, 1, 'currency', 'Currency'),
(205, 1, 'currency_format', 'Currency Format'),
(206, 1, 'currency_name', 'Currency Name'),
(207, 1, 'currency_symbol', 'Currency Symbol'),
(208, 1, 'currency_symbol_format', 'Currency Symbol Format'),
(209, 1, 'custom', 'Custom'),
(210, 1, 'custom_footer_codes', 'Custom Footer Codes'),
(211, 1, 'custom_footer_codes_exp', 'These codes will be added to the footer of the site.'),
(212, 1, 'custom_header_codes', 'Custom Header Codes'),
(213, 1, 'custom_header_codes_exp', 'These codes will be added to the header of the site.'),
(214, 1, 'daily', 'Daily'),
(215, 1, 'dark_mode', 'Dark Mode'),
(216, 1, 'dashboard', 'Dashboard'),
(217, 1, 'data_type', 'Data Type'),
(218, 1, 'date', 'Date'),
(219, 1, 'date_added', 'Date Added'),
(220, 1, 'date_publish', 'Date Published'),
(221, 1, 'day', 'day'),
(222, 1, 'days', 'days'),
(223, 1, 'days_remaining', 'Days Remaining'),
(224, 1, 'December', 'Dec'),
(225, 1, 'default', 'Default'),
(226, 1, 'default_language', 'Default Language'),
(227, 1, 'delete', 'Delete'),
(228, 1, 'delete_account', 'Delete Account'),
(229, 1, 'delete_account_confirm', 'Deleting your account is permanent and will remove all content including comments, avatars and profile settings. Are you sure you want to delete your account?'),
(230, 1, 'delete_all_posts', 'Delete All Posts'),
(231, 1, 'delete_images_with_post', 'Delete Images Along with Post'),
(232, 1, 'delete_only_rss_posts', 'Delete only RSS Posts'),
(233, 1, 'delete_reading_list', 'Remove from Reading List'),
(234, 1, 'description', 'Description'),
(235, 1, 'difficulty', 'Difficulty'),
(236, 1, 'directions', 'Directions'),
(237, 1, 'disable', 'Disable'),
(238, 1, 'disable_reward_system', 'Disable Reward System'),
(239, 1, 'dislike', 'Dislike'),
(240, 1, 'distribute_only_post_summary', 'Distribute only Post Summary'),
(241, 1, 'distribute_post_content', 'Distribute Post Content'),
(242, 1, 'documentation', 'Documentation'),
(243, 1, 'dont_add_menu', 'Don\'t Add to Menu'),
(244, 1, 'dont_want_receive_emails', 'Don\'t want receive these emails?'),
(245, 1, 'download_button', 'Download Button'),
(246, 1, 'download_csv_example', 'Download CSV Example'),
(247, 1, 'download_csv_template', 'Download CSV Template'),
(248, 1, 'download_database_backup', 'Download Database Backup'),
(249, 1, 'download_images_my_server', 'Download Images to My Server'),
(250, 1, 'drafts', 'Drafts'),
(251, 1, 'drag_drop_files_here', 'Drag and drop files here or'),
(252, 1, 'drag_drop_file_here', 'Drag and drop file here or'),
(253, 1, 'earnings', 'Earnings'),
(254, 1, 'easy', 'Easy'),
(255, 1, 'edit', 'Edit'),
(256, 1, 'edit_phrases', 'Edit Phrases'),
(257, 1, 'edit_role', 'Edit Role'),
(258, 1, 'edit_translations', 'Edit Translations'),
(259, 1, 'email', 'Email'),
(260, 1, 'email_reset_password', 'Please click on the button below to reset your password.'),
(261, 1, 'email_settings', 'Email Settings'),
(262, 1, 'email_status', 'Email Status'),
(263, 1, 'email_verification', 'Email Verification'),
(264, 1, 'embed_media', 'Embed Media'),
(265, 1, 'emoji_reactions', 'Emoji Reactions'),
(266, 1, 'enable', 'Enable'),
(267, 1, 'enable_reward_system', 'Enable Reward System'),
(268, 1, 'encryption', 'Encryption'),
(269, 1, 'enter_email_address', 'Enter your email address'),
(270, 1, 'enter_new_password', 'Enter your new password'),
(271, 1, 'example', 'Example'),
(272, 1, 'export', 'Export'),
(273, 1, 'facebook', 'Facebook'),
(274, 1, 'facebook_comments', 'Facebook Comments'),
(275, 1, 'facebook_comments_code', 'Facebook Comments Plugin Code'),
(276, 1, 'favicon', 'Favicon'),
(277, 1, 'featured', 'Featured'),
(278, 1, 'featured_order', 'Featured Order'),
(279, 1, 'featured_posts', 'Featured Posts'),
(280, 1, 'February', 'Feb'),
(281, 1, 'feed', 'Feed'),
(282, 1, 'feed_name', 'Feed Name'),
(283, 1, 'feed_url', 'Feed URL'),
(284, 1, 'field', 'Field'),
(285, 1, 'files', 'Files'),
(286, 1, 'files_exp', 'Downloadable additional files (.pdf, .docx, .zip etc..)'),
(287, 1, 'file_extensions', 'File Extensions'),
(288, 1, 'file_manager', 'File Manager'),
(289, 1, 'file_upload', 'File Upload'),
(290, 1, 'filter', 'Filter'),
(291, 1, 'folder_name', 'Folder Name'),
(292, 1, 'follow', 'Follow'),
(293, 1, 'followers', 'Followers'),
(294, 1, 'following', 'Following'),
(295, 1, 'fonts', 'Fonts'),
(296, 1, 'font_family', 'Font Family'),
(297, 1, 'font_settings', 'Font Settings'),
(298, 1, 'font_source', 'Font Source'),
(299, 1, 'footer', 'Footer'),
(300, 1, 'footer_about_section', 'Footer About Section'),
(301, 1, 'footer_follow', 'Social Media'),
(302, 1, 'forgot_password', 'Forgot Password'),
(303, 1, 'form_validation_is_unique', 'The {field} field must contain a unique value.'),
(304, 1, 'form_validation_matches', 'The {field} field does not match the {param} field.'),
(305, 1, 'form_validation_max_length', 'The {field} field cannot exceed {param} characters in length.'),
(306, 1, 'form_validation_min_length', 'The {field} field must be at least {param} characters in length.'),
(307, 1, 'form_validation_required', 'The {field} field is required.'),
(308, 1, 'frequency', 'Frequency'),
(309, 1, 'frequency_exp', 'This value indicates how frequently the content at a particular URL is likely to change'),
(310, 1, 'full_name', 'Full Name'),
(311, 1, 'funny', 'Funny'),
(312, 1, 'gallery', 'Gallery'),
(313, 1, 'gallery_albums', 'Gallery Albums'),
(314, 1, 'gallery_categories', 'Gallery Categories'),
(315, 1, 'gallery_post', 'Gallery Post'),
(316, 1, 'gallery_post_exp', 'A collection of images'),
(317, 1, 'gallery_post_items', 'Gallery Post Items'),
(318, 1, 'general', 'General'),
(319, 1, 'general_settings', 'General Settings'),
(320, 1, 'generate', 'Generate'),
(321, 1, 'generated_sitemaps', 'Generated Sitemaps'),
(322, 1, 'generate_feed_url', 'Generate Feed URL'),
(323, 1, 'generate_keywords_from_title', 'Generate Keywords from Title'),
(324, 1, 'generate_sitemap', 'Generate Sitemap'),
(325, 1, 'get_video', 'Get Video'),
(326, 1, 'get_video_from_url', 'Get Video from URL'),
(327, 1, 'google', 'Google'),
(328, 1, 'google_analytics', 'Google Analytics'),
(329, 1, 'google_analytics_code', 'Google Analytics Code'),
(330, 1, 'google_news', 'Google News'),
(331, 1, 'google_news_cache_exp', 'This system uses cache system. So the records in your XML file will be automatically updated every 15 minutes.'),
(332, 1, 'google_news_exp', 'According to Google News rules, there can be a maximum of 1000 publications in an XML file. Therefore, it is not recommended to increase this limit.'),
(333, 1, 'google_recaptcha', 'Google reCAPTCHA'),
(334, 1, 'height', 'Height'),
(335, 1, 'help_documents', 'Help Documents'),
(336, 1, 'help_documents_exp', 'You can use these documents to generate your CSV file'),
(337, 1, 'hide', 'Hide'),
(338, 1, 'hit', 'Hit'),
(339, 1, 'home', 'Home'),
(340, 1, 'homepage', 'Homepage'),
(341, 1, 'home_title', 'Home Title'),
(342, 1, 'horizontal', 'Horizontal'),
(343, 1, 'hour', 'hour'),
(344, 1, 'hourly', 'Hourly'),
(345, 1, 'hours', 'hours'),
(346, 1, 'iban', 'IBAN'),
(347, 1, 'iban_long', 'International Bank Account Number'),
(348, 1, 'id', 'Id'),
(349, 1, 'image', 'Image'),
(350, 1, 'images', 'Images'),
(351, 1, 'image_description', 'Image Description'),
(352, 1, 'image_file_format', 'Image File Format'),
(353, 1, 'image_for_video', 'Image for video'),
(354, 1, 'importing_posts', 'Importing posts...'),
(355, 1, 'import_language', 'Import Language'),
(356, 1, 'import_rss_feed', 'Import RSS Feed'),
(357, 1, 'inactive', 'Inactive'),
(358, 1, 'index', 'Index'),
(359, 1, 'info_about_recipe', 'Information About the Recipe'),
(360, 1, 'ingredient', 'Ingredient'),
(361, 1, 'ingredients', 'Ingredients'),
(362, 1, 'ingredient_ex', 'Example: 1 tablespoon olive oil'),
(363, 1, 'insufficient_balance', 'Insufficient balance!'),
(364, 1, 'intermediate', 'Intermediate'),
(365, 1, 'invalid', 'Invalid!'),
(366, 1, 'invalid_feed_url', 'Invalid feed URL!'),
(367, 1, 'invalid_file_type', 'Invalid file type!'),
(368, 1, 'invalid_url', 'Invalid URL!'),
(369, 1, 'ip_address', 'Ip Address'),
(370, 1, 'item_order', 'Item Order'),
(371, 1, 'January', 'Jan'),
(372, 1, 'join_newsletter', 'Join Our Newsletter'),
(373, 1, 'json_language_file', 'JSON Language File'),
(374, 1, 'July', 'Jul'),
(375, 1, 'June', 'Jun'),
(376, 1, 'just_now', 'Just Now'),
(377, 1, 'keywords', 'Keywords'),
(378, 1, 'label', 'Label'),
(379, 1, 'language', 'Language'),
(380, 1, 'languages', 'Languages'),
(381, 1, 'language_code', 'Language Code'),
(382, 1, 'language_name', 'Language Name'),
(383, 1, 'language_settings', 'Language Settings'),
(384, 1, 'last_comments', 'Latest Comments'),
(385, 1, 'last_contact_messages', 'Latest Contact Messages'),
(386, 1, 'last_modification', 'Last Modification'),
(387, 1, 'last_modification_exp', 'The time the URL was last modified'),
(388, 1, 'last_seen', 'Last seen:'),
(389, 1, 'latest_posts', 'Latest Posts'),
(390, 1, 'latest_users', 'Latest Users'),
(391, 1, 'leave_message', 'Send a Message'),
(392, 1, 'leave_reply', 'Leave a Reply'),
(393, 1, 'leave_your_comment', 'Leave your comment...'),
(394, 1, 'left', 'Left'),
(395, 1, 'left_to_right', 'Left to Right'),
(396, 1, 'level_1', 'Level 1'),
(397, 1, 'level_2', 'Level 2'),
(398, 1, 'level_3', 'Level 3'),
(399, 1, 'like', 'Like'),
(400, 1, 'limit', 'Limit'),
(401, 1, 'link', 'Link'),
(402, 1, 'link_list_style', 'Link List Style'),
(403, 1, 'link_type', 'Link Type'),
(404, 1, 'load_more', 'Load More'),
(405, 1, 'load_more_comments', 'Load More Comments'),
(406, 1, 'local', 'Local'),
(407, 1, 'local_storage', 'Local Storage'),
(408, 1, 'location', 'Location'),
(409, 1, 'login', 'Login'),
(410, 1, 'login_error', 'Wrong username or password!'),
(411, 1, 'logo', 'Logo'),
(412, 1, 'logout', 'Logout'),
(413, 1, 'logo_email', 'Logo Email'),
(414, 1, 'logo_footer', 'Logo Footer'),
(415, 1, 'love', 'Love'),
(416, 1, 'mail', 'Mail'),
(417, 1, 'mailjet_email_address', 'Mailjet Email Address'),
(418, 1, 'mailjet_email_address_exp', 'The address you created your Mailjet account with'),
(419, 1, 'mail_host', 'Mail Host'),
(420, 1, 'mail_is_being_sent', 'Mail is being sent. Please do not close this page until the process is finished!'),
(421, 1, 'mail_password', 'Mail Password'),
(422, 1, 'mail_port', 'Mail Port'),
(423, 1, 'mail_protocol', 'Mail Protocol'),
(424, 1, 'mail_service', 'Mail Service'),
(425, 1, 'mail_title', 'Mail Title'),
(426, 1, 'mail_username', 'Mail Username'),
(427, 1, 'maintenance_mode', 'Maintenance Mode'),
(428, 1, 'main_menu', 'Main Menu'),
(429, 1, 'main_navigation', 'MAIN NAVIGATION'),
(430, 1, 'main_post_image', 'Main post image'),
(431, 1, 'manage_all_posts', 'Manage All Posts'),
(432, 1, 'March', 'Mar'),
(433, 1, 'max', 'Max'),
(434, 1, 'May', 'May'),
(435, 1, 'mega_menu_color', 'Mega Menu Color'),
(436, 1, 'member_since', 'Member since'),
(437, 1, 'menu_limit', 'Menu Limit '),
(438, 1, 'message', 'Message'),
(439, 1, 'message_ban_error', 'Your account has been banned!'),
(440, 1, 'message_change_password_error', 'There was a problem changing your password!'),
(441, 1, 'message_change_password_success', 'Your password has been successfully changed!'),
(442, 1, 'message_contact_error', 'There was a problem sending your message!'),
(443, 1, 'message_contact_success', 'Your message has been successfully sent!'),
(444, 1, 'message_email_unique_error', 'The email has already been taken.'),
(445, 1, 'message_invalid_email', 'Invalid email address!'),
(446, 1, 'message_newsletter_error', 'Your email address is already registered!'),
(447, 1, 'message_newsletter_success', 'Your email address has been successfully added!'),
(448, 1, 'message_page_auth', 'You must be logged in to view this page!'),
(449, 1, 'message_post_auth', 'You must be logged in to view this post!'),
(450, 1, 'message_profile_success', 'Your profile has been successfully updated!'),
(451, 1, 'message_register_error', 'There was a problem during registration. Please try again!'),
(452, 1, 'meta_tag', 'Meta Tag'),
(453, 1, 'min', 'Min'),
(454, 1, 'minute', 'minute'),
(455, 1, 'minutes', 'minutes'),
(456, 1, 'minute_short', 'min'),
(457, 1, 'month', 'month'),
(458, 1, 'monthly', 'Monthly'),
(459, 1, 'months', 'months'),
(460, 1, 'more', 'More'),
(461, 1, 'more_info', 'More info'),
(462, 1, 'more_main_images', 'More main images (slider will be active)'),
(463, 1, 'most_viewed_posts', 'Most Viewed Posts'),
(464, 1, 'msg_added', 'Item successfully added!'),
(465, 1, 'msg_beforeunload', 'You have unsaved changes! Are you sure you want to leave this page?'),
(466, 1, 'msg_comment_approved', 'Comment successfully approved!'),
(467, 1, 'msg_comment_sent_successfully', 'Your comment has been sent. It will be published after being reviewed by the site management.'),
(468, 1, 'msg_confirmation_email', 'Please confirm your email address by clicking the button below.'),
(469, 1, 'msg_confirmed', 'Your email address has been successfully confirmed!'),
(470, 1, 'msg_confirmed_required', 'Please verify your email address!'),
(471, 1, 'msg_cron_feed', 'With this URL you can automatically update your feeds.'),
(472, 1, 'msg_cron_sitemap', 'With this URL you can automatically update your sitemap.'),
(473, 1, 'msg_deleted', 'Item successfully deleted!'),
(474, 1, 'msg_delete_album', 'Please delete categories belonging to this album first!'),
(475, 1, 'msg_delete_images', 'Please delete images belonging to this category first!'),
(476, 1, 'msg_delete_posts', 'Please delete posts belonging to this category first!'),
(477, 1, 'msg_delete_subcategories', 'Please delete subcategories belonging to this category first!'),
(478, 1, 'msg_delete_subpages', 'Please delete subpages/sublinks first!'),
(479, 1, 'msg_email_sent', 'Email successfully sent!'),
(480, 1, 'msg_error', 'An error occurred please try again!'),
(481, 1, 'msg_language_delete', 'Default language cannot be deleted!'),
(482, 1, 'msg_not_authorized', 'You are not authorized to perform this operation!'),
(483, 1, 'msg_page_delete', 'Default pages cannot be deleted!'),
(484, 1, 'msg_payout_added', 'Payout has been successfully added!'),
(485, 1, 'msg_recaptcha', 'Please confirm that you are not a robot!'),
(486, 1, 'msg_reset_cache', 'All cache files have been deleted!'),
(487, 1, 'msg_role_changed', 'User role successfully changed!'),
(488, 1, 'msg_rss_warning', 'If you chose to download the images to your server, adding posts will take more time and will use more resources. If you see any problems, increase \'max_execution_time\' and \'memory_limit\' values from your server settings.'),
(489, 1, 'msg_send_confirmation_email', 'A confirmation email has been sent to your email address for activation. Please confirm your account.'),
(490, 1, 'msg_slug_used', 'The slug you entered is being used by another user!'),
(491, 1, 'msg_unsubscribe', 'You will no longer receive emails from us!'),
(492, 1, 'msg_updated', 'Changes successfully saved!'),
(493, 1, 'msg_username_unique_error', 'The username has already been taken.'),
(494, 1, 'msg_user_added', 'User successfully added!'),
(495, 1, 'msg_widget_delete', 'Default widgets cannot be deleted!'),
(496, 1, 'msg_wrong_password', 'Wrong Password!'),
(497, 1, 'multilingual_system', 'Multilingual System'),
(498, 1, 'musician', 'Musician'),
(499, 1, 'name', 'Name'),
(500, 1, 'navigation', 'Navigation'),
(501, 1, 'navigation_exp', 'You can manage the navigation by dragging and dropping menu items.'),
(502, 1, 'nav_drag_warning', 'You cannot drag a category below a page or a page below a category link!'),
(503, 1, 'never', 'Never'),
(504, 1, 'newsletter', 'Newsletter'),
(505, 1, 'newsletter_desc', 'Join our subscribers list to get the latest news, updates and special offers directly in your inbox'),
(506, 1, 'newsletter_email_error', 'Select email addresses that you want to send mail!'),
(507, 1, 'newsletter_popup', 'Newsletter Popup'),
(508, 1, 'newsletter_send_many_exp', 'Some servers do not allow mass mailing. Therefore, instead of sending your mails to all subscribers at once, you can send them part by part (Example: 50 subscribers at once). If your mail server stops sending mail, the sending process will also stop.'),
(509, 1, 'new_password', 'New Password'),
(510, 1, 'next', 'Next'),
(511, 1, 'next_article', 'Next Article'),
(512, 1, 'next_video', 'Next Video'),
(513, 1, 'no', 'No'),
(514, 1, 'none', 'None'),
(515, 1, 'November', 'Nov'),
(516, 1, 'no_records_found', 'No records found.'),
(517, 1, 'no_thanks', 'No, thanks'),
(518, 1, 'number', 'Number'),
(519, 1, 'number_of_correct_answers', 'Number of Correct Answers'),
(520, 1, 'number_of_correct_answers_range', 'The range of correct answers to show this result'),
(521, 1, 'number_of_days', 'Number of Days'),
(522, 1, 'number_of_days_exp', 'If you add 30 here, the system will delete posts older than 30 days'),
(523, 1, 'number_of_links_in_menu', 'The number of links that appear in the menu'),
(524, 1, 'number_of_posts_import', 'Number of Posts to Import'),
(525, 1, 'number_short_billion', 'b'),
(526, 1, 'number_short_million', 'm'),
(527, 1, 'number_short_thousand', 'k'),
(528, 1, 'nutritional_ex', 'Example: Protein 34g'),
(529, 1, 'nutritional_information', 'Nutritional Information\r\n'),
(530, 1, 'October', 'Oct'),
(531, 1, 'ok', 'OK'),
(532, 1, 'old_password', 'Old Password'),
(533, 1, 'online', 'online'),
(534, 1, 'only_registered', 'Only Registered'),
(535, 1, 'optional', 'Optional'),
(536, 1, 'optional_url', 'Optional URL'),
(537, 1, 'optional_url_name', 'Post Optional URL Button Name'),
(538, 1, 'options', 'Options'),
(539, 1, 'option_1', 'Option 1'),
(540, 1, 'option_10', 'Option 10'),
(541, 1, 'option_2', 'Option 2'),
(542, 1, 'option_3', 'Option 3'),
(543, 1, 'option_4', 'Option 4'),
(544, 1, 'option_5', 'Option 5'),
(545, 1, 'option_6', 'Option 6'),
(546, 1, 'option_7', 'Option 7'),
(547, 1, 'option_8', 'Option 8'),
(548, 1, 'option_9', 'Option 9'),
(549, 1, 'or', 'or'),
(550, 1, 'order', 'Menu Order'),
(551, 1, 'order_1', 'Order'),
(552, 1, 'or_login_with_email', 'Or login with email'),
(553, 1, 'or_register_with_email', 'Or register with email'),
(554, 1, 'page', 'Page'),
(555, 1, 'pages', 'Pages'),
(556, 1, 'pageviews', 'Pageviews'),
(557, 1, 'page_not_found', 'Page not found'),
(558, 1, 'page_not_found_sub', 'The page you are looking for doesn\'t exist.'),
(559, 1, 'page_type', 'Page Type'),
(560, 1, 'pagination_number_posts', 'Number of Posts Per Page (Pagination)'),
(561, 1, 'panel', 'Panel'),
(562, 1, 'paragraph', 'Paragraph'),
(563, 1, 'parent_category', 'Parent Category'),
(564, 1, 'parent_link', 'Parent Link'),
(565, 1, 'password', 'Password'),
(566, 1, 'paste_ad_code', 'Ad Code'),
(567, 1, 'paste_ad_url', 'Ad URL'),
(568, 1, 'payouts', 'Payouts'),
(569, 1, 'payout_method', 'Payout Method'),
(570, 1, 'payout_methods', 'Payout Methods'),
(571, 1, 'paypal', 'PayPal'),
(572, 1, 'paypal_email_address', 'PayPal Email Address'),
(573, 1, 'pending_comments', 'Pending Comments'),
(574, 1, 'pending_posts', 'Pending Posts'),
(575, 1, 'permissions', 'Permissions'),
(576, 1, 'personality_quiz', 'Personality Quiz'),
(577, 1, 'personality_quiz_exp', 'Quizzes with custom results'),
(578, 1, 'personal_website_url', 'Personal Website URL'),
(579, 1, 'phone', 'Phone'),
(580, 1, 'phrase', 'Phrase'),
(581, 1, 'phrases', 'Phrases'),
(582, 1, 'placeholder_search', 'Search...'),
(583, 1, 'play_again', 'Play Again'),
(584, 1, 'play_list_empty', 'Playlist is empty.'),
(585, 1, 'please_select_option', 'Please select an option!'),
(586, 1, 'poll', 'Poll'),
(587, 1, 'polls', 'Polls'),
(588, 1, 'poll_exp', 'Get user opinions about something'),
(589, 1, 'popular_posts', 'Popular Posts'),
(590, 1, 'post', 'Post'),
(591, 1, 'postcode', 'Postcode'),
(592, 1, 'posts', 'Posts'),
(593, 1, 'post_comment', 'Post Comment'),
(594, 1, 'post_details', 'Post Details'),
(595, 1, 'post_formats', 'Post Formats'),
(596, 1, 'post_options', 'Post Options'),
(597, 1, 'post_owner', 'Post Owner'),
(598, 1, 'post_tags', 'Tags:'),
(599, 1, 'post_type', 'Post Type'),
(600, 1, 'post_url_structure', 'Post URL Structure'),
(601, 1, 'post_url_structure_exp', 'Changing the URL structure will not affect old records.'),
(602, 1, 'post_url_structure_slug', 'Use Slug in URLs'),
(603, 1, 'post_url_structur_id', 'Use ID Numbers in URLs'),
(604, 1, 'preferences', 'Preferences'),
(605, 1, 'prep_time', 'Prep Time'),
(606, 1, 'preview', 'Preview'),
(607, 1, 'previous', 'Previous'),
(608, 1, 'previous_article', 'Previous Article'),
(609, 1, 'previous_video', 'Previous Video'),
(610, 1, 'primary_font', 'Primary Font (Main)'),
(611, 1, 'priority', 'Priority'),
(612, 1, 'priority_exp', 'The priority of a particular URL relative to other pages on the same site'),
(613, 1, 'priority_none', 'Automatically Calculated Priority'),
(614, 1, 'profile', 'Profile'),
(615, 1, 'progressive_web_app', 'Progressive Web App (PWA)'),
(616, 1, 'publish', 'Publish'),
(617, 1, 'pwa_warning', 'If you enable PWA option, read \'Progressive Web App (PWA)\' section from our documentation to make the necessary settings.'),
(618, 1, 'question', 'Question'),
(619, 1, 'questions', 'Questions'),
(620, 1, 'quiz_images', 'Quiz Images'),
(621, 1, 'random_posts', 'Random Posts'),
(622, 1, 'reading_list', 'Reading List'),
(623, 1, 'read_more_button_text', 'Read More Button Text'),
(624, 1, 'recently_added_comments', 'Recently added comments'),
(625, 1, 'recently_added_contact_messages', 'Recently added contact messages'),
(626, 1, 'recently_added_unapproved_comments', 'Recently added unapproved comments'),
(627, 1, 'recently_registered_users', 'Recently registered users'),
(628, 1, 'recipe', 'Recipe'),
(629, 1, 'recipe_exp', 'A list of ingredients and directions for cooking'),
(630, 1, 'recipe_video', 'Recipe video'),
(631, 1, 'recommended', 'Recommended'),
(632, 1, 'recommended_posts', 'Recommended Posts'),
(633, 1, 'redirect_rss_posts_to_original', 'Redirect RSS Posts to the Original Site'),
(634, 1, 'refresh_cache_database_changes', 'Refresh Cache Files When Database Changes'),
(635, 1, 'region_code', 'Region Code'),
(636, 1, 'register', 'Register'),
(637, 1, 'registered_emails', 'Registered Emails'),
(638, 1, 'registered_users_can_vote', 'Only Registered Users Can Vote'),
(639, 1, 'registration_system', 'Registration System'),
(640, 1, 'related_posts', 'Related Posts'),
(641, 1, 'related_videos', 'Related Videos'),
(642, 1, 'remove_ban', 'Remove Ban'),
(643, 1, 'remove_breaking', 'Remove from Breaking'),
(644, 1, 'remove_featured', 'Remove from Featured'),
(645, 1, 'remove_recommended', 'Remove from Recommended'),
(646, 1, 'remove_slider', 'Remove from Slider'),
(647, 1, 'reply_to', 'Reply-To'),
(648, 1, 'required', 'Required'),
(649, 1, 'resend_activation_email', 'Resend Activation Email'),
(650, 1, 'reset', 'Reset'),
(651, 1, 'reset_cache', 'Reset Cache'),
(652, 1, 'reset_password', 'Reset Password'),
(653, 1, 'reset_password_error', 'We can\'t find a user with that e-mail address!'),
(654, 1, 'reset_password_success', 'We\'ve sent an email for resetting your password to your email address. Please check your email for next steps.'),
(655, 1, 'result', 'Result'),
(656, 1, 'results', 'Results'),
(657, 1, 'reward_amount', 'Reward Amount for 1000 Pageviews'),
(658, 1, 'reward_system', 'Reward System'),
(659, 1, 'right', 'Right'),
(660, 1, 'right_to_left', 'Right to Left'),
(661, 1, 'role', 'Role'),
(662, 1, 'roles_permissions', 'Roles & Permissions'),
(663, 1, 'role_name', 'Role Name'),
(664, 1, 'route_settings', 'Route Settings'),
(665, 1, 'route_settings_warning', 'You cannot use special characters in routes. If your language contains special characters, please be careful when editing routes. If you enter an invalid route, you will not be able to access the related page.'),
(666, 1, 'rss', 'RSS'),
(667, 1, 'rss_content', 'RSS Content'),
(668, 1, 'rss_feeds', 'RSS Feeds'),
(669, 1, 'sad', 'Sad'),
(670, 1, 'save', 'Save'),
(671, 1, 'save_changes', 'Save Changes'),
(672, 1, 'save_draft', 'Save as Draft'),
(673, 1, 'scheduled_post', 'Scheduled Post'),
(674, 1, 'scheduled_posts', 'Scheduled Posts'),
(675, 1, 'search', 'Search'),
(676, 1, 'search_in_post_content', 'Search in Post Content'),
(677, 1, 'search_noresult', 'No results found.'),
(678, 1, 'secondary_font', 'Secondary Font (Titles)'),
(679, 1, 'secret_key', 'Secret Key'),
(680, 1, 'secure_key', 'Secure Key'),
(681, 1, 'select', 'Select'),
(682, 1, 'select_ad_spaces', 'Select Ad Space'),
(683, 1, 'select_an_option', 'Select an option'),
(684, 1, 'select_audio', 'Select Audio'),
(685, 1, 'select_a_result', 'Select a result'),
(686, 1, 'select_category', 'Select a category'),
(687, 1, 'select_file', 'Select File'),
(688, 1, 'select_image', 'Select Image'),
(689, 1, 'select_multiple_images', 'You can select multiple images.'),
(690, 1, 'select_video', 'Select Video'),
(691, 1, 'send_contact_to_mail', 'Send Contact Messages to Email Address'),
(692, 1, 'send_email', 'Send Email'),
(693, 1, 'send_email_registered', 'Send Email to Registered Emails'),
(694, 1, 'send_email_subscriber', 'Send Email to Subscriber'),
(695, 1, 'send_email_subscribers', 'Send Email to Subscribers'),
(696, 1, 'send_test_email', 'Send Test Email'),
(697, 1, 'send_test_email_exp', 'You can send a test mail to check if your mail server is working.'),
(698, 1, 'seo_options', 'Seo options'),
(699, 1, 'seo_tools', 'SEO Tools'),
(700, 1, 'September', 'Sep'),
(701, 1, 'server_response', 'Server\'s Response'),
(702, 1, 'serving', 'Serving'),
(703, 1, 'settings', 'Settings'),
(704, 1, 'settings_language', 'Settings Language'),
(705, 1, 'set_as_album_cover', 'Set as Album Cover'),
(706, 1, 'set_as_default', 'Set as Default'),
(707, 1, 'set_default_payment_account', 'Set as Default Payment Account'),
(708, 1, 'set_payout_account', 'Set Payout Account'),
(709, 1, 'share', 'Share'),
(710, 1, 'shared', 'Shared'),
(711, 1, 'short_form', 'Short Form'),
(712, 1, 'show', 'Show'),
(713, 1, 'show_all_files', 'Show all Files'),
(714, 1, 'show_breadcrumb', 'Show Breadcrumb'),
(715, 1, 'show_cookies_warning', 'Show Cookies Warning'),
(716, 1, 'show_email_on_profile', 'Show Email on Profile Page'),
(717, 1, 'show_featured_section', 'Show Featured Section'),
(718, 1, 'show_images_from_original_source', 'Show Images from Original Source'),
(719, 1, 'show_item_numbers', 'Show Item Numbers in Post Details Page'),
(720, 1, 'show_latest_posts_homepage', 'Show Latest Posts on Homepage'),
(721, 1, 'show_latest_posts_on_featured', 'Show Latest Posts on Featured Posts'),
(722, 1, 'show_latest_posts_on_slider', 'Show Latest Posts on Slider'),
(723, 1, 'show_list_style_post_text', 'Show List Style in Post Text'),
(724, 1, 'show_news_ticker', 'Show News Ticker'),
(725, 1, 'show_only_own_files', 'Show Only Users Own Files'),
(726, 1, 'show_only_registered', 'Show Only to Registered Users'),
(727, 1, 'show_on_homepage', 'Show on Homepage'),
(728, 1, 'show_on_menu', 'Show on Menu'),
(729, 1, 'show_post_author', 'Show Post Author'),
(730, 1, 'show_post_dates', 'Show Post Date'),
(731, 1, 'show_post_view_counts', 'Show Post View Count'),
(732, 1, 'show_read_more_button', 'Show Read More Button'),
(733, 1, 'show_right_column', 'Show Right Column'),
(734, 1, 'show_title', 'Show Title'),
(735, 1, 'show_user_email_profile', 'Show User\'s Email on Profile'),
(736, 1, 'sidebar', 'Sidebar'),
(737, 1, 'sitemap', 'Sitemap'),
(738, 1, 'sitemap_generate_exp', 'If your site has more than 50,000 links, the sitemap.xml file will be created in parts.'),
(739, 1, 'site_color', 'Site Color'),
(740, 1, 'site_description', 'Site Description'),
(741, 1, 'site_font', 'Site Font'),
(742, 1, 'site_key', 'Site Key'),
(743, 1, 'site_title', 'Site Title'),
(744, 1, 'slider', 'Slider'),
(745, 1, 'slider_order', 'Slider Order'),
(746, 1, 'slider_posts', 'Slider Posts'),
(747, 1, 'slug', 'Slug'),
(748, 1, 'slug_exp', 'If you leave it blank, it will be generated automatically.'),
(749, 1, 'smtp', 'SMTP'),
(750, 1, 'social_accounts', 'Social Accounts'),
(751, 1, 'social_login_settings', 'Social Login Settings'),
(752, 1, 'social_media_settings', 'Social Media Settings'),
(753, 1, 'sorted_list', 'Sorted List'),
(754, 1, 'sorted_list_exp', 'A list based article'),
(755, 1, 'sorted_list_items', 'Sorted List Items'),
(756, 1, 'sort_featured_posts', 'Sort Featured Posts'),
(757, 1, 'sort_slider_posts', 'Sort Slider Posts'),
(758, 1, 'state', 'State'),
(759, 1, 'status', 'Status'),
(760, 1, 'sticky_sidebar', 'Sticky Sidebar'),
(761, 1, 'storage', 'Storage'),
(762, 1, 'style', 'Style'),
(763, 1, 'subcategory', 'Subcategory'),
(764, 1, 'subject', 'Subject'),
(765, 1, 'subscribe', 'Subscribe'),
(766, 1, 'subscribers', 'Subscribers'),
(767, 1, 'summary', 'Summary'),
(768, 1, 'swift', 'SWIFT'),
(769, 1, 'swift_code', 'SWIFT Code'),
(770, 1, 'swift_iban', 'Bank Account Number/IBAN'),
(771, 1, 'table_of_contents', 'Table of Contents'),
(772, 1, 'table_of_contents_exp', 'List of links based on the headings'),
(773, 1, 'table_of_contents_items', 'Table Of Contents Items'),
(774, 1, 'tag', 'Tag'),
(775, 1, 'tags', 'Tags'),
(776, 1, 'terms_conditions', 'Terms & Conditions'),
(777, 1, 'terms_conditions_exp', 'I have read and agree to the'),
(778, 1, 'tertiary_font', 'Tertiary Font (Post & Page Text)'),
(779, 1, 'text_direction', 'Text Direction'),
(780, 1, 'text_editor_language', 'Text Editor Language'),
(781, 1, 'text_list_empty', 'Your reading list is empty.'),
(782, 1, 'themes', 'Themes'),
(783, 1, 'theme_settings', 'Theme Settings'),
(784, 1, 'the_operation_completed', 'The operation completed successfully!'),
(785, 1, 'this_month', 'This Month'),
(786, 1, 'this_week', 'This Week'),
(787, 1, 'timezone', 'Timezone'),
(788, 1, 'title', 'Title'),
(789, 1, 'to', 'To:'),
(790, 1, 'top_headlines', 'Top Headlines'),
(791, 1, 'top_menu', 'Top Menu'),
(792, 1, 'total_pageviews', 'Total Pageviews'),
(793, 1, 'total_vote', 'Total Vote:'),
(794, 1, 'total_votes', 'Total Votes'),
(795, 1, 'translation', 'Translation'),
(796, 1, 'trivia_quiz', 'Trivia Quiz'),
(797, 1, 'trivia_quiz_exp', 'Quizzes with right and wrong answers'),
(798, 1, 'twitter', 'Twitter'),
(799, 1, 'txt_processing', 'Processing...'),
(800, 1, 'type', 'Type'),
(801, 1, 'type_tag', 'Type tag and hit enter'),
(802, 1, 'unconfirmed', 'Unconfirmed'),
(803, 1, 'unfollow', 'Unfollow'),
(804, 1, 'unsubscribe', 'Unsubscribe'),
(805, 1, 'unsubscribe_successful', 'Unsubscribe Successful!'),
(806, 1, 'update', 'Update'),
(807, 1, 'updated', 'Updated'),
(808, 1, 'update_album', 'Update Album'),
(809, 1, 'update_article', 'Update Article'),
(810, 1, 'update_audio', 'Update Audio'),
(811, 1, 'update_category', 'Update Category'),
(812, 1, 'update_font', 'Update Font'),
(813, 1, 'update_gallery', 'Update Gallery'),
(814, 1, 'update_image', 'Update Image'),
(815, 1, 'update_language', 'Update Language'),
(816, 1, 'update_link', 'Update Menu Link'),
(817, 1, 'update_page', 'Update Page'),
(818, 1, 'update_personality_quiz', 'Update Personality Quiz'),
(819, 1, 'update_poll', 'Update Poll'),
(820, 1, 'update_post', 'Update Post'),
(821, 1, 'update_profile', 'Update Profile'),
(822, 1, 'update_recipe', 'Update Recipe'),
(823, 1, 'update_rss_feed', 'Update RSS Feed'),
(824, 1, 'update_sorted_list', 'Update Sorted List'),
(825, 1, 'update_subcategory', 'Update Subcategory'),
(826, 1, 'update_table_of_contents', 'Update Table of Contents'),
(827, 1, 'update_trivia_quiz', 'Update Trivia Quiz'),
(828, 1, 'update_video', 'Update Video'),
(829, 1, 'update_widget', 'Update Widget'),
(830, 1, 'upload', 'Upload'),
(831, 1, 'uploading', 'Uploading...'),
(832, 1, 'upload_csv_file', 'Upload CSV File'),
(833, 1, 'upload_image', 'Upload Image'),
(834, 1, 'upload_video', 'Upload Video'),
(835, 1, 'upload_your_banner', 'Create Ad Code'),
(836, 1, 'url', 'URL'),
(837, 1, 'user', 'User'),
(838, 1, 'username', 'Username'),
(839, 1, 'users', 'Users'),
(840, 1, 'user_agent', 'User-Agent'),
(841, 1, 'user_agreement', 'User Agreement'),
(842, 1, 'user_id', 'User Id'),
(843, 1, 'value', 'Value'),
(844, 1, 'vertical', 'Vertical'),
(845, 1, 'video', 'Video'),
(846, 1, 'videos', 'Videos'),
(847, 1, 'video_embed_code', 'Video Embed Code'),
(848, 1, 'video_file', 'Video File'),
(849, 1, 'video_name', 'Video Name'),
(850, 1, 'video_post_exp', 'Upload or embed videos'),
(851, 1, 'video_thumbnails', 'Video Thumbnail'),
(852, 1, 'video_url', 'Video URL'),
(853, 1, 'view_all', 'View All'),
(854, 1, 'view_all_posts', 'View All Posts'),
(855, 1, 'view_options', 'View Options'),
(856, 1, 'view_results', 'View Results'),
(857, 1, 'view_site', 'View Site'),
(858, 1, 'visibility', 'Visibility'),
(859, 1, 'vkontakte', 'VKontakte'),
(860, 1, 'vote', 'Vote'),
(861, 1, 'voted_message', 'You already voted this poll before.'),
(862, 1, 'vote_permission', 'Vote Permission'),
(863, 1, 'warning', 'Warning'),
(864, 1, 'warning_default_payout_account', 'Your earnings will be sent to your default payout account.'),
(865, 1, 'warning_edit_profile_image', 'Click on the save changes button after selecting your image'),
(866, 1, 'weekly', 'Weekly'),
(867, 1, 'whats_your_reaction', 'What\'s Your Reaction?'),
(868, 1, 'where_to_display', 'Where To Display'),
(869, 1, 'widget', 'Widget'),
(870, 1, 'widgets', 'Widgets'),
(871, 1, 'width', 'Width'),
(872, 1, 'wow', 'Wow'),
(873, 1, 'wrong_answer', 'Wrong Answer'),
(874, 1, 'wrong_password_error', 'Wrong old password!'),
(875, 1, 'year', 'year'),
(876, 1, 'yearly', 'Yearly'),
(877, 1, 'years', 'years'),
(878, 1, 'yes', 'Yes');

-- --------------------------------------------------------

--
-- Table structure for table `pages`
--

CREATE TABLE `pages` (
  `id` int(11) NOT NULL,
  `lang_id` int(11) DEFAULT 1,
  `title` varchar(500) DEFAULT NULL,
  `slug` varchar(500) DEFAULT NULL,
  `description` varchar(500) DEFAULT NULL,
  `keywords` varchar(500) DEFAULT NULL,
  `is_custom` tinyint(1) DEFAULT 1,
  `page_default_name` varchar(100) DEFAULT NULL,
  `page_content` mediumtext DEFAULT NULL,
  `page_order` smallint(6) DEFAULT 1,
  `visibility` tinyint(1) DEFAULT 1,
  `title_active` tinyint(1) DEFAULT 1,
  `breadcrumb_active` tinyint(1) DEFAULT 1,
  `right_column_active` tinyint(1) DEFAULT 1,
  `need_auth` tinyint(1) DEFAULT 0,
  `location` varchar(255) DEFAULT 'top',
  `link` varchar(1000) DEFAULT NULL,
  `parent_id` int(11) DEFAULT 0,
  `page_type` varchar(50) DEFAULT 'page',
  `created_at` timestamp NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `pages`
--

INSERT INTO `pages` (`id`, `lang_id`, `title`, `slug`, `description`, `keywords`, `is_custom`, `page_default_name`, `page_content`, `page_order`, `visibility`, `title_active`, `breadcrumb_active`, `right_column_active`, `need_auth`, `location`, `link`, `parent_id`, `page_type`, `created_at`) VALUES
(1, 1, 'Contact', 'contact', 'Varient Contact Page', 'varient, contact, page', 0, 'contact', NULL, 1, 1, 1, 1, 0, 0, 'top', NULL, 0, 'page', '2020-02-18 11:09:21'),
(2, 1, 'Gallery', 'gallery', 'Varient Gallery Page', 'varient, gallery, page', 0, 'gallery', NULL, 1, 1, 1, 1, 0, 0, 'main', NULL, 0, 'page', '2020-02-18 11:11:40'),
(3, 1, 'Terms & Conditions', 'terms-conditions', 'Varient Terms Conditions Page', 'Terms, Conditions, Varient', 0, 'terms_conditions', NULL, 1, 1, 1, 1, 0, 0, 'footer', NULL, 0, 'page', '2020-02-18 11:12:40');

-- --------------------------------------------------------

--
-- Table structure for table `payouts`
--

CREATE TABLE `payouts` (
  `id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `username` varchar(100) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `amount` double NOT NULL,
  `payout_method` varchar(50) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `polls`
--

CREATE TABLE `polls` (
  `id` int(11) NOT NULL,
  `lang_id` int(11) DEFAULT 1,
  `question` text DEFAULT NULL,
  `option1` text DEFAULT NULL,
  `option2` text DEFAULT NULL,
  `option3` text DEFAULT NULL,
  `option4` text DEFAULT NULL,
  `option5` text DEFAULT NULL,
  `option6` text DEFAULT NULL,
  `option7` text DEFAULT NULL,
  `option8` text DEFAULT NULL,
  `option9` text DEFAULT NULL,
  `option10` text DEFAULT NULL,
  `status` tinyint(1) DEFAULT 1,
  `vote_permission` varchar(50) DEFAULT 'all',
  `created_at` timestamp NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `poll_votes`
--

CREATE TABLE `poll_votes` (
  `id` int(11) NOT NULL,
  `poll_id` int(11) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `vote` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `posts`
--

CREATE TABLE `posts` (
  `id` int(11) NOT NULL,
  `lang_id` int(11) DEFAULT 1,
  `title` varchar(500) DEFAULT NULL,
  `title_slug` varchar(500) DEFAULT NULL,
  `title_hash` varchar(500) DEFAULT NULL,
  `keywords` varchar(500) DEFAULT NULL,
  `summary` varchar(5000) DEFAULT NULL,
  `content` longtext DEFAULT NULL,
  `category_id` int(11) DEFAULT NULL,
  `image_big` varchar(255) DEFAULT NULL,
  `image_default` varchar(255) DEFAULT NULL,
  `image_slider` varchar(255) DEFAULT NULL,
  `image_mid` varchar(255) DEFAULT NULL,
  `image_small` varchar(255) DEFAULT NULL,
  `image_mime` varchar(20) DEFAULT 'jpg',
  `image_storage` varchar(20) DEFAULT 'local',
  `optional_url` varchar(1000) DEFAULT NULL,
  `pageviews` int(11) DEFAULT 0,
  `need_auth` tinyint(1) DEFAULT 0,
  `is_slider` tinyint(1) DEFAULT 0,
  `slider_order` tinyint(1) DEFAULT 1,
  `is_featured` tinyint(1) DEFAULT 0,
  `featured_order` tinyint(1) DEFAULT 1,
  `is_recommended` tinyint(1) DEFAULT 0,
  `is_breaking` tinyint(1) DEFAULT 1,
  `is_scheduled` tinyint(1) DEFAULT 0,
  `visibility` tinyint(1) DEFAULT 1,
  `show_right_column` tinyint(1) DEFAULT 1,
  `post_type` varchar(50) DEFAULT 'post',
  `video_path` varchar(255) DEFAULT NULL,
  `video_storage` varchar(20) DEFAULT 'local',
  `image_url` varchar(2000) DEFAULT NULL,
  `video_url` varchar(2000) DEFAULT NULL,
  `video_embed_code` varchar(2000) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `status` tinyint(1) DEFAULT 1,
  `feed_id` int(11) DEFAULT NULL,
  `post_url` varchar(1000) DEFAULT NULL,
  `show_post_url` tinyint(1) DEFAULT 1,
  `image_description` varchar(500) DEFAULT NULL,
  `show_item_numbers` tinyint(1) DEFAULT 1,
  `is_poll_public` tinyint(1) DEFAULT 0,
  `link_list_style` varchar(255) DEFAULT NULL,
  `recipe_info` text DEFAULT NULL,
  `post_data` text DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `post_audios`
--

CREATE TABLE `post_audios` (
  `id` int(11) NOT NULL,
  `post_id` int(11) DEFAULT NULL,
  `audio_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `post_files`
--

CREATE TABLE `post_files` (
  `id` int(11) NOT NULL,
  `post_id` int(11) DEFAULT NULL,
  `file_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `post_gallery_items`
--

CREATE TABLE `post_gallery_items` (
  `id` int(11) NOT NULL,
  `post_id` int(11) DEFAULT NULL,
  `title` varchar(500) DEFAULT NULL,
  `content` text DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `image_large` varchar(255) DEFAULT NULL,
  `image_description` varchar(255) DEFAULT NULL,
  `storage` varchar(20) DEFAULT 'local',
  `item_order` smallint(6) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `post_images`
--

CREATE TABLE `post_images` (
  `id` int(11) NOT NULL,
  `post_id` int(11) DEFAULT NULL,
  `image_big` varchar(255) DEFAULT NULL,
  `image_default` varchar(255) DEFAULT NULL,
  `storage` varchar(20) DEFAULT 'local'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `post_pageviews_month`
--

CREATE TABLE `post_pageviews_month` (
  `id` int(11) NOT NULL,
  `post_id` int(11) DEFAULT NULL,
  `post_user_id` int(11) DEFAULT NULL,
  `ip_address` varchar(45) DEFAULT NULL,
  `user_agent` varchar(255) DEFAULT NULL,
  `reward_amount` double NOT NULL DEFAULT 0,
  `created_at` timestamp NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `post_poll_votes`
--

CREATE TABLE `post_poll_votes` (
  `id` int(11) NOT NULL,
  `post_id` int(11) DEFAULT NULL,
  `question_id` int(11) DEFAULT NULL,
  `answer_id` int(11) DEFAULT NULL,
  `user_id` int(11) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `post_sorted_list_items`
--

CREATE TABLE `post_sorted_list_items` (
  `id` int(11) NOT NULL,
  `post_id` int(11) DEFAULT NULL,
  `title` varchar(500) DEFAULT NULL,
  `content` text DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `image_large` varchar(255) DEFAULT NULL,
  `image_description` varchar(255) DEFAULT NULL,
  `storage` varchar(20) DEFAULT 'local',
  `item_order` smallint(6) DEFAULT NULL,
  `parent_link_num` int(11) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `quiz_answers`
--

CREATE TABLE `quiz_answers` (
  `id` int(11) NOT NULL,
  `question_id` int(11) DEFAULT NULL,
  `image_path` varchar(255) DEFAULT NULL,
  `image_storage` varchar(20) DEFAULT 'local',
  `answer_text` varchar(500) DEFAULT NULL,
  `is_correct` tinyint(1) DEFAULT NULL,
  `assigned_result_id` int(11) DEFAULT 0,
  `total_votes` int(11) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `quiz_images`
--

CREATE TABLE `quiz_images` (
  `id` int(11) NOT NULL,
  `image_default` varchar(255) DEFAULT NULL,
  `image_small` varchar(255) DEFAULT NULL,
  `file_name` varchar(255) NOT NULL,
  `image_mime` varchar(20) DEFAULT 'jpg',
  `storage` varchar(20) DEFAULT 'local',
  `user_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `quiz_questions`
--

CREATE TABLE `quiz_questions` (
  `id` int(11) NOT NULL,
  `post_id` int(11) DEFAULT NULL,
  `question` varchar(500) DEFAULT NULL,
  `image_path` varchar(255) DEFAULT NULL,
  `image_storage` varchar(20) DEFAULT 'local',
  `description` text DEFAULT NULL,
  `question_order` int(11) DEFAULT 1,
  `answer_format` varchar(30) DEFAULT 'small_image'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `quiz_results`
--

CREATE TABLE `quiz_results` (
  `id` int(11) NOT NULL,
  `post_id` int(11) DEFAULT NULL,
  `result_title` varchar(500) DEFAULT NULL,
  `image_path` varchar(255) DEFAULT NULL,
  `image_storage` varchar(20) DEFAULT 'local',
  `description` text DEFAULT NULL,
  `min_correct_count` mediumint(9) DEFAULT NULL,
  `max_correct_count` mediumint(9) DEFAULT NULL,
  `result_order` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `reactions`
--

CREATE TABLE `reactions` (
  `id` int(11) NOT NULL,
  `post_id` int(11) DEFAULT NULL,
  `re_like` int(11) DEFAULT 0,
  `re_dislike` int(11) DEFAULT 0,
  `re_love` int(11) DEFAULT 0,
  `re_funny` int(11) DEFAULT 0,
  `re_angry` int(11) DEFAULT 0,
  `re_sad` int(11) DEFAULT 0,
  `re_wow` int(11) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `reading_lists`
--

CREATE TABLE `reading_lists` (
  `id` int(11) NOT NULL,
  `post_id` int(11) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `roles_permissions`
--

CREATE TABLE `roles_permissions` (
  `id` int(11) NOT NULL,
  `role` varchar(255) DEFAULT NULL,
  `role_name` varchar(255) DEFAULT NULL,
  `admin_panel` tinyint(1) DEFAULT NULL,
  `add_post` tinyint(1) DEFAULT NULL,
  `manage_all_posts` tinyint(1) DEFAULT NULL,
  `navigation` tinyint(1) DEFAULT NULL,
  `pages` tinyint(1) DEFAULT NULL,
  `rss_feeds` tinyint(1) DEFAULT NULL,
  `categories` tinyint(1) DEFAULT NULL,
  `widgets` tinyint(1) DEFAULT NULL,
  `polls` tinyint(1) DEFAULT NULL,
  `gallery` tinyint(1) DEFAULT NULL,
  `comments_contact` tinyint(1) DEFAULT NULL,
  `newsletter` tinyint(1) DEFAULT NULL,
  `ad_spaces` tinyint(1) DEFAULT NULL,
  `users` tinyint(1) DEFAULT NULL,
  `seo_tools` tinyint(1) DEFAULT NULL,
  `settings` tinyint(1) DEFAULT NULL,
  `reward_system` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `roles_permissions`
--

INSERT INTO `roles_permissions` (`id`, `role`, `role_name`, `admin_panel`, `add_post`, `manage_all_posts`, `navigation`, `pages`, `rss_feeds`, `categories`, `widgets`, `polls`, `gallery`, `comments_contact`, `newsletter`, `ad_spaces`, `users`, `seo_tools`, `settings`, `reward_system`) VALUES
(1, 'admin', 'a:1:{i:0;a:2:{s:7:\"lang_id\";s:1:\"1\";s:4:\"name\";s:5:\"Admin\";}}', 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1),
(2, 'moderator', 'a:1:{i:0;a:2:{s:7:\"lang_id\";s:1:\"1\";s:4:\"name\";s:9:\"Moderator\";}}', 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1),
(3, 'author', 'a:1:{i:0;a:2:{s:7:\"lang_id\";s:1:\"1\";s:4:\"name\";s:6:\"Author\";}}', 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0),
(4, 'user', 'a:1:{i:0;a:2:{s:7:\"lang_id\";s:1:\"1\";s:4:\"name\";s:4:\"User\";}}', 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);

-- --------------------------------------------------------

--
-- Table structure for table `routes`
--

CREATE TABLE `routes` (
  `id` int(11) NOT NULL,
  `admin` varchar(100) DEFAULT 'admin',
  `profile` varchar(100) DEFAULT 'profile',
  `tag` varchar(100) DEFAULT 'tag',
  `reading_list` varchar(100) DEFAULT 'reading-list',
  `settings` varchar(100) DEFAULT 'settings',
  `social_accounts` varchar(100) DEFAULT 'social-accounts',
  `preferences` varchar(100) DEFAULT 'preferences',
  `change_password` varchar(100) DEFAULT 'change-password',
  `forgot_password` varchar(100) DEFAULT 'forgot-password',
  `reset_password` varchar(100) DEFAULT 'reset-password',
  `delete_account` varchar(100) DEFAULT 'delete-account',
  `register` varchar(100) DEFAULT 'register',
  `posts` varchar(100) DEFAULT 'posts',
  `search` varchar(100) DEFAULT 'search',
  `rss_feeds` varchar(100) DEFAULT 'rss-feeds',
  `gallery_album` varchar(100) DEFAULT 'gallery-album',
  `earnings` varchar(100) DEFAULT 'earnings',
  `payouts` varchar(100) DEFAULT 'payouts',
  `set_payout_account` varchar(100) DEFAULT 'set-payout-account',
  `logout` varchar(100) DEFAULT 'logout'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `routes`
--

INSERT INTO `routes` (`id`, `admin`, `profile`, `tag`, `reading_list`, `settings`, `social_accounts`, `preferences`, `change_password`, `forgot_password`, `reset_password`, `delete_account`, `register`, `posts`, `search`, `rss_feeds`, `gallery_album`, `earnings`, `payouts`, `set_payout_account`, `logout`) VALUES
(1, 'admin', 'profile', 'tag', 'reading-list', 'settings', 'social-accounts', 'preferences', 'change-password', 'forgot-password', 'reset-password', 'delete-account', 'register', 'posts', 'search', 'rss-feeds', 'gallery-album', 'earnings', 'payouts', 'set-payout-account', 'logout');

-- --------------------------------------------------------

--
-- Table structure for table `rss_feeds`
--

CREATE TABLE `rss_feeds` (
  `id` int(11) NOT NULL,
  `lang_id` int(11) DEFAULT 1,
  `feed_name` varchar(500) DEFAULT NULL,
  `feed_url` varchar(1000) DEFAULT NULL,
  `post_limit` smallint(6) DEFAULT NULL,
  `category_id` int(11) DEFAULT NULL,
  `image_saving_method` varchar(30) DEFAULT 'url',
  `auto_update` tinyint(1) DEFAULT 1,
  `read_more_button` tinyint(1) DEFAULT 1,
  `read_more_button_text` varchar(255) DEFAULT 'Read More',
  `user_id` int(11) DEFAULT NULL,
  `add_posts_as_draft` tinyint(1) DEFAULT 0,
  `is_cron_updated` tinyint(1) DEFAULT 0,
  `generate_keywords_from_title` tinyint(1) DEFAULT 1,
  `created_at` timestamp NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `settings`
--

CREATE TABLE `settings` (
  `id` int(11) NOT NULL,
  `lang_id` int(11) NOT NULL DEFAULT 1,
  `site_title` varchar(255) DEFAULT NULL,
  `home_title` varchar(255) DEFAULT 'Index',
  `site_description` varchar(500) DEFAULT NULL,
  `keywords` varchar(500) DEFAULT NULL,
  `application_name` varchar(255) DEFAULT NULL,
  `primary_font` smallint(6) DEFAULT 19,
  `secondary_font` smallint(6) DEFAULT 25,
  `tertiary_font` smallint(6) DEFAULT 32,
  `facebook_url` varchar(500) DEFAULT NULL,
  `twitter_url` varchar(500) DEFAULT NULL,
  `instagram_url` varchar(500) DEFAULT NULL,
  `tiktok_url` varchar(500) DEFAULT NULL,
  `whatsapp_url` varchar(500) DEFAULT NULL,
  `youtube_url` varchar(500) DEFAULT NULL,
  `discord_url` varchar(500) DEFAULT NULL,
  `telegram_url` varchar(500) DEFAULT NULL,
  `pinterest_url` varchar(500) DEFAULT NULL,
  `linkedin_url` varchar(500) DEFAULT NULL,
  `twitch_url` varchar(500) DEFAULT NULL,
  `vk_url` varchar(500) DEFAULT NULL,
  `optional_url_button_name` varchar(500) DEFAULT 'Click Here To See More',
  `about_footer` varchar(1000) DEFAULT NULL,
  `contact_text` text DEFAULT NULL,
  `contact_address` varchar(500) DEFAULT NULL,
  `contact_email` varchar(255) DEFAULT NULL,
  `contact_phone` varchar(255) DEFAULT NULL,
  `copyright` varchar(500) DEFAULT NULL,
  `cookies_warning` tinyint(1) DEFAULT 0,
  `cookies_warning_text` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `settings`
--

INSERT INTO `settings` (`id`, `lang_id`, `site_title`, `home_title`, `site_description`, `keywords`, `application_name`, `primary_font`, `secondary_font`, `tertiary_font`, `facebook_url`, `twitter_url`, `instagram_url`, `tiktok_url`, `whatsapp_url`, `youtube_url`, `discord_url`, `telegram_url`, `pinterest_url`, `linkedin_url`, `twitch_url`, `vk_url`, `optional_url_button_name`, `about_footer`, `contact_text`, `contact_address`, `contact_email`, `contact_phone`, `copyright`, `cookies_warning`, `cookies_warning_text`) VALUES
(1, 1, 'Varient - News Magazine', 'Index', 'Varient Index Page', 'index, home, varient', 'Varient', 20, 10, 34, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Click Here To See More', NULL, NULL, NULL, NULL, NULL, 'Copyright 2024 Varient - All Rights Reserved.', 0, '<p>This site uses cookies. By continuing to browse the site you are agreeing to our use of cookies.</p>');

-- --------------------------------------------------------

--
-- Table structure for table `subscribers`
--

CREATE TABLE `subscribers` (
  `id` int(11) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `token` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tags`
--

CREATE TABLE `tags` (
  `id` int(11) NOT NULL,
  `post_id` int(11) DEFAULT NULL,
  `tag` varchar(255) DEFAULT NULL,
  `tag_slug` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `themes`
--

CREATE TABLE `themes` (
  `id` int(11) NOT NULL,
  `theme` varchar(255) DEFAULT NULL,
  `theme_folder` varchar(255) NOT NULL,
  `theme_name` varchar(255) DEFAULT NULL,
  `theme_color` varchar(100) DEFAULT NULL,
  `block_color` varchar(100) DEFAULT NULL,
  `mega_menu_color` varchar(255) DEFAULT NULL,
  `is_active` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `themes`
--

INSERT INTO `themes` (`id`, `theme`, `theme_folder`, `theme_name`, `theme_color`, `block_color`, `mega_menu_color`, `is_active`) VALUES
(1, 'magazine', 'magazine', 'Magazine', '#2d65fe', '#161616', '#f9f9f9', 1),
(2, 'news', 'magazine', 'News', '#0f88f1', '#101010', '#1e1e1e', 0),
(3, 'classic', 'classic', 'Classic', '#19bc9c', '#161616', NULL, 0);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(255) DEFAULT NULL,
  `slug` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT 'name@domain.com',
  `email_status` tinyint(1) DEFAULT 0,
  `token` varchar(500) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `role` varchar(100) DEFAULT 'user',
  `user_type` varchar(50) DEFAULT 'registered',
  `google_id` varchar(255) DEFAULT NULL,
  `facebook_id` varchar(255) DEFAULT NULL,
  `vk_id` varchar(255) DEFAULT NULL,
  `avatar` varchar(255) DEFAULT NULL,
  `cover_image` varchar(255) DEFAULT NULL,
  `status` tinyint(1) DEFAULT 1,
  `about_me` varchar(5000) DEFAULT NULL,
  `facebook_url` varchar(500) DEFAULT NULL,
  `twitter_url` varchar(500) DEFAULT NULL,
  `instagram_url` varchar(500) DEFAULT NULL,
  `tiktok_url` varchar(500) DEFAULT NULL,
  `whatsapp_url` varchar(500) DEFAULT NULL,
  `youtube_url` varchar(500) DEFAULT NULL,
  `discord_url` varchar(500) DEFAULT NULL,
  `telegram_url` varchar(500) DEFAULT NULL,
  `pinterest_url` varchar(500) DEFAULT NULL,
  `linkedin_url` varchar(500) DEFAULT NULL,
  `twitch_url` varchar(500) DEFAULT NULL,
  `vk_url` varchar(500) DEFAULT NULL,
  `personal_website_url` varchar(500) DEFAULT NULL,
  `last_seen` timestamp NULL DEFAULT NULL,
  `show_email_on_profile` tinyint(1) DEFAULT 1,
  `show_rss_feeds` tinyint(1) DEFAULT 1,
  `reward_system_enabled` tinyint(1) DEFAULT 0,
  `balance` double DEFAULT 0,
  `total_pageviews` int(11) DEFAULT 0,
  `created_at` timestamp NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `user_payout_accounts`
--

CREATE TABLE `user_payout_accounts` (
  `id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `payout_paypal_email` varchar(255) DEFAULT NULL,
  `iban_full_name` varchar(255) DEFAULT NULL,
  `iban_country` varchar(100) DEFAULT NULL,
  `iban_bank_name` varchar(255) DEFAULT NULL,
  `iban_number` varchar(500) DEFAULT NULL,
  `swift_full_name` varchar(255) DEFAULT NULL,
  `swift_address` varchar(500) DEFAULT NULL,
  `swift_state` varchar(255) DEFAULT NULL,
  `swift_city` varchar(255) DEFAULT NULL,
  `swift_postcode` varchar(100) DEFAULT NULL,
  `swift_country` varchar(100) DEFAULT NULL,
  `swift_bank_account_holder_name` varchar(255) DEFAULT NULL,
  `swift_iban` varchar(255) DEFAULT NULL,
  `swift_code` varchar(255) DEFAULT NULL,
  `swift_bank_name` varchar(255) DEFAULT NULL,
  `swift_bank_branch_city` varchar(255) DEFAULT NULL,
  `swift_bank_branch_country` varchar(100) DEFAULT NULL,
  `default_payout_account` varchar(30) NOT NULL DEFAULT 'paypal'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `videos`
--

CREATE TABLE `videos` (
  `id` int(11) NOT NULL,
  `video_name` varchar(255) DEFAULT NULL,
  `video_path` varchar(255) DEFAULT NULL,
  `storage` varchar(20) DEFAULT 'local',
  `user_id` int(11) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `widgets`
--

CREATE TABLE `widgets` (
  `id` int(11) NOT NULL,
  `lang_id` int(11) DEFAULT 1,
  `title` varchar(500) DEFAULT NULL,
  `content` text DEFAULT NULL,
  `type` varchar(100) DEFAULT NULL,
  `widget_order` int(11) DEFAULT 1,
  `visibility` int(11) DEFAULT 1,
  `is_custom` int(11) DEFAULT 1,
  `display_category_id` int(11) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `widgets`
--

INSERT INTO `widgets` (`id`, `lang_id`, `title`, `content`, `type`, `widget_order`, `visibility`, `is_custom`, `display_category_id`, `created_at`) VALUES
(1, 1, 'Follow Us', NULL, 'follow-us', 2, 1, 0, NULL, '2020-02-18 12:54:39'),
(2, 1, 'Popular Posts', NULL, 'popular-posts', 1, 1, 0, NULL, '2020-02-18 12:54:39'),
(3, 1, 'Recommended Posts', NULL, 'recommended-posts', 3, 1, 0, NULL, '2020-02-18 12:54:39'),
(4, 1, 'Popular Tags', NULL, 'tags', 4, 1, 0, NULL, '2020-02-18 12:54:39'),
(5, 1, 'Voting Poll', NULL, 'poll', 5, 1, 0, NULL, '2020-02-18 12:54:39');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `ad_spaces`
--
ALTER TABLE `ad_spaces`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `audios`
--
ALTER TABLE `audios`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_user_id` (`user_id`);

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `ci_sessions`
--
ALTER TABLE `ci_sessions`
  ADD KEY `ci_sessions_timestamp` (`timestamp`);

--
-- Indexes for table `comments`
--
ALTER TABLE `comments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_parent_id` (`parent_id`),
  ADD KEY `idx_post_id` (`post_id`),
  ADD KEY `idx_status` (`status`),
  ADD KEY `idx_user_id` (`user_id`);

--
-- Indexes for table `contacts`
--
ALTER TABLE `contacts`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `files`
--
ALTER TABLE `files`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_user_id` (`user_id`);

--
-- Indexes for table `followers`
--
ALTER TABLE `followers`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_following_id` (`following_id`),
  ADD KEY `idx_follower_id` (`follower_id`);

--
-- Indexes for table `fonts`
--
ALTER TABLE `fonts`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `gallery`
--
ALTER TABLE `gallery`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `gallery_albums`
--
ALTER TABLE `gallery_albums`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `gallery_categories`
--
ALTER TABLE `gallery_categories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `general_settings`
--
ALTER TABLE `general_settings`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `images`
--
ALTER TABLE `images`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_user_id` (`user_id`);

--
-- Indexes for table `languages`
--
ALTER TABLE `languages`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `language_translations`
--
ALTER TABLE `language_translations`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_lang_id` (`lang_id`);

--
-- Indexes for table `pages`
--
ALTER TABLE `pages`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `payouts`
--
ALTER TABLE `payouts`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_user_id` (`user_id`);

--
-- Indexes for table `polls`
--
ALTER TABLE `polls`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `poll_votes`
--
ALTER TABLE `poll_votes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_poll_id` (`poll_id`),
  ADD KEY `idx_user_id` (`user_id`);

--
-- Indexes for table `posts`
--
ALTER TABLE `posts`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_category_id` (`category_id`),
  ADD KEY `idx_is_slider` (`is_slider`),
  ADD KEY `idx_is_featured` (`is_featured`),
  ADD KEY `idx_is_recommended` (`is_recommended`),
  ADD KEY `idx_is_breaking` (`is_breaking`),
  ADD KEY `idx_created_at` (`created_at`),
  ADD KEY `idx_lang_id` (`lang_id`),
  ADD KEY `idx_is_scheduled` (`is_scheduled`),
  ADD KEY `idx_visibility` (`visibility`),
  ADD KEY `idx_user_id` (`user_id`),
  ADD KEY `idx_status` (`status`);

--
-- Indexes for table `post_audios`
--
ALTER TABLE `post_audios`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_post_id` (`post_id`),
  ADD KEY `idx_audio_id` (`audio_id`);

--
-- Indexes for table `post_files`
--
ALTER TABLE `post_files`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_post_id` (`post_id`),
  ADD KEY `idx_file_id` (`file_id`);

--
-- Indexes for table `post_gallery_items`
--
ALTER TABLE `post_gallery_items`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_post_id` (`post_id`);

--
-- Indexes for table `post_images`
--
ALTER TABLE `post_images`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_post_id` (`post_id`);

--
-- Indexes for table `post_pageviews_month`
--
ALTER TABLE `post_pageviews_month`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_post_id` (`post_id`),
  ADD KEY `idx_created_at` (`created_at`),
  ADD KEY `idx_post_user_id` (`post_user_id`);

--
-- Indexes for table `post_poll_votes`
--
ALTER TABLE `post_poll_votes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_post_id` (`post_id`),
  ADD KEY `idx_question_id` (`question_id`),
  ADD KEY `idx_user_id` (`user_id`),
  ADD KEY `idx_answer_id` (`answer_id`);

--
-- Indexes for table `post_sorted_list_items`
--
ALTER TABLE `post_sorted_list_items`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_post_id` (`post_id`);

--
-- Indexes for table `quiz_answers`
--
ALTER TABLE `quiz_answers`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_question_id` (`question_id`);

--
-- Indexes for table `quiz_images`
--
ALTER TABLE `quiz_images`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_user_id` (`user_id`);

--
-- Indexes for table `quiz_questions`
--
ALTER TABLE `quiz_questions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_post_id` (`post_id`);

--
-- Indexes for table `quiz_results`
--
ALTER TABLE `quiz_results`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_post_id` (`post_id`);

--
-- Indexes for table `reactions`
--
ALTER TABLE `reactions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_post_id` (`post_id`);

--
-- Indexes for table `reading_lists`
--
ALTER TABLE `reading_lists`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_post_id` (`post_id`),
  ADD KEY `idx_user_id` (`user_id`);

--
-- Indexes for table `roles_permissions`
--
ALTER TABLE `roles_permissions`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `routes`
--
ALTER TABLE `routes`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `rss_feeds`
--
ALTER TABLE `rss_feeds`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `settings`
--
ALTER TABLE `settings`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `subscribers`
--
ALTER TABLE `subscribers`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tags`
--
ALTER TABLE `tags`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_post_id` (`post_id`);

--
-- Indexes for table `themes`
--
ALTER TABLE `themes`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user_payout_accounts`
--
ALTER TABLE `user_payout_accounts`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_user_id` (`user_id`);

--
-- Indexes for table `videos`
--
ALTER TABLE `videos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_user_id` (`user_id`);

--
-- Indexes for table `widgets`
--
ALTER TABLE `widgets`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `ad_spaces`
--
ALTER TABLE `ad_spaces`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `audios`
--
ALTER TABLE `audios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `comments`
--
ALTER TABLE `comments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `contacts`
--
ALTER TABLE `contacts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `files`
--
ALTER TABLE `files`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `followers`
--
ALTER TABLE `followers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `fonts`
--
ALTER TABLE `fonts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=35;

--
-- AUTO_INCREMENT for table `gallery`
--
ALTER TABLE `gallery`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `gallery_albums`
--
ALTER TABLE `gallery_albums`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `gallery_categories`
--
ALTER TABLE `gallery_categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `general_settings`
--
ALTER TABLE `general_settings`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `images`
--
ALTER TABLE `images`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `languages`
--
ALTER TABLE `languages`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `language_translations`
--
ALTER TABLE `language_translations`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=879;

--
-- AUTO_INCREMENT for table `pages`
--
ALTER TABLE `pages`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `payouts`
--
ALTER TABLE `payouts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `polls`
--
ALTER TABLE `polls`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `poll_votes`
--
ALTER TABLE `poll_votes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `posts`
--
ALTER TABLE `posts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `post_audios`
--
ALTER TABLE `post_audios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `post_files`
--
ALTER TABLE `post_files`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `post_gallery_items`
--
ALTER TABLE `post_gallery_items`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `post_images`
--
ALTER TABLE `post_images`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `post_pageviews_month`
--
ALTER TABLE `post_pageviews_month`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `post_poll_votes`
--
ALTER TABLE `post_poll_votes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `post_sorted_list_items`
--
ALTER TABLE `post_sorted_list_items`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `quiz_answers`
--
ALTER TABLE `quiz_answers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `quiz_images`
--
ALTER TABLE `quiz_images`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `quiz_questions`
--
ALTER TABLE `quiz_questions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `quiz_results`
--
ALTER TABLE `quiz_results`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `reactions`
--
ALTER TABLE `reactions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `reading_lists`
--
ALTER TABLE `reading_lists`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `roles_permissions`
--
ALTER TABLE `roles_permissions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `routes`
--
ALTER TABLE `routes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `rss_feeds`
--
ALTER TABLE `rss_feeds`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `settings`
--
ALTER TABLE `settings`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `subscribers`
--
ALTER TABLE `subscribers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tags`
--
ALTER TABLE `tags`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `themes`
--
ALTER TABLE `themes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `user_payout_accounts`
--
ALTER TABLE `user_payout_accounts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `videos`
--
ALTER TABLE `videos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `widgets`
--
ALTER TABLE `widgets`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
