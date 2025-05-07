const express = require('express');
const router = express.Router();
const Joi = require('joi');
const { validateRequest } = require('../middlewares/validate-request');
const epaperService = require('../services/epeparService');

router.get('/', getAllSchema, getAll);
router.get('/:identifier', getByIdentifier);

module.exports = router;

function getAllSchema(req, res, next) {
    const schema = Joi.object({
        page: Joi.number().integer().min(1).empty(''),
        pageSize: Joi.number().integer().min(1).empty(''),
        orderBy: Joi.string().valid('id', 'createdAt').empty(''),
        orderType: Joi.string().valid('DESC', 'ASC').empty(''),
        search: Joi.string().empty(''),
        epaper_date: Joi.string().pattern(/^\d{2}-\d{2}-\d{4}$/).empty('')
    });
    validateRequest(req, res, next, schema, type = 'body')
}

async function getAll(req, res, next) {
    try {
        const data = await epaperService.getAll(req, req.query);
        res.json({ message: 'Success', data });
    } catch (error) {
        next(error);
    }
}

async function getByIdentifier(req, res, next) {
    try {
        const identifier = req.params.identifier;
        const data = await epaperService.getByIdentifier(identifier, req);
        res.json({ message: 'Success', data });
    } catch (error) {
        next(error);
    }
}