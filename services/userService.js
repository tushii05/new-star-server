const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('../config/config');
const RSS = require('rss');
const { Op, Sequelize } = require("sequelize");
const { validatePassword } = require('../middlewares/validatePassword');
const { generateOTP } = require('../middlewares/random_number');
const { sendVerificationEmail } = require('../template/verificationOtp');
const { sendForgetEmail } = require('../template/forgetPasswordOtp')

module.exports = {
    authenticate,
    register,
    verifyAndUpdate,
    resendOtp,
    forgetPassword,
    resetPassword,
    changePassword,
    savePost,
    getPost,
    getUser,
    update,
    handleFollowUnfollow,
    getUserPostsByIdentifier,
    generateUserPostsRSS,
    DeleteUser

};

async function authenticate({ email, password }) {
    try {
        const user = await db.users.findOne({ where: { email: email } });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            throw new Error('Username or password is incorrect');
        }
        if (user.isEmailVerified !== 1) {
            throw new Error('Please verify your email before logging in');
        }
        const expirationTime = new Date();
        expirationTime.setDate(expirationTime.getDate() + 1);
        const token = jwt.sign({ sub: user.id, role: user.role, exp: expirationTime.getTime() / 1000 }, process.env.SECRETSTRING);
        return { ...user.get(), token, expiresAt: expirationTime.toISOString() };
    } catch (error) {
        throw error;
    }
}

// async function register(params) {
//     try {
//         const existingUser = await db.users.findOne({ where: { email: params.email } });
//         if (existingUser) {
//             throw new Error('Email is already registered');
//         }
//         const existingUserByUsername = await db.users.findOne({ where: { username: params.username } });
//         if (existingUserByUsername) {
//             throw new Error('Username is already taken');
//         }

//         await validatePassword(params.password);
//         const otp = generateOTP();
//         await sendVerificationEmail(params.email, otp, params.username);

//         const slugUsername = params.username.toLowerCase().replace(/\s+/g, '-');

//         const hash = await bcrypt.hash(params.password, 10);

//         const user = {
//             ...params,
//             slug: slugUsername,
//             password: hash,
//             verificationOtp: +otp,
//         };
//         console.log(user, 'user');
//         const d = await db.users.create(user);
//         return d;

//     } catch (err) {
//         throw err;
//     }
// }

async function register(params) {
    try {
        const existingUser = await db.users.findOne({ where: { email: params.email } });
        if (existingUser) {
            if (existingUser.isEmailVerified) {
                throw new Error('The email address is already registered. Please use a different email.');
            }
            else {
                throw new Error('The email address is already registered but remains unverified. Please complete the verification process to proceed.');
            }
        }
        const existingUserByUsername = await db.users.findOne({ where: { username: params.username } });
        if (existingUserByUsername) {
            throw new Error('Username is already taken');
        }

        await validatePassword(params.password);
        const otp = generateOTP();
        await sendVerificationEmail(params.email, otp, params.username);

        const slugUsername = params.username.toLowerCase().replace(/\s+/g, '-');

        const user = new db.users({
            ...params,
            slug: slugUsername
        });

        const hash = await bcrypt.hash(params.password, 10);
        user.password = hash;
        user.verificationOtp = +otp;
        const users = await user.save();
        return users;

    } catch (err) {
        throw err;
    }
}

async function verifyAndUpdate(email, otp) {
    try {
        const user = await db.users.findOne({ where: { email: email } });

        if (user === null) {
            throw new Error('User not found');
        }
        if (user.isEmailVerified == true) {
            throw new Error('The user is already verified.');
        }

        if (user.verificationOtp !== otp) {
            throw new Error('Invalid OTP');
        }

        user.isEmailVerified = true;
        user.verificationOtp = 0;
        await user.save();

        return user;
    } catch (error) {
        console.error('Error in verifyAndUpdate:', error);
        throw error;
    }
}

