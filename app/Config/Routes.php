<?php

use CodeIgniter\Router\RouteCollection;
use Config\Globals;

/**
 * @var RouteCollection $routes
 */
$languages = Globals::$languages;
$generalSettings = Globals::$generalSettings;
$customRoutes = Globals::$customRoutes;

// $routes->get('/', 'HomeController::index');
$routes->get('/', 'AdminController::index');
$routes->get('karan/', 'HomeController::index');



$routes->get('cron/update-feeds', 'CronController::checkFeedPosts');
$routes->get('cron/update-sitemap', 'CronController::updateSitemap');
$routes->get('unsubscribe', 'AuthController::unsubscribe');
$routes->get('connect-with-facebook', 'AuthController::connectWithFacebook');
$routes->get('facebook-callback', 'AuthController::facebookCallback');
$routes->get('connect-with-google', 'AuthController::connectWithGoogle');
$routes->get('connect-with-vk', 'AuthController::connectWithVK');
$routes->get('gnews/feed', 'HomeController::googleNewsFeeds');

/*
 * --------------------------------------------------------------------
 * Post Routes
 * --------------------------------------------------------------------
 */
$routes->post('register-post', 'AuthController::registerPost');
$routes->post('forgot-password-post', 'AuthController::forgotPasswordPost');
$routes->post('reset-password-post', 'AuthController::resetPasswordPost');
$routes->post('contact-post', 'HomeController::contactPost');
$routes->post('switch-dark-mode', 'CommonController::switchDarkMode');
$routes->post('follow-user-post', 'ProfileController::followUnfollowUserPost');
$routes->post('edit-profile-post', 'ProfileController::editProfilePost');
$routes->post('social-accounts-post', 'ProfileController::socialAccountsPost');
$routes->post('preferences-post', 'ProfileController::preferencesPost');
$routes->post('change-password-post', 'ProfileController::changePasswordPost');
$routes->post('delete-account-post', 'ProfileController::deleteAccountPost');
$routes->post('download-file', 'CommonController::downloadFile');
$routes->post('set-paypal-payout-account-post', 'EarningsController::setPaypalPayoutAccountPost');
$routes->post('set-iban-payout-account-post', 'EarningsController::setIbanPayoutAccountPost');
$routes->post('set-swift-payout-account-post', 'EarningsController::setSwiftPayoutAccountPost');
$routes->post('add-newsletter-post', 'AjaxController::addNewsletterPost');
$routes->post('close-cookies-warning-post', 'AjaxController::closeCookiesWarningPost');

/*f
 * --------------------------------------------------------------------
 * Admin Routes
 * --------------------------------------------------------------------
 */

$routes->get($customRoutes->admin, 'AdminController::index');
$routes->get($customRoutes->admin . '/login', 'CommonController::adminLogin');
$routes->post($customRoutes->admin . '/login-post', 'CommonController::adminLoginPost');
$routes->get($customRoutes->admin . '/themes', 'AdminController::themes');
//pages
$routes->get($customRoutes->admin . '/pages', 'AdminController::pages');
$routes->get($customRoutes->admin . '/add-page', 'AdminController::addPage');
$routes->get($customRoutes->admin . '/edit-page/(:num)', 'AdminController::editPage/$1');
$routes->get($customRoutes->admin . '/navigation', 'AdminController::navigation');
$routes->get($customRoutes->admin . '/edit-menu-link/(:num)', 'AdminController::editMenuLink/$1');
//posts
$routes->get($customRoutes->admin . '/post-format', 'PostController::postFormat');
$routes->get($customRoutes->admin . '/add-post', 'PostController::addPost');
$routes->get($customRoutes->admin . '/posts', 'PostController::posts');
$routes->get($customRoutes->admin . '/slider-posts', 'PostController::sliderPosts');
$routes->get($customRoutes->admin . '/featured-posts', 'PostController::featuredPosts');
$routes->get($customRoutes->admin . '/breaking-news', 'PostController::breakingNews');
$routes->get($customRoutes->admin . '/recommended-posts', 'PostController::recommendedPosts');
$routes->get($customRoutes->admin . '/pending-posts', 'PostController::pendingPosts');
$routes->get($customRoutes->admin . '/scheduled-posts', 'PostController::scheduledPosts');
$routes->get($customRoutes->admin . '/drafts', 'PostController::drafts');
$routes->get($customRoutes->admin . '/bulk-post-upload', 'PostController::bulkPostUpload');

