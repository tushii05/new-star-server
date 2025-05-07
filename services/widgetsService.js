const db = require('../config/config');
const { fn, col, Sequelize } = require("sequelize");
const redisClient = require('../utils/redisClient');

module.exports = {
    getAll,
    getWidgetsByCase
};

async function getAll(langId) {
    // const cacheKey = `widgets_all_${langId}`;
    // try {
    //     const cachedData = await redisClient.get(cacheKey);
    //     if (cachedData) {
    //         console.log('Serving widgets from cache');
    //         return JSON.parse(cachedData);
    //     }
    // } catch (error) {
    //     console.error('Error retrieving widgets from cache:', error);
    // }

    const widgets = await db.widgets.findAll({
        where: { lang_id: langId },
        order: [['widget_order', 'ASC']]
    });
    const result = {};

    for (const widget of widgets) {
        const { id, title, type } = widget;

        if (!result[type]) {
            result[type] = { id, title, type, more: false, obj: [] };;
        }

        switch (type) {
            case 'popular-posts':
                const popularPosts = await db.posts.findAll({
                    where: { lang_id: langId, status: 1, is_scheduled: 0 },
                    limit: 6,
                    order: [['pageviews', 'DESC']],
                    attributes: ['id', 'title', 'pageviews', 'post_type', 'category_id', 'image_url', 'isOld', 'title_slug', 'summary', 'user_id', 'image_small', 'created_at',
                        [Sequelize.literal(`(SELECT COUNT(*) FROM comments WHERE comments.post_id = posts.id)`), 'comment_count']
                    ],
                    include: [{
                        model: db.users,
                        attributes: ['id', 'username', 'slug']
                    },
                    {
                        model: db.categories,
                        attributes: ['id', 'name', 'name_slug']
                    }
                    ]
                });
                result[type].obj = popularPosts;
                const totalPopularPosts = await db.posts.count({
                    where: { lang_id: langId, status: 1, is_scheduled: 0 }
                });
                result[type].more = totalPopularPosts > 6;
                break;

            case 'custom':
                const customWidgets = await db.widgets.findAll({
                    where: { lang_id: langId, type: 'custom' },
                    order: [['created_at', 'DESC']]
                });

                const limitedCustomWidgets = customWidgets.slice(0, 2);
                const moreCustomExists = customWidgets.length > 2;

                result[type].obj = limitedCustomWidgets;
                result[type].more = moreCustomExists;
                break;
            case 'follow-us':
                const settings = await db.settings.findOne({
                    attributes: [
                        'facebook_url', 'twitter_url', 'instagram_url',
                        'whatsapp_url', 'youtube_url',
                        'telegram_url', 'pinterest_url',
                        'linkedin_url'
                    ]
                });
                result[type].obj = settings;
                break;

            case 'poll':
                const polls = await db.polls.findAll({
                    where: { lang_id: langId },
                    limit: 2,
                    order: [['created_at', 'DESC']]
                });

                const pollsWithVotes = await Promise.all(polls.map(async (poll) => {
                    const totalVotesResult = await db.poll_votes.count({
                        where: { poll_id: poll.id }
                    });
                    const totalVotes = totalVotesResult;

                    const votesResult = await db.poll_votes.findAll({
                        attributes: [
                            'vote',
                            [db.sequelize.fn('COUNT', db.sequelize.col('vote')), 'count']
                        ],
                        where: { poll_id: poll.id },
                        group: ['vote']
                    });

                    const optionsMap = {
                        option1: poll.option1,
                        option2: poll.option2,
                        option3: poll.option3,
                        option4: poll.option4,
                        option5: poll.option5,
                        option6: poll.option6,
                        option7: poll.option7,
                        option8: poll.option8,
                        option9: poll.option9,
                        option10: poll.option10,
                    };

                    if (totalVotes === 0) {
                        const votes = Object.values(optionsMap).map(option => ({
                            option,
                            percentage: "0.00"
                        }));

                        return {
                            ...poll.toJSON(),
                            votes,
                            totalVotes
                        };
                    }

                    const votes = votesResult.map(vote => {
                        const optionKey = vote.vote;
                        const optionValue = optionsMap[optionKey];
                        const count = parseInt(vote.dataValues.count, 10);
                        const percentage = totalVotes > 0 ? (count / totalVotes) * 100 : 0;
                        return {
                            option: optionValue,
                            percentage: percentage.toFixed(2)
                        };
                    });

                    const sortedVotes = votes.sort((a, b) => b.percentage - a.percentage);

                    return {
                        ...poll.toJSON(),
                        votes: sortedVotes,
                        totalVotes
                    };
                }));
                const morePollsExist = await db.polls.count({
                    where: { lang_id: langId },
                    order: [['created_at', 'DESC']]
                }) > 2;
                result[type].obj = pollsWithVotes;
                result[type].more = morePollsExist;
                break;

            case 'recommended-posts':
                const recommendedPosts = await db.posts.findAll({
                    where: { is_recommended: true, lang_id: langId, status: 1, is_scheduled: 0 },
                    limit: 6,
                    attributes: ['id', 'title', 'pageviews', 'category_id', 'post_type', 'image_url', 'isOld', 'title_slug', 'user_id', 'summary', 'image_small', 'created_at',
                        [Sequelize.literal(`(SELECT COUNT(*) FROM comments WHERE comments.post_id = posts.id)`), 'comment_count']
                    ],
                    include: [{
                        model: db.users,
                        attributes: ['id', 'username', 'slug']
                    },
                    {
                        model: db.categories,
                        attributes: ['id', 'name', 'name_slug']
                    }
                    ]
                });
                result[type].obj = recommendedPosts;
                const totalRecommendedPosts = await db.posts.count({
                    where: { is_recommended: true, lang_id: langId, status: 1, is_scheduled: 0 }
                });
                result[type].more = totalRecommendedPosts > 6;
                break;

            case 'tags':
                const tags = await db.tags.findAll({
                    attributes: ['tag', [fn('COUNT', col('tag')), 'count']],
                    include: [{
                        model: db.posts,
                        attributes: [],
                        where: {
                            lang_id: langId, status: 1, is_scheduled: 0
                        }
                    }],
                    group: ['tag'],
                    order: [[fn('COUNT', col('tag')), 'DESC']],
                    limit: 10
                });
                result[type].obj = tags;
                const totalTags = await db.tags.count({
                    include: [{
                        model: db.posts,
                        attributes: [],
                        where: {
                            lang_id: langId, status: 1, is_scheduled: 0
                        }
                    }]
                });
                result[type].more = totalTags > 10;
                break;

            default:
                break;
        }
    }
    // try {
    //     await redisClient.set(cacheKey, JSON.stringify(result), { EX: 3600 });
    //     console.log('Data cached successfully');
    // } catch (error) {
    //     console.error('Error setting widgets cache:', error);
    // }
    return result;
}

