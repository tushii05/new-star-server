const express = require('express');
const router = express.Router();
const pageService = require('../services/pageService');

router.get('/menu', getMenu);

module.exports = router;

async function getMenu(req, res, next) {
    try {
        const langId = req.query.lang_id || 1;
        const data = await pageService.getMenusData(langId);
        res.json({ message: 'Success', data });
    } catch (error) {
        next(error);
    }
}