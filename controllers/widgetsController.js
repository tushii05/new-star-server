const express = require('express');
const router = express.Router();
const Joi = require('joi');
const { validateRequest } = require('../middlewares/validate-request');
const widgetsService = require('../services/widgetsService');

router.get('/', getAll);
router.get('/case', getByCase)
module.exports = router;

async function getAll(req, res, next) {
    try {
        const langId = parseInt(req.query.langId) || 1;
        const data = await widgetsService.getAll(langId);
        res.json({ message: 'Success', data });
    } catch (error) {
        next(error);
    }
}

async function getByCase(req, res, next) {
    try {
        const langId = parseInt(req.query.langId) || 1;
        const caseType = req.query.caseType;
        const page = parseInt(req.query.page) || 1;
        const pageSize = parseInt(req.query.pageSize) || 10;

        if (!caseType) {
            return res.status(400).json({ message: 'caseType is required' });
        }

        const data = await widgetsService.getWidgetsByCase(langId, caseType, page, pageSize);
        res.json({ message: 'Success', data });
    } catch (error) {
        next(error);
    }
}