$routes->get($customRoutes->admin . '/edit-post/(:num)', 'PostController::editPost/$1');
$routes->get($customRoutes->admin . '/edit-webstory/(:num)', 'AdminController::editWebStory/$1');

//rss feeds
$routes->get($customRoutes->admin . '/feeds', 'RssController::feeds');
$routes->get($customRoutes->admin . '/import-feed', 'RssController::importFeed');
$routes->get($customRoutes->admin . '/edit-feed/(:num)', 'RssController::editFeed/$1');
//categories
$routes->get($customRoutes->admin . '/add-category', 'CategoryController::addCategory');
$routes->get($customRoutes->admin . '/categories', 'CategoryController::categories');
$routes->get($customRoutes->admin . '/edit-category/(:num)', 'CategoryController::editCategory/$1');
//widgets
$routes->get($customRoutes->admin . '/widgets', 'AdminController::widgets');
$routes->get($customRoutes->admin . '/add-widget', 'AdminController::addWidget');
$routes->get($customRoutes->admin . '/edit-widget/(:num)', 'AdminController::editWidget/$1');
//polls
$routes->get($customRoutes->admin . '/polls', 'AdminController::polls');
$routes->get($customRoutes->admin . '/add-poll', 'AdminController::addPoll');
$routes->get($customRoutes->admin . '/edit-poll/(:num)', 'AdminController::editPoll/$1');
//gallery
$routes->get($customRoutes->admin . '/gallery-images', 'GalleryController::images');
$routes->get($customRoutes->admin . '/gallery-add-image', 'GalleryController::addImage');
$routes->get($customRoutes->admin . '/edit-gallery-image/(:num)', 'GalleryController::editImage/$1');
$routes->get($customRoutes->admin . '/gallery-albums', 'GalleryController::albums');
$routes->get($customRoutes->admin . '/edit-gallery-album/(:num)', 'GalleryController::editAlbum/$1');
$routes->get($customRoutes->admin . '/gallery-categories', 'GalleryController::categories');
$routes->get($customRoutes->admin . '/edit-gallery-category/(:num)', 'GalleryController::editCategory/$1');
//contact
$routes->get($customRoutes->admin . '/contact-messages', 'AdminController::contactMessages');
//comments
$routes->get($customRoutes->admin . '/comments', 'AdminController::comments');
$routes->get($customRoutes->admin . '/pending-comments', 'AdminController::pendingComments');
//newsletter
$routes->get($customRoutes->admin . '/newsletter', 'AdminController::newsletter');
$routes->post($customRoutes->admin . '/newsletter-send-email', 'AdminController::newsletterSendEmail');
//reward-system
$routes->get($customRoutes->admin . '/reward-system', 'RewardController::rewardSystem');
$routes->get($customRoutes->admin . '/reward-system/earnings', 'RewardController::earnings');
$routes->get($customRoutes->admin . '/reward-system/payouts', 'RewardController::payouts');
$routes->get($customRoutes->admin . '/reward-system/add-payout', 'RewardController::addPayout');
$routes->get($customRoutes->admin . '/reward-system/pageviews', 'RewardController::pageviews');
//ad spaces
$routes->get($customRoutes->admin . '/ad-spaces', 'AdminController::adSpaces');
//users
$routes->get($customRoutes->admin . '/users', 'AdminController::users');
$routes->get($customRoutes->admin . '/edit-user/(:num)', 'AdminController::editUser/$1');
$routes->get($customRoutes->admin . '/administrators', 'AdminController::administrators');
$routes->get($customRoutes->admin . '/add-user', 'AdminController::addUser');
//roles permissions
$routes->get($customRoutes->admin . '/roles-permissions', 'AdminController::rolesPermissions');
$routes->get($customRoutes->admin . '/edit-role/(:num)', 'AdminController::editRole/$1');
//seo tools
$routes->get($customRoutes->admin . '/seo-tools', 'AdminController::seoTools');
//storage
$routes->get($customRoutes->admin . '/storage', 'AdminController::storage');
//cache system
$routes->get($customRoutes->admin . '/cache-system', 'AdminController::cacheSystem');
//google news
$routes->get($customRoutes->admin . '/google-news', 'AdminController::googleNews');


