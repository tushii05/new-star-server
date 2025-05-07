const express = require('express');
const router = express.Router();
const generalSettingsService = require('../services/generalSettingsService');

router.get('/', getAll);


module.exports = router;


async function getAll(req, res, next) {
    try {
        const lang_id = req.query.lang_id || 1;
        const generalSettings = await generalSettingsService.getAll(lang_id);
        res.json({ message: 'Success', generalSettings });
    } catch (error) {
        next(error);
    }
}