// async function getWidgetsByCase(langId, type, page = 1, pageSize = 10) {
//     const offset = (page - 1) * pageSize;
//     const result = {};

//     switch (type) {
//         case 'popular-posts': {
//             const popularPosts = await db.posts.findAll({
//                 where: { lang_id: langId, status: 1, is_scheduled: 0 },
//                 limit: pageSize,
//                 offset,
//                 order: [['pageviews', 'DESC']],
//                 attributes: ['id', 'title', 'pageviews', 'post_type', 'category_id', 'image_url', 'title_slug', 'summary', 'user_id', 'image_small', 'created_at',
//                     [Sequelize.literal(`(SELECT COUNT(*) FROM comments WHERE comments.post_id = posts.id)`), 'comment_count']
//                 ],
//                 include: [{
//                     model: db.users,
//                     attributes: ['id', 'username', 'slug']
//                 }, {
//                     model: db.categories,
//                     attributes: ['id', 'name', 'name_slug']
//                 }]
//             });
//             result[type] = { data: popularPosts };
//             break;
//         }

//         case 'custom': {
//             const widgets = await db.widgets.findAll({
//                 where: { lang_id: langId, type },
//                 limit: pageSize,
//                 offset,
//                 order: [['widget_order', 'ASC']]
//             });
//             result[type] = { data: widgets };
//             break;
//         }

//         case 'follow-us': {
//             const settings = await db.settings.findOne({
//                 attributes: [
//                     'facebook_url', 'twitter_url', 'instagram_url',
//                     'whatsapp_url', 'youtube_url',
//                     'telegram_url', 'pinterest_url',
//                     'linkedin_url'
//                 ]
//             });
//             result[type] = { data: settings };
//             break;
//         }

//         case 'poll': {
//             const polls = await db.polls.findAll({
//                 where: { lang_id: langId },
//                 limit: pageSize,
//                 offset,
//                 order: [['created_at', 'DESC']]
//             });

