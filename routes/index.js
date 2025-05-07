var router = require('express').Router();

router.use('/categories', require('../controllers/categoryController'));
router.use('/test', require('../controllers/test'));
router.use('/widgets', require('../controllers/widgetsController'));
router.use('/cache', require('../controllers/cacheController'));
router.use('/gallery', require('../controllers/galleryController'));
router.use('/polls', require('../controllers/pollsController'));
router.use('/posts', require('../controllers/postController'));
router.use('/language', require('../controllers/languageController'));
router.use('/subscribers', require('../controllers/subscriberController'));
router.use('/contact', require('../controllers/contactController'));
router.use('/page', require('../controllers/pageController'));
router.use('/user', require('../controllers/userController'));
router.use('/generalSettings', require('../controllers/generalSettingsController'));
router.use('/epepar', require('../controllers//epaperController'));
router.use('/ad_spaces', require('../controllers/ad_spacesController'));
router.use('/web_stories', require('../controllers/web_storiesController'));

module.exports = router;