const express = require('express');
const router = express.Router();
const Joi = require('joi');
const { validateRequest } = require('../middlewares/validate-request');
const userService = require('../services/userService');
const crypto = require('crypto')
const multer = require('multer');
const fs = require('fs');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const now = new Date();
        const yearMonth = `${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, '0')}`;

        if (!process.env.USER_UPLOAD_DIR) {
            console.error('USER_UPLOAD_DIR is not set in the environment');
            return cb(new Error('Upload directory is not configured.'));
        }

        let uploadPath = path.join(process.env.USER_UPLOAD_DIR, yearMonth);
        uploadPath = uploadPath.replace(/\\/g, '/');

        try {
            if (!fs.existsSync(uploadPath)) {
                fs.mkdirSync(uploadPath, { recursive: true });
            } else {
                console.log('Directory already exists:', uploadPath);
            }
        } catch (err) {
            console.error(`Error creating directory: ${err.message}`);
            return cb(err);
        }

        cb(null, uploadPath);
    },

    filename: (req, file, cb) => {
        const uniqueSuffix = crypto.randomBytes(8).toString('hex');
        const userId = 1;
        const fileExt = path.extname(file.originalname);
        // const filename = `avatar_${userId}_${uniqueSuffix}${fileExt}`;
        let filename;
        if (file.fieldname === 'avatar') {
            filename = `avatar_${userId}_${uniqueSuffix}${fileExt}`;
        } else if (file.fieldname === 'cover_image') {
            filename = `cover_${userId}_${uniqueSuffix}${fileExt}`;
        } else {
            // Handle other cases or return an error
            return cb(new Error('Invalid file field name.'), false);
        }
        cb(null, filename);
    }
});

const allowedMimeTypes = ["image/png", "image/jpg", "image/jpeg"];

const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (allowedMimeTypes.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error('Only .png, .jpg, and .jpeg formats are allowed!'), false);
        }
    }
});



router.post('/register', registerSchema, registerUser);
router.post('/authenticate', authenticateSchema, authenticate);
router.post('/verify-email', verifyOtpSchema, verifyEmailOtp);
router.post('/resendOtp', resendEmailOtp);
router.post('/change-password', changePassword);
router.post("/forget-password", forgetPassword);
router.post("/reset-password", resetPassword);
router.post('/logout', logout);
router.get('/user', userGet);
router.post('/postSave', postSave);
router.get('/postGet/:id', postGet);
router.get('/:identifier', getBySlug);
router.put('/profile/:identifier', upload.fields([{ name: 'avatar', maxCount: 1 }, { name: 'cover_image', maxCount: 1 }]), update);
router.post('/follow/:user_id/:follow_id', toggleFollowStatus);
router.get('/posts/:identifier', getUserPostsByIdentifierController);
router.get('/rss/:identifier/:lang_id', postRss);
router.post('/delete/:user_id', userDelete)

module.exports = router;

function registerSchema(req, res, next) {
    const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().required(),
        username: Joi.string().required(),
    });
    validateRequest(req, res, next, schema);
};

function authenticateSchema(req, res, next) {
    const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().required(),
    });
    validateRequest(req, res, next, schema);
};

function authenticate(req, res, next) {
    userService.authenticate(req.body)
        .then(data => {
            req.session.user = data;
            console.log('Session after login:', req.session);
            console.log('User session set:', req.sessionID, req.session.user);
            res.json({ message: "Success", data });
        })
        .catch(next);
}

async function registerUser(req, res, next) {
    userService.register(req.body)
        .then(data => res.json({ message: 'Registration successful. Please check your email to verify your account.' }))
        .catch(next);
};

function verifyOtpSchema(req, res, next) {
    const schema = Joi.object({
        email: Joi.string().email().required(),
        otp: Joi.number().required()
    });
    validateRequest(req, res, next, schema);
};

