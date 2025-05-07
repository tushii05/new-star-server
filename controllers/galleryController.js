const express = require('express');
const router = express.Router();
const Joi = require('joi');
const { validateRequest } = require('../middlewares/validate-request');
const galleryService = require('../services/galleryServices');

router.get('/:langId?', getAllSchema, getAll);
router.get('/category/data', getByCategory, getByCategorySchema)

module.exports = router;

function getAllSchema(req, res, next) {
    const schema = Joi.object({
        orderBy: Joi.string().valid('id', 'createdAt').empty(''),
        orderType: Joi.string().valid('DESC', 'ASC').empty(''),
        search: Joi.string().empty(''),
    });
    validateRequest(req, res, next, schema, type = 'body')
}

async function getAll(req, res, next) {
    try {
        const langId = parseInt(req.params.langId, 10) || 1;
        const data = await galleryService.getAll(langId);
        res.json({ message: 'Success', data });
    } catch (error) {
        next(error);
    }
}


function getByCategorySchema(req, res, next) {
    const schema = Joi.object({
        id: Joi.number().integer().min(1).empty(''),
        page: Joi.number().integer().min(1).empty(''),
        pageSize: Joi.number().integer().min(1).empty(''),
        orderBy: Joi.string().valid('id', 'createdAt').empty(''),
        orderType: Joi.string().valid('DESC', 'ASC').empty(''),
        categoryId: Joi.number().integer().min(1).empty(''),
    });
    validateRequest(req, res, next, schema, type = 'body')
}

async function getByCategory(req, res, next) {
    try {
        const data = await galleryService.getCategoryData(req.query);
        res.json({ message: 'Success', data });
    } catch (error) {
        next(error);
    }
}