$routes->get($customRoutes->admin . '/add-epapers', 'AdminController::addEpapers');

$routes->post($customRoutes->admin . '/addEpapers', 'AdminController::addEpapers');

$routes->get($customRoutes->admin . '/upload-epapers', 'AdminController::uploadEpaper');



$routes->get($customRoutes->admin . '/webstories', 'AdminController::webStory');
$routes->post($customRoutes->admin . '/webStory', 'AdminController::addWebStory');

$routes->get($customRoutes->admin . '/add-sub-web/(:num)', 'AdminController::addSubWeb/$1');
$routes->post($customRoutes->admin . '/webSubStory', 'AdminController::addWebSubStory');
//$routes->post($customRoutes->admin . '/webStory', 'AdminController::addWebStory');


// $routes->post('webstory/add', 'WebStoryController::addWebStory');




//settings
$routes->get($customRoutes->admin . '/preferences', 'AdminController::preferences');
$routes->get($customRoutes->admin . '/route-settings', 'AdminController::routeSettings');
$routes->get($customRoutes->admin . '/email-settings', 'AdminController::emailSettings');
$routes->get($customRoutes->admin . '/font-settings', 'AdminController::fontSettings');
$routes->get($customRoutes->admin . '/edit-font/(:num)', 'AdminController::editFont/$1');
$routes->get($customRoutes->admin . '/social-login-settings', 'AdminController::socialLoginSettings');
$routes->get($customRoutes->admin . '/general-settings', 'AdminController::generalSettings');
//language
$routes->get($customRoutes->admin . '/language-settings', 'LanguageController::languages');
$routes->get($customRoutes->admin . '/edit-language/(:num)', 'LanguageController::editLanguage/$1');
$routes->get($customRoutes->admin . '/edit-translations/(:num)', 'LanguageController::editTranslations/$1');


/*
 * --------------------------------------------------------------------
 * Static GET Routes
 * --------------------------------------------------------------------
 */

$getRoutesArray = [
];

/*
 * --------------------------------------------------------------------
 * Static POST Routes
 * --------------------------------------------------------------------
 */