//             const pollsWithVotes = await Promise.all(polls.map(async (poll) => {
//                 const totalVotes = await db.poll_votes.count({ where: { poll_id: poll.id } });
//                 const votesResult = await db.poll_votes.findAll({
//                     attributes: ['vote', [db.sequelize.fn('COUNT', db.sequelize.col('vote')), 'count']],
//                     where: { poll_id: poll.id },
//                     group: ['vote']
//                 });

//                 const optionsMap = {
//                     option1: poll.option1,
//                     option2: poll.option2,
//                     option3: poll.option3,
//                     option4: poll.option4,
//                     option5: poll.option5,
//                     option6: poll.option6,
//                     option7: poll.option7,
//                     option8: poll.option8,
//                     option9: poll.option9,
//                     option10: poll.option10,
//                 };

//                 const votes = votesResult.map(vote => {
//                     const optionKey = vote.vote;
//                     const optionValue = optionsMap[optionKey];
//                     const count = parseInt(vote.dataValues.count, 10);
//                     const percentage = totalVotes > 0 ? (count / totalVotes) * 100 : 0;
//                     return { option: optionValue, percentage: percentage.toFixed(2) };
//                 });

//                 const sortedVotes = votes.sort((a, b) => b.percentage - a.percentage);

//                 return { ...poll.toJSON(), votes: sortedVotes, totalVotes };
//             }));

//             result[type] = { data: pollsWithVotes };
//             break;
//         }

//         case 'recommended-posts': {
//             const recommendedPosts = await db.posts.findAll({
//                 where: { is_recommended: true, lang_id: langId, status: 1, is_scheduled: 0 },
//                 limit: pageSize,
//                 offset,
//                 attributes: ['id', 'title', 'pageviews', 'category_id', 'post_type', 'image_url', 'title_slug', 'user_id', 'summary', 'image_small', 'created_at',
//                     [Sequelize.literal(`(SELECT COUNT(*) FROM comments WHERE comments.post_id = posts.id)`), 'comment_count']
//                 ],
//                 include: [{
//                     model: db.users,
//                     attributes: ['id', 'username', 'slug']
//                 }, {
//                     model: db.categories,
//                     attributes: ['id', 'name', 'name_slug']
//                 }]
//             });
//             result[type] = { data: recommendedPosts };
//             break;
//         }

//         case 'tags': {
//             const tags = await db.tags.findAll({
//                 attributes: ['tag', [fn('COUNT', col('tag')), 'count']],
//                 include: [{
//                     model: db.posts,
//                     attributes: [],
//                     where: { lang_id: langId, status: 1, is_scheduled: 0 }
//                 }],
//                 group: ['tag'],
//                 order: [[fn('COUNT', col('tag')), 'DESC']],
//                 limit: pageSize,
//                 offset
//             });
//             result[type] = { data: tags };
//             break;
//         }

//         default:
//             throw new Error(`Unknown widget type: ${type}`);
//     }

//     return result;
// }

