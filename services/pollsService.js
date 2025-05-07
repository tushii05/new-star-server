const db = require('../config/config');
const { Op, fn, col, literal } = require('sequelize');

module.exports = {
    getAll,
    handleVote
};


async function getAll({ page = 1, pageSize = 10, orderBy = 'id', orderType = 'DESC', search = null }) {
    page = Math.max(1, parseInt(page, 10));
    pageSize = Math.max(1, parseInt(pageSize, 10));

    const offset = (page - 1) * pageSize;
    let where = {};

    if (search !== null) {
        where = {
            [Op.or]: [
                { question: { [Op.like]: `%${search}%` } },
            ]
        };
    }

    const pollsResult = await db.polls.findAndCountAll({
        where,
        offset,
        limit: pageSize,
        order: [[orderBy, orderType]]
    });

    const totalPages = Math.ceil(pollsResult.count / pageSize);

    if (page > totalPages) {
        return { message: "No more data" };
    }

    const polls = pollsResult.rows;
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
        const numberOfVotes = votes.length;

        return {
            ...poll.toJSON(),
            votes,
            numberOfVotes
        };
    }));

    return {
        total: pollsResult.count,
        totalPages,
        currentPage: page,
        pageSize,
        polls: pollsWithVotes
    };
}

async function handleVote(params, req) {
    try {
        const { user_id, poll_id, vote } = params;
        const ipAddress = getIp(req);

        const existingVote = await db.poll_votes.findOne({
            where: {
                poll_id,
                ip_address: ipAddress
            }
        });

        if (existingVote) {
            return {
                message: 'You already voted this poll before.',
                status: 'already_voted',
                statusCode: 403

            };
        }

        await db.poll_votes.create({
            user_id,
            poll_id,
            vote,
            ip_address: ipAddress
        });

        const pollWithVotes = await db.polls.findOne({ where: { id: poll_id } });

        const totalVotesResult = await db.poll_votes.count({
            where: { poll_id }
        });
        const totalVotes = totalVotesResult;

        const votesResult = await db.poll_votes.findAll({
            attributes: [
                'vote',
                [db.sequelize.fn('COUNT', db.sequelize.col('vote')), 'count']
            ],
            where: { poll_id },
            group: ['vote']
        });

        const optionsMap = {
            option1: pollWithVotes.option1,
            option2: pollWithVotes.option2,
            option3: pollWithVotes.option3,
            option4: pollWithVotes.option4,
            option5: pollWithVotes.option5,
            option6: pollWithVotes.option6,
            option7: pollWithVotes.option7,
            option8: pollWithVotes.option8,
            option9: pollWithVotes.option9,
            option10: pollWithVotes.option10,
        };

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

        return {
            message: 'Vote recorded successfully',
            totalVotes,
            votes
        };

    } catch (error) {
        console.error('Error saving vote:', error);
        throw error;
    }
}

const getIp = (req) => {
    let ip;
    if (req.headers["x-forwarded-for"]) {
        ip = req.headers["x-forwarded-for"].split(",").pop().trim();
    } else if (req.connection && req.connection.remoteAddress) {
        ip = req.connection.remoteAddress;
    } else {
        ip = req.ip;
    };

    if (ip.includes("::")) {
        ip = ip.split(":").pop();
    };
    return ip;
};