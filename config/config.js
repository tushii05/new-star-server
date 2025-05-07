const mysql = require("mysql2/promise");
const { Sequelize, DataTypes } = require("sequelize");
const dotenv = require('dotenv');

dotenv.config();

const db = {};

async function initialize() {
    const { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_DB } = process.env;

    try {
        const connection = await mysql.createConnection({
            host: DB_HOST,
            port: DB_PORT,
            user: DB_USER,
            password: DB_PASSWORD,
        });

        await connection.query(`CREATE DATABASE IF NOT EXISTS \`${DB_DB}\`;`);
        // console.log(`Database "${DB_DB}" ensured`);

        const sequelize = new Sequelize(DB_DB, DB_USER, DB_PASSWORD, {
            port: DB_PORT,
            host: DB_HOST,
            dialect: "mysql",
            logging: false,
        });

        await sequelize.authenticate();
        console.log(`Connected to the database: ${DB_DB}`);

        db.sequelize = sequelize;
        db.Sequelize = Sequelize;

        db.categories = require("../models/categories")(sequelize);
        db.general_settings = require('../models/generalSettings')(sequelize);
        db.pages = require('../models/pages')(sequelize);
        db.widgets = require('../models/widgets')(sequelize);
        db.settings = require('../models/settings')(sequelize);
        db.posts = require('../models/posts')(sequelize);
        db.tags = require('../models/tags')(sequelize);
        db.polls = require('../models/polls')(sequelize);
        db.gallery_albums = require('../models/gallery_albums')(sequelize);
        db.gallery_categories = require('../models/gallery_categories')(sequelize);
        db.gallery = require('../models/gallery')(sequelize);
        db.polls = require('../models/polls')(sequelize);
        db.poll_votes = require('../models/poll_votes')(sequelize);
        db.languages = require('../models/language')(sequelize);
        db.subscribers = require('../models/subscriber')(sequelize);
        db.contacts = require('../models/contacts')(sequelize);
        db.users = require('../models/user')(sequelize);
        db.post_audios = require('../models/post_audios')(sequelize);
        db.audios = require('../models/audios')(sequelize);
        db.post_sorted_list_items = require('../models/post_sorted_list_items')(sequelize);
        db.comments = require('../models/comments')(sequelize);
        db.post_pageviews_month = require('../models/post_pageViews_month')(sequelize);
        db.post_files = require('../models/post_files')(sequelize);
        db.files = require('../models/files')(sequelize);
        db.post_images = require('../models/post_images')(sequelize);
        db.reading_lists = require('../models/reading_lists')(sequelize);
        db.followers = require('../models/followers')(sequelize);
        db.quiz_questions = require('../models/quiz_questions')(sequelize);
        db.quiz_answers = require('../models/quiz_answers')(sequelize);
        db.quiz_results = require('../models/quiz_results')(sequelize);
        db.post_poll_votes = require('../models/post_poll_votes')(sequelize);
        db.epaper = require('../models/epaper')(sequelize);
        db.ad_spaces = require('../models/ad_spaces')(sequelize);
        db.web_stories = require('../models/web_stories')(sequelize);
        db.web_sub_stories = require('../models/web_sub_stories')(sequelize);

        db.polls.hasMany(db.poll_votes, { foreignKey: 'poll_id' });
        db.poll_votes.belongsTo(db.polls, { foreignKey: 'poll_id' });
        db.posts.belongsTo(db.categories, { foreignKey: 'category_id' });
        db.categories.hasMany(db.posts, { foreignKey: 'category_id', as: 'posts' });
        db.tags.belongsTo(db.posts, { foreignKey: 'post_id' });
        db.posts.belongsTo(db.users, { foreignKey: 'user_id' });
        db.post_audios.belongsTo(db.posts, { foreignKey: 'post_id' });
        db.post_audios.belongsTo(db.audios, { foreignKey: 'audio_id' });
        db.posts.hasMany(db.post_audios, { foreignKey: 'post_id' });
        db.posts.hasMany(db.tags, { foreignKey: 'post_id' });
        db.posts.hasMany(db.post_images, { foreignKey: 'post_id' });
        db.reading_lists.belongsTo(db.posts, { foreignKey: 'post_id' });
        db.reading_lists.belongsTo(db.users, { foreignKey: 'user_id' });

        db.post_files.belongsTo(db.posts, { foreignKey: 'post_id' });
        db.post_files.belongsTo(db.files, { foreignKey: 'file_id' });
        db.posts.hasMany(db.post_files, { foreignKey: 'post_id' });
        db.posts.hasMany(db.quiz_questions, { foreignKey: 'post_id' });
        db.quiz_questions.hasMany(db.quiz_answers, { foreignKey: 'question_id' });
        db.quiz_answers.belongsTo(db.quiz_results, { foreignKey: 'assigned_result_id' });

        db.posts.hasMany(db.comments, { foreignKey: 'post_id' });
        db.users.hasMany(db.comments, { foreignKey: 'user_id' });
        db.comments.belongsTo(db.users, { foreignKey: 'user_id' });

        db.followers.belongsTo(db.users, { foreignKey: 'follower_id', as: 'follower' });
        db.followers.belongsTo(db.users, { foreignKey: 'following_id', as: 'following' });

        db.web_stories.hasMany(db.web_sub_stories, { foreignKey: 'web_id' })

        await sequelize.sync();
        // console.log('Database synchronized');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

// initialize();
db.initialize = initialize;


module.exports = db;
