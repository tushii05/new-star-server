require('rootpath')();
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const cluster = require('cluster');
const os = require('os');
const errorHandler = require('./middlewares/errorHandler');
const redisClient = require('./utils/redisClient')
const session = require('express-session');
const RedisStore = require('connect-redis').default;
const path = require('path')
dotenv.config();

const numCPUs = os.cpus().length;
const port = process.env.PORT || 3301;

if (cluster.isMaster) {
    for (let i = 0; i < numCPUs; i++) {
        cluster.fork();
    }

    cluster.on('exit', (worker, code, signal) => {
        cluster.fork();
    });
} else {
    const app = express();

    // app.use(cors({ origin: '*' }));


    // const corsOptions = {
    //     origin: '*',
    //     credentials: true,
    // };
    // app.use(cors(corsOptions));

    // app.use(session({
    //     store: new RedisStore({ client: redisClient }),
    //     name: 'Start_Samachar Session',
    //     secret: process.env.SESSION_SECRET || 'SESSION_SECRET=2c6c8b9e3e50bc4035a1c8b6c42c52f31b16e3b44f63d4edaa6f7a3e6e7f2b3a',
    //     resave: false,
    //     proxy: true,
    //     saveUninitialized: true,
    //     cookie: {
    //         secure: false,
    //         maxAge: 7 * 24 * 60 * 60 * 1000
    //     }
    // }));

    app.set("trust proxy", 1);

    const corsOptions = {
        origin: '*',
        credentials: true
    };

    app.use(session({
        store: new RedisStore({ client: redisClient }),
        name: 'Start_Samachar_Session',
        secret: process.env.SESSION_SECRET,
        resave: false,
        // proxy: true,
        saveUninitialized: false,
        cookie: {
            secure: process.env.NODE_ENV === 'production',
            maxAge: 7 * 24 * 60 * 60 * 1000
        }
    }));

    app.use(cors(corsOptions));

    app.use(express.json({ limit: '10mb' }));
    app.use(express.urlencoded({ limit: '10mb', extended: true }));

    app.use((req, res, next) => {
        req.redisClient = redisClient;
        next();
    });

    app.use("/api", require('./routes/index'));

    app.get('/hello', (req, res) => {
        res.send('Hello');
    });

    // const EPAPER_UPLOAD_DIR = '/var/www/html/demonews/newss';
    app.use('/uploads', express.static(process.env.EPAPER_UPLOAD_DIR));

    app.use(errorHandler);

    app.listen(port, () => {
        console.log(`Worker ${process.pid} started, listening on port ${port}`);
    });

    process.on('SIGINT', async () => {
        await redisClient.quit();
        process.exit(0);
    });
}