async function resendOtp(email) {
    try {
        const user = await db.users.findOne({ where: { email: email } });

        if (!user) {
            throw new Error('User not found');
        }

        if (user.isEmailVerified == true) {
            throw new Error('The user is already verified.');
        }

        const otp = generateOTP();
        user.verificationOtp = otp;
        await sendVerificationEmail(user.email, otp, user.username);
        await user.save();

        return user;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

async function forgetPassword({ email }) {
    const user = await db.users.findOne({ where: { email: email } });
    if (!user) {
        throw new Error("Email not registered with us.");
    }
    const OTP = generateOTP();
    const OTPExpirationTime = new Date();
    OTPExpirationTime.setSeconds(OTPExpirationTime.getSeconds() + 60);
    await user.update({ verificationOtp: OTP, otpExpirationTime: OTPExpirationTime });
    await sendForgetEmail(user.email, OTP, user.username);
    return user;
}

async function resetPassword({ email, newPassword, otp }) {
    const user = await db.users.findOne({ where: { email: email } });
    if (!user) {
        throw new Error("user not found.")
    }
    if (otp !== user.verificationOtp) {
        throw new Error("Invalid OTP.")
    }
    if (user.otpExpirationTime < new Date()) {
        throw new Error("OTP has expired.");
    }
    await validatePassword(newPassword);

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    user.otp = 0;
    await user.save();
    return user;
}

async function changePassword(email, oldPassword, newPassword) {
    const users = await db.users.findOne({ where: { email: email } });
    if (!users) {
        throw new Error("User not found.")
    }
    const verifyPassword = await bcrypt.compare(oldPassword, users.password)

    if (!verifyPassword) {
        throw new Error("Incorrect old password.")
    }

    await validatePassword(newPassword);

    const params = { password: await bcrypt.hash(newPassword, 10) };
    Object.assign(users, params);
    await users.save();
    return users;
}

async function savePost(params) {
    try {
        const { post_id, user_id } = params;
        const existingRecord = await db.reading_lists.findOne({
            where: {
                post_id: post_id,
                user_id: user_id
            }
        });

        if (existingRecord) {
            await db.reading_lists.destroy({
                where: {
                    post_id: post_id,
                    user_id: user_id
                }
            });
            return { message: 'Post unsaved', status: 'unsaved' };
        } else {
            await db.reading_lists.create({
                post_id: post_id,
                user_id: user_id
            });
            return { message: 'Post saved', status: 'saved' };
        }

    } catch (error) {
        console.error('Error saving post:', error);
        throw error;
    }
}

// async function getPost(userId) {
//     try {

//         const postAttributes = [
//             'id', 'title', 'title_slug', 'summary', 'image_url', 'pageviews',
//             'post_type', 'category_id', 'created_at', 'image_mid', 'image_big',
//             [Sequelize.literal(`(SELECT COUNT(*) FROM comments WHERE comments.post_id = post.id)`), 'comment_count']
//         ];
//         const savePostData = await db.reading_lists.findAll({
//             where: {
//                 user_id: userId,
//             },
//             attributes: [],
//             include: [
//                 {
//                     model: db.posts,
//                     attributes: postAttributes,
//                     include: {
//                         model: db.categories,
//                         attributes: ['id', 'name', 'name_slug']
//                     },
//                 }
//             ]
//         });
//         if (savePostData) {
//             return savePostData;
//         } else {
//             return { message: 'No matching data found' };
//         }

//     } catch (error) {
//         throw error;
//     }
// }

async function getPost(userId, page = 1, pageSize = 10) {
    try {
        // Ensure page and pageSize are at least 1
        page = Math.max(1, parseInt(page, 10));
        pageSize = Math.max(1, parseInt(pageSize, 10));

        const offset = (page - 1) * pageSize;

        const postAttributes = [
            'id', 'lang_id', 'title', 'title_slug', 'summary', 'image_url', 'pageviews',
            'post_type', 'category_id', 'created_at', 'image_mid',  "isOld", 'image_big',
            [Sequelize.literal(`(SELECT COUNT(*) FROM comments WHERE comments.post_id = post.id)`), 'comment_count']
        ];

        const savePostData = await db.reading_lists.findAndCountAll({
            where: { user_id: userId },
            offset,
            limit: pageSize,
            attributes: [],
            include: [
                {
                    model: db.posts,
                    attributes: postAttributes,
                    include: {
                        model: db.categories,
                        attributes: ['id', 'name', 'name_slug']
                    },
                }
            ]
        });

        const totalPages = Math.ceil(savePostData.count / pageSize);
        const posts = savePostData.rows.map(row => row.post);

        return {
            total: savePostData.count,
            totalPages,
            currentPage: page,
            pageSize,
            posts
        };

    } catch (error) {
        throw error;
    }
}


async function getUser(identifier) {
    try {
        if (!/^\d+$/.test(identifier)) {
            whereCondition = { slug: identifier };
        } else {
            whereCondition = { id: parseInt(identifier, 10) };
        }
        const user = await db.users.findOne({
            where: whereCondition
        });
        if (!user) throw new Error('user not found');

        const followData = await db.followers.findAll({
            where: {
                [Sequelize.Op.or]: [
                    { following_id: user.id },
                    { follower_id: user.id }
                ]
            },
            include: [
                {
                    model: db.users,
                    as: 'follower',
                    attributes: ['id', 'username', 'slug', 'avatar']
                },
                {
                    model: db.users,
                    as: 'following',
                    attributes: ['id', 'username', 'slug', 'avatar']
                }
            ]
        });

        const followers = followData
            .filter(item => item.following_id === user.id)
            .map(item => ({
                follower: item.follower
            }));

        const following = followData
            .filter(item => item.follower_id === user.id)
            .map(item => ({
                following: item.following
            }));

        return {
            user,
            followers: followers,
            following: following
        };
    } catch (error) {
        console.log(error);
        throw error;
    }
}

async function update(identifier, params) {
    try {
        let whereCondition;
        if (!/^\d+$/.test(identifier)) {
            whereCondition = { slug: identifier };
        } else {
            whereCondition = { id: parseInt(identifier, 10) };
        }

        const user = await db.users.findOne({ where: whereCondition });
        if (!user) throw new Error('User not found');
        Object.assign(user, params);
        return await user.save();
    } catch (error) {
        throw new Error(error)
    }
}

async function handleFollowUnfollow(params) {
    try {
        const { user_id, follow_id } = params;
        const existingRecord = await db.followers.findOne({
            where: {
                following_id: user_id,
                follower_id: follow_id
            }
        });

        if (existingRecord) {
            await db.followers.destroy({
                where: {
                    following_id: user_id,
                    follower_id: follow_id
                }
            });
            return { message: 'Unfollow', status: 'un_follow' };
        } else {
            await db.followers.create({
                following_id: user_id,
                follower_id: follow_id
            });
            return { message: 'Follow', status: 'follow' };

        }

    } catch (error) {
        console.error('Error saving post:', error);
        throw error;
    }
}

async function getUserPostsByIdentifier(identifier, { limit = 10, page = 1, sort = 'DESC' } = {}) {
    try {
        let whereCondition;
        if (!/^\d+$/.test(identifier)) {
            whereCondition = { slug: identifier };
        } else {
            whereCondition = { id: parseInt(identifier, 10) };
        }

        const user = await db.users.findOne({
            where: whereCondition
        });
        if (!user) throw new Error('user not found');

        const offset = (page - 1) * limit;

        const postAttributes = [
            'id', 'title', 'title_slug', 'summary', 'image_url', 'pageviews',
            'post_type', 'category_id', 'created_at', 'image_mid',  "isOld", 'image_big',
            [Sequelize.literal(`(SELECT COUNT(*) FROM comments WHERE comments.post_id = posts.id)`), 'comment_count']];

        const { rows: posts, count: totalPosts } = await db.posts.findAndCountAll({
            where: { user_id: user.id },
            attributes: postAttributes,
            include: {
                model: db.categories,
                attributes: ['id', 'name', 'name_slug']
            },
            limit,
            offset,
            order: [['created_at', sort.toUpperCase()]],
        });

        const totalPages = Math.ceil(totalPosts / limit);

        return {
            totalPosts,
            totalPages,
            currentPage: page,
            pageSize: limit,
            posts
        };
    } catch (error) {
        console.log(error);
        throw error;
    }
}

async function getUserPosts(identifier, langId) {
    try {
        let whereCondition;
        if (!/^\d+$/.test(identifier)) {
            whereCondition = { slug: identifier };
        } else {
            whereCondition = { id: parseInt(identifier, 10) };
        }

        const user = await db.users.findOne({
            where: whereCondition,
            attributes: ['id', 'username']
        });
        if (!user) throw new Error('User not found');

        const postAttributes = [
            'id', 'lang_id', 'title', 'title_slug', 'summary', 'image_url', 'pageviews',
            'post_type', 'category_id', 'created_at', 'keywords',  "isOld", 'image_mid', 'image_big',
            [Sequelize.literal(`(SELECT COUNT(*) FROM comments WHERE comments.post_id = posts.id)`), 'comment_count']
        ];

        const posts = await db.posts.findAll({
            where: { user_id: user.id, lang_id: langId },
            attributes: postAttributes,
            order: [['created_at', 'DESC']],
        });

        return { user, posts };
    } catch (error) {
        console.log(error);
        throw error;
    }
}

async function getLanguageSettings(langId) {
    const settings = await db.settings.findOne({
        where: { lang_id: langId }
    });
    if (!settings) throw new Error('Language settings not found');

    const language = await db.languages.findOne({
        where: { id: settings.lang_id }
    })
    return {
        title: settings.site_title,
        description: settings.site_description,
        langName: language.short_form,
        copyright: settings.copyright
    };
}

async function generateUserPostsRSS(identifier, langId) {
    try {
        const { user, posts } = await getUserPosts(identifier, langId);
        const languageSettings = await getLanguageSettings(langId);

        // const feed = new RSS({
        //     title: `${languageSettings.title} - ${user.username}`,
        //     description: languageSettings.description,
        //     feed_url: `http://yourwebsite.com/rss/user/${identifier}`,
        //     custom_elements: [
        //         { 'dc:language': languageSettings.langName },
        //         { 'dc:rights': languageSettings.copyright }
        //     ]
        // });

        const feed = new RSS({
            title: `${languageSettings.title} - ${user.username}`,
            description: `${languageSettings.title} - ${user.username}`,
            feed_url: `${process.env.BASE_URL} / ${languageSettings.langName}/rss/author/${identifier}`,
            custom_elements: [
                { link: `${process.env.BASE_URL}/${languageSettings.langName}/rss/author/${identifier}` },
                { 'dc:language': languageSettings.langName },
                { 'dc:rights': languageSettings.copyright }
            ]
        });

        posts.forEach(post => {
            feed.item({
                title: post.title,
                url: `${process.env.BASE_URL}/${languageSettings.langName}/${post.title_slug}`,
                guid: post.id,
                description: post.summary,
                enclosure: { url: `${process.env.IMAGE_URL}/${post.image_default}`, type: 'image/jpeg' },
                date: post.created_at,
                custom_elements: [
                    { 'dc:creator': user.username },
                    { 'dc:keywords': post.keywords }
                ]
            });
        });

        return feed.xml({ indent: true });
    } catch (error) {
        console.error('Error generating RSS feed:', error);
        throw error;
    }
}

async function DeleteUser(userId, password) {
    try {
        const transaction = await db.sequelize.transaction();

        try {

            const user = await db.users.findOne({ where: { id: userId } });

            if (!user) {
                throw new Error('User not found');
            }

            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (!isPasswordValid) {
                throw new Error('Invalid password');
            }


            await db.audios.destroy({ where: { user_id: userId }, transaction });
            await db.comments.destroy({ where: { user_id: userId }, transaction });
            await db.files.destroy({ where: { user_id: userId }, transaction });
            await db.poll_votes.destroy({ where: { user_id: userId }, transaction });
            await db.post_pageviews_month.destroy({ where: { post_user_id: userId }, transaction });
            await db.reading_lists.destroy({ where: { user_id: userId }, transaction });
            await db.posts.destroy({ where: { user_id: userId }, transaction });

            await db.users.destroy({ where: { id: userId }, transaction });

            await transaction.commit();

            return { message: 'User and related data deleted successfully.' };
        } catch (error) {
            await transaction.rollback();
            throw error;
        }
    } catch (error) {
        throw new Error('Error deleting user: ' + error.message);
    }
}