async function getWidgetsByCase(langId, type, page = 1, pageSize = 10) {
    const offset = (page - 1) * pageSize;
    const result = {};
    let totalCount = 0;

    switch (type) {
        case 'popular-posts': {
            const popularPosts = await db.posts.findAll({
                where: { lang_id: langId, status: 1, is_scheduled: 0 },
                limit: pageSize,
                offset,
                order: [['pageviews', 'DESC']],
                attributes: ['id', 'title', 'pageviews', 'post_type', 'category_id', 'image_url', 'isOld', 'title_slug', 'summary', 'user_id', 'image_small', 'image_mid', 'created_at',
                    [Sequelize.literal(`(SELECT COUNT(*) FROM comments WHERE comments.post_id = posts.id)`), 'comment_count']
                ],
                include: [{
                    model: db.users,
                    attributes: ['id', 'username', 'slug']
                }, {
                    model: db.categories,
                    attributes: ['id', 'name', 'name_slug']
                }]
            });

            totalCount = await db.posts.count({
                where: { lang_id: langId, status: 1, is_scheduled: 0 }
            });

            result[type] = {
                data: popularPosts,
                page,
                pageSize,
                totalPages: Math.ceil(totalCount / pageSize),
            };
            break;
        }

        case 'custom': {
            const widgets = await db.widgets.findAll({
                where: { lang_id: langId, type },
                limit: pageSize,
                offset,
                order: [['widget_order', 'ASC']]
            });

            totalCount = await db.widgets.count({
                where: { lang_id: langId, type }
            });

            result[type] = {
                data: widgets,
                page,
                pageSize,
                totalPages: Math.ceil(totalCount / pageSize),
            };
            break;
        }

        case 'follow-us': {
            const settings = await db.settings.findOne({
                attributes: [
                    'facebook_url', 'twitter_url', 'instagram_url',
                    'whatsapp_url', 'youtube_url',
                    'telegram_url', 'pinterest_url',
                    'linkedin_url'
                ]
            });

            result[type] = { data: settings };
            break;
        }

        case 'poll': {
            const polls = await db.polls.findAll({
                where: { lang_id: langId },
                limit: pageSize,
                offset,
                order: [['created_at', 'DESC']]
            });

            totalCount = await db.polls.count({
                where: { lang_id: langId }
            });

            const pollsWithVotes = await Promise.all(polls.map(async (poll) => {
                const totalVotes = await db.poll_votes.count({ where: { poll_id: poll.id } });
                const votesResult = await db.poll_votes.findAll({
                    attributes: ['vote', [db.sequelize.fn('COUNT', db.sequelize.col('vote')), 'count']],
                    where: { poll_id: poll.id },
                    group: ['vote']
                });

                const optionsMap = {
                    option1: poll.option1,
                    option2: poll.option2,
                    option3: poll.option3,
                    option4: poll.option4,
                    option5: poll.option5,
                    option6: poll.option6,
                    option7: poll.option7,
                    option8: poll.option8,
                    option9: poll.option9,
                    option10: poll.option10,
                };

                const votes = votesResult.map(vote => {
                    const optionKey = vote.vote;
                    const optionValue = optionsMap[optionKey];
                    const count = parseInt(vote.dataValues.count, 10);
                    const percentage = totalVotes > 0 ? (count / totalVotes) * 100 : 0;
                    return { option: optionValue, percentage: percentage.toFixed(2) };
                });

                const sortedVotes = votes.sort((a, b) => b.percentage - a.percentage);

                return { ...poll.toJSON(), votes: sortedVotes, totalVotes };
            }));

            result[type] = {
                data: pollsWithVotes,
                page,
                pageSize,
                totalPages: Math.ceil(totalCount / pageSize),
            };
            break;
        }

        case 'recommended-posts': {
            const recommendedPosts = await db.posts.findAll({
                where: { is_recommended: true, lang_id: langId, status: 1, is_scheduled: 0 },
                limit: pageSize,
                offset,
                attributes: ['id', 'title', 'pageviews', 'category_id', 'post_type', 'image_url', 'isOld', 'title_slug', 'user_id', 'summary', 'image_small', 'image_mid', 'created_at',
                    [Sequelize.literal(`(SELECT COUNT(*) FROM comments WHERE comments.post_id = posts.id)`), 'comment_count']
                ],
                include: [{
                    model: db.users,
                    attributes: ['id', 'username', 'slug']
                }, {
                    model: db.categories,
                    attributes: ['id', 'name', 'name_slug']
                }]
            });

            totalCount = await db.posts.count({
                where: { is_recommended: true, lang_id: langId, status: 1, is_scheduled: 0 }
            });

            result[type] = {
                data: recommendedPosts,
                page,
                pageSize,
                totalPages: Math.ceil(totalCount / pageSize),
            };
            break;
        }

        case 'tags': {
            const tags = await db.tags.findAll({
                attributes: ['tag', [fn('COUNT', col('tag')), 'count']],
                include: [{
                    model: db.posts,
                    attributes: [],
                    where: { lang_id: langId, status: 1, is_scheduled: 0 }
                }],
                group: ['tag'],
                order: [[fn('COUNT', col('tag')), 'DESC']],
                limit: pageSize,
                offset
            });

            const totalTag = await db.tags.count({
                include: [{
                    model: db.posts,
                    where: { lang_id: langId, status: 1, is_scheduled: 0 }
                }],
                group: ['tag'],

            });

            const totalPages = Math.ceil(totalTag.length / pageSize);

            result[type] = {
                data: tags,
                page,
                pageSize,
                totalPages
            };
            break;
        }

        default:
            throw new Error(`Unknown widget type: ${type}`);
    }

    return result;
}