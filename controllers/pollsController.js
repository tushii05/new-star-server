const express = require('express');
const router = express.Router();
const Joi = require('joi');
const { validateRequest } = require('../middlewares/validate-request');
const pollsService = require('../services/pollsService');

router.get('/', getAllSchema, getAll);
router.post('/vote', verifyVoteSchema, VotePoll)

module.exports = router;

function getAllSchema(req, res, next) {
    const schema = Joi.object({
        page: Joi.number().integer().min(1).empty(''),
        pageSize: Joi.number().integer().min(1).empty(''),
        orderBy: Joi.string().valid('id', 'created_at').empty(''),
        orderType: Joi.string().valid('DESC', 'ASC').empty(''),
        search: Joi.string().empty(''),
    });
    validateRequest(req, res, next, schema, type = 'body')
}

async function getAll(req, res, next) {
    try {
        const data = await pollsService.getAll(req.query);
        res.json({ message: 'Success', data });
    } catch (error) {
        next(error);
    }
}

function verifyVoteSchema(req, res, next) {
    const schema = Joi.object({
        user_id: Joi.number().integer().required(),
        poll_id: Joi.number().integer().required(),
        vote: Joi.string().valid('option1', 'option2', 'option3', 'option4', 'option5', 'option6', 'option7', 'option8', 'option9', 'option10').required()
    });
    validateRequest(req, res, next, schema);
}

function VotePoll(req, res, next) {
    const params = {
        user_id: req.body.user_id,
        poll_id: req.body.poll_id,
        vote: req.body.vote
    };

    pollsService.handleVote(params, req)
        .then(data => res.json({ message: 'success', data }))
        .catch(next);
}