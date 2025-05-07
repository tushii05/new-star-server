const express = require('express');
const router = express.Router();
const Joi = require('joi');
const { validateRequest } = require('../middlewares/validate-request');
const subscriberService = require('../services/subscriberService');

router.get('/', getAllSchema, getAll);
router.post('/', createSchema, createSubscriber);
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
        const data = await subscriberService.getAll(req.query);
        res.json({ message: 'Success', data });
    } catch (error) {
        next(error);
    }
}


function createSchema(req, res, next) {
    const schema = Joi.object({
        email: Joi.string().email().required(),
        token: Joi.string().empty(''),
    });
    validateRequest(req, res, next, schema, type = 'body');
}

async function createSubscriber(req, res, next) {
    try {
        const subscriber = await subscriberService.create(req.body);
        res.json({ message: 'Your email address has been successfully added!', data: subscriber });
    } catch (error) {
        next(error);
    }
}