const express = require('express');
const router = express.Router();
const Joi = require('joi');
const { validateRequest } = require('../middlewares/validate-request');
const categoriesService = require('../services/categoryService');

router.get('/', getAllSchema, getAll);
router.get('/category-post', getCategoryPost);
router.get('/slug/:langId?', getDataBySlug);
router.get('/rss/:identifier/:lang_id', postRss);
router.get('/data/:identifier/:type?', getTypes);

module.exports = router;

function getAllSchema(req, res, next) {
    const schema = Joi.object({
        orderBy: Joi.string().valid('id', 'createdAt').empty(''),
        orderType: Joi.string().valid('DESC', 'ASC').empty(''),
        search: Joi.string().empty(''),
        langId: Joi.number().integer().min(1)
    });
    validateRequest(req, res, next, schema, type = 'body')
}

async function getAll(req, res, next) {
    try {
        const data = await categoriesService.getAll(req.query, req.redisClient);
        res.json({ message: 'Success', data });
    } catch (error) {
        next(error);
    }
}

async function getCategoryPost(req, res, next) {
    try {
        const data = await categoriesService.getBySlugPost(req.query);
        res.json({ message: 'Success', data });
    } catch (error) {
        next(error);
    }
}

async function getDataBySlug(req, res, next) {
    try {
        const langId = req.query.langId;
        const data = await categoriesService.getDataSlug(req.query, langId);
        res.json({ message: 'Success', data });
    } catch (error) {
        next(error);
    }
}

function postRss(req, res, next) {
    const identifier = req.params.identifier;
    const langId = req.params.lang_id;
    categoriesService.generateCategoriesRSS(identifier, langId)
        .then(data => {
            res.set('Content-Type', 'application/rss+xml');
            res.send(data);
        })
        .catch(next);
}

async function getTypes(req, res, next) {
    try {
        const { identifier, type = 'category' } = req.params;
        const data = await categoriesService.getCategoryHierarchy(identifier, type);

        if (data) {
            res.json({ message: 'Success', data });
        } else {
            res.status(404).json({ message: 'Category not found', data: null });
        }
    } catch (error) {
        next(error);
    }
}