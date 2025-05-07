const express = require('express');
const router = express.Router();
const Joi = require('joi');
const { validateRequest } = require('../middlewares/validate-request');
const postsService = require('../services/postsService');

router.get('/', getAllSchema, getAll);
router.get('/data/:identifier/:userId?', getByIdPost);
router.get('/home/:langId?', getHomeData);
// router.get('/article/:page?', getData);
router.get('/article/:pageOrSlug?', getData);
router.post('/comment', createSchema, createComment);
router.post('/views', storeViews)
router.delete('/comment/delete/:comment_id/:user_id', deleteComment)
router.post('/pollVote', postPollSchema, createPollAnswer)

router.get('/post', getPostData);

module.exports = router;

function getAllSchema(req, res, next) {
    const schema = Joi.object({
        page: Joi.number().integer().min(1).empty(''),
        pageSize: Joi.number().integer().min(1).empty(''),
        orderBy: Joi.string().valid('id', 'createdAt').empty(''),
        orderType: Joi.string().valid('DESC', 'ASC').empty(''),
        tag: Joi.string().empty(''),
        title: Joi.string().empty(''),
        langId: Joi.string().empty(''),
    });
    validateRequest(req, res, next, schema, type = 'body')
};

async function getAll(req, res, next) {
    try {
        const data = await postsService.getAll(req.query, req.redisClient);
        res.json({ message: 'Success', data });
    } catch (error) {
        next(error);
    }
};

async function getByIdPost(req, res, next) {
    try {
        const identifier = req.params.identifier;
        const userId = req.params.userId;
        const data = await postsService.getByIdentifier(identifier, userId, req);
        res.json({ message: 'Success', data });
    } catch (error) {
        next(error);
    }
};

async function getHomeData(req, res, next) {
    try {
        const langId = parseInt(req.params.langId, 10) || 1;
        const data = await postsService.getHomePageData(req.redisClient, langId);
        res.json({ message: 'Success', data });
    } catch (error) {
        next(error);
    }
}

// async function getData(req, res, next) {
//     try {
//         const pageId = req.params.page ? parseInt(req.params.page, 10) : null;
//         const categoryId = req.query.categoryId ? parseInt(req.query.categoryId, 10) : null;

//         let data;

//         if (pageId) {
//             data = await postsService.getPageData(pageId);
//         }
//         else if (categoryId) {
//             const page = parseInt(req.query.page, 10) || 1;
//             const pageSize = parseInt(req.query.pageSize, 10) || 10;
//             const orderBy = req.query.orderBy || 'id';
//             const orderType = req.query.orderType || 'DESC';

//             data = await postsService.getPostsByCategory({ page, pageSize, orderBy, orderType, categoryId });
//         }
//         else {
//             return res.status(400).json({ message: 'Either pageId or categoryId is required' });
//         }

//         res.json({ message: 'Success', data });
//     } catch (error) {
//         next(error);
//     }
// }

async function getData(req, res, next) {
    try {
        const pageOrSlug = req.params.pageOrSlug;
        const categoryId = req.query.categoryId ? parseInt(req.query.categoryId, 10) : null;
        const categorySlug = req.query.categorySlug ? req.query.categorySlug : null;

        let data;

        if (pageOrSlug) {
            if (isNaN(pageOrSlug)) {
                data = await postsService.getPageData(pageOrSlug);
            } else {
                data = await postsService.getPageData(parseInt(pageOrSlug, 10)); // Fetch page by id
            }
        } else if (categoryId || categorySlug) {
            const page = parseInt(req.query.page, 10) || 1;
            const pageSize = parseInt(req.query.pageSize, 10) || 10;
            const orderBy = req.query.orderBy || 'id';
            const orderType = req.query.orderType || 'DESC';

            data = await postsService.getPostsByCategory({ page, pageSize, orderBy, orderType, categoryId, categorySlug });
        } else {
            return res.status(400).json({ message: 'Either pageId, pageSlug, categoryId, or categorySlug is required' });
        }

        res.json({ message: 'Success', data });
    } catch (error) {
        next(error);
    }
}

function createSchema(req, res, next) {
    const schema = Joi.object({
        parent_id: Joi.number().empty(''),
        post_id: Joi.number().empty(''),
        email: Joi.string().empty(''),
        name: Joi.string().empty(''),
        comment: Joi.string().empty(''),
    });
    validateRequest(req, res, next, schema, type = 'body');
}

async function createComment(req, res, next) {
    try {
        const comments = await postsService.commentCreate(req.body, req);
        res.json({ message: 'Comment Successfully!', data: comments });
    } catch (error) {
        next(error);
    }
}

async function storeViews(req, res, next) {
    try {
        const data = await postsService.views(req, req.body);
        res.json({ message: 'Success', data });
    } catch (error) {
        next(error);
    }
}

async function deleteComment(req, res, next) {
    try {
        const params = {
            comment_id: req.params.comment_id,
            user_id: req.params.user_id
        };
        const comments = await postsService.commentDelete(params);
        res.json({ message: 'Comment Delete Successfully!', data: comments });
    } catch (error) {
        next(error);
    }
}

function postPollSchema(req, res, next) {
    const schema = Joi.object({
        post_id: Joi.number().required(),
        question_id: Joi.number().required(),
        answer_id: Joi.number().required(),
        user_id: Joi.number().optional().allow(null, ''),
    });
    validateRequest(req, res, next, schema, 'body');
}

async function createPollAnswer(req, res, next) {
    try {
        const pollAnswer = await postsService.answerPoll(req.body, req);
        res.json({ message: ' Successfully!', data: pollAnswer });
    } catch (error) {
        next(error);
    }
}

async function getPostData(req, res, next) {
    try {
        const { identifier, langId, categoryId, userId, page, pageSize } = req.query;
        const data = await postsService.getData(identifier, langId, categoryId, userId, page, pageSize);
        res.json({ message: 'Success', data });
    } catch (error) {
        next(error);
    }
}
