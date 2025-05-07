const express = require('express');
const router = express.Router();
const { clearAllCacheData } = require('../services/cacheService');

router.post('/clear-cache', async (req, res, next) => {
    try {
        await clearAllCacheData();
        res.json({ message: 'Cache cleared successfully' });
    } catch (error) {
        next(error);
    }
});

module.exports = router;
