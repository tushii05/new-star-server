const express = require('express');
const router = express.Router();
const Joi = require('joi');
const { validateRequest } = require('../middlewares/validate-request');
const testService = require('../services/test');

router.get('/', getAllSchema, getAll);

module.exports = router;

function getAllSchema(req, res, next) {
    const schema = Joi.object({
        page: Joi.number().integer().min(1).empty(''),
        pageSize: Joi.number().integer().min(1).empty(''),
        orderBy: Joi.string().valid('id', 'createdAt').empty(''),
        orderType: Joi.string().valid('DESC', 'ASC').empty(''),
        search: Joi.string().empty(''),
    });
    validateRequest(req, res, next, schema, type = 'body')
}

async function getAll(req, res, next) {
    try {
        const data = await testService.getAll(req.query);
        res.json({ message: 'Success', data });
    } catch (error) {
        next(error);
    }
}