$postRoutesArray = [
    //Admin
    'Admin/deleteNavigationPost',
    'Admin/deletePagePost',
    'Admin/adSpacesPost',
    'Admin/googleAdsenseCodePost',
    'Admin/cacheSystemPost',
    'Admin/approveCommentPost',
    'Admin/deleteCommentPost',
    'Admin/deleteContactMessagePost',
    'Admin/googleNewsPost',
    'Admin/seoToolsPost',
    'Admin/generateSitemapPost',
    'Admin/deleteSitemapPost',
    'Admin/socialLoginSettingsPost',
    'Admin/storagePost',
    'Admin/awsS3Post',
    'Admin/setThemePost',
    'Admin/setThemeSettingsPost',
    'Admin/editFontPost',
    'Admin/setSiteFontPost',
    'Admin/addFontPost',
    'Admin/deleteFontPost',
    'Admin/setActiveLanguagePost',
    'Admin/downloadDatabaseBackup',
    'Admin/editMenuLinkPost',
    'Admin/addMenuLinkPost',
    'Admin/menuLimitPost',
    'Admin/sortMenuItems',
    'Admin/hideShowHomeLink',
    'Admin/deleteSubscriberPost',
    'Admin/newsletterSettingsPost',
    'Admin/newsletterSendEmailPost',
    'Admin/addPagePost',
    'Admin/editPagePost',
    'Admin/deletePagePost',
    'Admin/addPollPost',
    'Admin/editPollPost',
    'Admin/deletePollPost',
    'Admin/emailSettingsPost',
    'Admin/emailVerificationSettingsPost',
    'Admin/contactEmailSettingsPost',
    'Admin/sendTestEmailPost',
    'Admin/generalSettingsPost',
    'Admin/recaptchaSettingsPost',
    'Admin/maintenanceModePost',
    'Admin/preferencesPost',
    'Admin/fileUploadSettingsPost',
    'Admin/routeSettingsPost',
    'Admin/addUserPost',
    'Admin/userOptionsPost',
    'Admin/deleteUserPost',
    'Admin/editRolePost',
    'Admin/editUserPost',
    'Admin/changeUserRolePost',
    'Admin/addWidgetPost',
    'Admin/editWidgetPost',
    'Admin/deleteWidgetPost',
    'Admin/getMenuLinksByLang',
    'Admin/approveSelectedComments',
    'Admin/deleteSelectedComments',
    'Admin/deleteSelectedContactMessages',
    //Ajax
    'Ajax/setThemeModePost',
    'Ajax/addPollVote',
    'Ajax/loadMorePosts',
    'Ajax/addRemoveReadingListItem',
    'Ajax/addReaction',
    'Ajax/addCommentPost',
    'Ajax/addCommentPost',
    'Ajax/addCommentPost',
    'Ajax/addCommentPost',
    'Ajax/loadSubcommentBox',
    'Ajax/likeCommentPost',
    'Ajax/loadMoreComments',
    'Ajax/deleteCommentPost',
    'Ajax/addRemoveReadingListItem',
    'Ajax/getQuizAnswers',
    'Ajax/getQuizResults',
    'Ajax/addPostPollVote',
    //Auth
    'Auth/loginPost',
    //Category
    'Category/deleteCategoryPost',
    'Category/addCategoryPost',
    'Category/deleteCategoryPost',
    'Category/editCategoryPost',
    'Category/getParentCategoriesByLang',
    'Category/getSubCategories',
     'Category/getCityCategories',
    //File
    'File/uploadFile',
    'File/uploadAudio',
    'File/uploadImage',
    'File/uploadQuizImageFile',
    'File/uploadVideo',
    'File/getImages',
    'File/deleteImage',
    'File/loadMoreImages',
    'File/searchImage',
    'File/getQuizImages',
    'File/deleteQuizImage',
    'File/loadMoreQuizImages',
    'File/searchQuizImage',
    'File/deleteFile',
    'File/getFiles',
    'File/loadMoreFiles',
    'File/searchFiles',
    'File/deleteVideo',
    'File/getVideos',
    'File/loadMoreVideos',
    'File/searchVideos',
    'File/deleteAudio',
    'File/getAudios',
    'File/loadMoreAudios',
    'File/searchAudios',
    //Gallery
    'Gallery/addImagePost',
    'Gallery/addAlbumPost',
    'Gallery/deleteAlbumPost',
    'Gallery/addCategoryPost',
    'Gallery/deleteCategoryPost',
    'Gallery/editAlbumPost',
    'Gallery/editCategoryPost',
    'Gallery/editImagePost',
    'Gallery/deleteImagePost',
    'Gallery/setAsAlbumCover',
    'Gallery/getAlbumsByLang',
    'Gallery/getCategoriesByAlbum',
    //Language
    'Language/addLanguagePost',
    'Language/editLanguagePost',
    'Language/setDefaultLanguagePost',
    'Language/exportLanguagePost',
    'Language/deleteLanguagePost',
    'Language/importLanguagePost',
    'Language/editTranslationsPost',
    //Post
    'Post/addPostPost',
    'Post/downloadCSVFilePost',
    'Post/generateCSVObjectPost',
    'Post/importCSVItemPost',
    'Post/postOptionsPost',
    'Post/deletePost',
    'Post/editPostPost',
    'Post/deletePostMainImage',
    'Post/deletePostAdditionalImage',
    'Post/setHomeSliderPostOrderPost',
    'Post/setFeaturedPostOrderPost',
    'Post/deleteSelectedPosts',
    'Post/postBulkOptionsPost',
    'Post/getVideoFromURL',
    'Post/deletePostVideo',
    'Post/deletePostAudio',
    'Post/deletePostFile',
    'Post/getListItemHTML',
    'Post/addListItem',
    'Post/deletePostListItemPost',
    'Post/getQuizQuestionHTML',
    'Post/addQuizQuestion',
    'Post/getQuizAnswerHTML',
    'Post/addQuizQuestionAnswer',
    'Post/deleteQuizQuestion',
    'Post/deleteQuizQuestionAnswer',
    'Post/getQuizResultHTML',
    'Post/addQuizResult',
    'Post/deleteQuizResult',
    //Reward
    'Reward/addPayoutPost',
    'Reward/deletePayoutPost',
    'Reward/updateSettingsPost',
    'Reward/updatePayoutPost',
    'Reward/updateCurrencyPost',
    //Rss
    'Rss/editFeedPost',
    'Rss/checkFeedPosts',
    'Rss/deleteFeedPost',
    'Rss/importFeedPost',


];