async function verifyEmailOtp(req, res) {
    const { email, otp } = req.body;

    try {
        const user = await userService.verifyAndUpdate(email, otp);
        res.status(200).json({ message: 'Email has been verified and updated successfully!', user });
    } catch (error) {
        if (error.message === 'User not found' || error.message === 'Invalid OTP') {
            res.status(300).json({ error: error.message });
        } else if (error.message === 'The user is already verified.') {
            res.status(400).json({ error: error.message });
        } else {
            console.error('Unexpected error:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
};

async function resendEmailOtp(req, res) {
    const { email } = req.body;
    try {
        const user = await userService.resendOtp(email);
        res.json({ message: 'Email sent successfully!', user });

    } catch (error) {
        res.json({ error: error.message });
    }
};

async function forgetPassword(req, res, next) {
    try {
        const { email } = req.body;
        const user = await userService.forgetPassword({ email });
        res.json({ message: ' OTP has been sent to your registered email.', user });
    } catch (error) {
        res.json({ error: error.message });
    }
};

async function resetPassword(req, res, next) {
    try {
        const { email, newPassword, otp } = req.body;
        const user = await userService.resetPassword({ email, newPassword, otp });
        res.json({ message: 'Password reset successfully.', user });
    } catch (error) {
        res.json({ error: error.message });
    }
};

function changePassword(req, res, next) {
    userService.changePassword(req.body.email, req.body.currentPassword, req.body.newPassword)
        .then(data => {
            res.json({ message: "Password changed successfully.", data })
        })
        .catch(next);
}


function logout(req, res) {
    console.log('Session ID:', req.sessionID);
    console.log('Session Data:', req.session);
    console.log('Get User Details ', req.session, req.session.user, 'req.session && req.session.user');
    const username = req.session.user ? req.session.user.username : 'Unknown User';
    req.session.destroy(err => {
        if (err) {
            return res.status(500).json({ message: 'Error logging out' });
        }
        console.log(`${username} has logged out.`);
        res.json({ message: 'Logged out successfully' });
    });
};

function userGet(req, res) {
    console.log('Session ID:', req.sessionID);
    console.log('Session Data:', req.session);
    console.log('Get User Details ', req.session, req.session.user, 'req.session && req.session.user');

    if (req.session && req.session.user) {
        res.json({ user: req.session.user });
    } else {
        res.json({ message: 'User not logged in' });
    }
}

function postSave(req, res, next) {
    userService.savePost(req.body)
        .then(data => res.json({ message: 'success', data }))
        .catch(next);
}

// function postGet(req, res, next) {
//     const userId = req.params.id;
//     userService.getPost(userId)
//         .then(data => res.json({ message: 'success', data }))
//         .catch(next);
// }

function postGet(req, res, next) {
    const userId = req.params.id;
    const page = req.query.page || 1;
    const pageSize = req.query.pageSize || 10;

    userService.getPost(userId, page, pageSize)
        .then(data => res.json({ message: 'success', data }))
        .catch(next);
}


function getBySlug(req, res, next) {
    const identifier = req.params.identifier;
    userService.getUser(identifier)
        .then(data => res.json({ message: 'Success', data }))
        .catch(next);
}

// function update(req, res, next) {
//     if (req.file) {
//         const uploadDir = path.resolve(process.env.USER_UPLOAD_DIR);
//         const fullPath = req.file.path;
//         let relativePath = path.relative(uploadDir, fullPath);
//         relativePath = path.join('uploads/profile', relativePath).replace(/\\/g, '/');
//         req.body.avatar = relativePath;
//     }
//     userService.update(req.params.identifier, req.body)
//         .then(data => res.json({ message: 'Update Successfully ', data }))
//         .catch(next);
// }

function update(req, res, next) {
    if (req.files) {
        const uploadDir = path.resolve(process.env.USER_UPLOAD_DIR);

        if (req.files.avatar) {
            const avatarPath = req.files.avatar[0].path;
            let relativeAvatarPath = path.relative(uploadDir, avatarPath);
            relativeAvatarPath = path.join('uploads/profile', relativeAvatarPath).replace(/\\/g, '/');
            req.body.avatar = relativeAvatarPath;
        }

        if (req.files.cover_image) {
            const coverImagePath = req.files.cover_image[0].path;
            let relativeCoverImagePath = path.relative(uploadDir, coverImagePath);
            relativeCoverImagePath = path.join('uploads/profile', relativeCoverImagePath).replace(/\\/g, '/');
            req.body.cover_image = relativeCoverImagePath;
        }
    }

    userService.update(req.params.identifier, req.body)
        .then(data => res.json({ message: 'Update Successfully ', data }))
        .catch(next);
}

function toggleFollowStatus(req, res, next) {
    const params = {
        user_id: req.params.user_id,
        follow_id: req.params.follow_id
    };

    userService.handleFollowUnfollow(params)
        .then(data => res.json({ message: 'success', data }))
        .catch(next);
}

function getUserPostsByIdentifierController(req, res, next) {
    const identifier = req.params.identifier;
    userService.getUserPostsByIdentifier(identifier, {
        limit: parseInt(req.query.limit, 10) || 10,
        page: parseInt(req.query.page, 10) || 1,
        sort: req.query.sort || 'DESC',
    })
        .then(data => res.json({ message: 'success', data }))
        .catch(next);
}

function postRss(req, res, next) {
    const identifier = req.params.identifier;
    const langId = req.params.lang_id;
    userService.generateUserPostsRSS(identifier, langId)
        .then(data => {
            res.set('Content-Type', 'application/rss+xml');
            res.send(data);
        }).catch(next);
}

function userDelete(req, res, next) {
    const userId = req.params.user_id;
    const { password } = req.body;

    if (!password) {
        return res.status(400).json({ message: 'Password is required' });
    }
    userService.DeleteUser(userId, password)
        .then(data => res.json({ message: 'success', data }))
        .catch(next);
}