foreach ($postRoutesArray as $item) {
    $array = explode('/', $item);
    $routes->post($item, $array[0] . 'Controller::' . $array[1]);
}

/*
 * --------------------------------------------------------------------
 * Dynamic Routes
 * --------------------------------------------------------------------
 */

if (!empty($languages)) {
    foreach ($languages as $language) {
        $key = '';
        if ($generalSettings->site_lang != $language->id) {
            $key = $language->short_form . '/';
            $routes->get($language->short_form, 'HomeController::index');
        }
        $routes->get($key . $customRoutes->register, 'AuthController::register');
        $routes->get($key . $customRoutes->forgot_password, 'AuthController::forgotPassword');
        $routes->get($key . $customRoutes->logout, 'CommonController::logout');
        $routes->get($key . $customRoutes->posts, 'HomeController::posts');
        $routes->get($key . $customRoutes->tag . '/(:any)', 'HomeController::tag/$1');
        $routes->get($key . $customRoutes->gallery_album . '/(:num)', 'HomeController::galleryAlbum/$1');
        $routes->get($key . $customRoutes->search, 'HomeController::search');
        $routes->get($key . $customRoutes->profile . '/(:any)', 'ProfileController::profile/$1');
        $routes->get($key . $customRoutes->settings, 'ProfileController::editProfile');
        $routes->get($key . $customRoutes->settings . '/' . $customRoutes->social_accounts, 'ProfileController::socialAccounts');
        $routes->get($key . $customRoutes->settings . '/' . $customRoutes->preferences, 'ProfileController::preferences');
        $routes->get($key . $customRoutes->settings . '/' . $customRoutes->change_password, 'ProfileController::changePassword');
        $routes->get($key . $customRoutes->settings . '/' . $customRoutes->delete_account, 'ProfileController::deleteAccount');
        $routes->get($key . $customRoutes->reading_list, 'HomeController::readingList');
        $routes->get($key . $customRoutes->earnings, 'EarningsController::earnings');
        $routes->get($key . $customRoutes->payouts, 'EarningsController::payouts');
        $routes->get($key . $customRoutes->set_payout_account, 'EarningsController::setPayoutAccount');
        $routes->get($key . $customRoutes->rss_feeds, 'HomeController::rssFeeds');
        $routes->get($key . 'rss/latest-posts', 'HomeController::rssLatestPosts');
        $routes->get($key . 'rss/category/(:any)', 'HomeController::rssByCategory/$1');
        $routes->get($key . 'rss/author/(:any)', 'HomeController::rssByUser/$1');
        $routes->get($key . 'preview/(:any)', 'HomeController::preview/$1');
        $routes->get($key . 'reset-password', 'AuthController::resetPassword');
        $routes->get($key . 'confirm-email', 'AuthController::confirmEmail');
        if ($generalSettings->site_lang != $language->id) {
            $routes->get($key . '(:any)/(:any)', 'HomeController::subCategory/$1/$2');
            $routes->get($key . '(:any)', 'HomeController::any/$1');
        }
    }
    //$routes->get('fetch_pdf', 'ProxyController::fetch_pdf');

}
$routes->get('loadPostsByMonthYear/(:any)', 'HomeController::loadPostsByMonthYear/$1');


$routes->get('(:any)/(:any)', 'HomeController::subCategory/$1/$2');
$routes->get('(:any)', 'HomeController::any/$1');

//$route['fetch-pdf'] = 'ProxyController/fetch_pdf';


// Assuming `(:any)` is used to capture the slug including month and year.

