const redisClient = require('../utils/redisClient');
const db = require('../config/config')
const cachePatterns = [
    'categories_*',
    'widgets_all*',
    'posts_*',
    'homepage_data*'

];

const deleteKeysByPatterns = async (patterns) => {
    try {
        for (const pattern of patterns) {
            console.log(`Searching for keys with pattern: ${pattern}`);

            const keys = await redisClient.keys(pattern);
            console.log(`Found keys: ${keys.length} keys for pattern: ${pattern}`);

            if (keys.length) {
                const batchSize = 1000;
                for (let i = 0; i < keys.length; i += batchSize) {
                    const batch = keys.slice(i, i + batchSize);
                    await Promise.all(batch.map(key => redisClient.del(key)));
                    console.log(`Deleted batch ${i / batchSize + 1} for pattern: ${pattern}`);
                }
                console.log(`Cache cleared for keys matching pattern: ${pattern}`);
            } else {
                console.log(`No keys found matching pattern: ${pattern}`);
            }
        }
    } catch (err) {
        console.error('Error clearing cache:', err);
    }
};

const clearAllCacheData = async () => {
    try {
        const setting = await db.general_settings.findOne();
        console.log(setting.cache_system, 'setting.cache_system');
        if (setting.cache_system === 1) {
            await deleteKeysByPatterns(cachePatterns);
        }
        console.log('All predefined cache patterns cleared successfully');
    } catch (err) {
        console.error('Error clearing all predefined cache patterns:', err);
    }
};

const clearAllCache = async () => {
    try {
        await deleteKeysByPatterns(cachePatterns);
        console.log('All predefined cache patterns cleared successfully');
    } catch (err) {
        console.error('Error clearing all predefined cache patterns:', err);
    }
};


const refreshCacheConfig = async () => {
    try {
        const [result] = await db.sequelize.query(
            'SELECT cache_refresh_time, cache_system FROM general_settings LIMIT 1',
            { type: db.Sequelize.QueryTypes.SELECT }
        );
        return {
            refreshTimeInSeconds: result?.cache_refresh_time || 3600,
            cacheSystem: result?.cache_system || 0,
        };
    } catch (err) {
        console.error('Error fetching cache_refresh_time from general_settings:', err);
        return {
            refreshTimeInSeconds: 3600,
            cacheSystem: 0,
        };
    }
};


const startCacheAutoClear = async () => {
    try {
        await db.initialize();
        let { refreshTimeInSeconds, cacheSystem } = await refreshCacheConfig();
        setInterval(async () => {
            const config = await refreshCacheConfig();
            refreshTimeInSeconds = config.refreshTimeInSeconds;
            cacheSystem = config.cacheSystem;
            if (cacheSystem === 1) {
                await clearAllCache();
                console.log("Cache cleared");
            } else {
                console.log("Cache not cleared, cache_system is not true");
            }
        }, refreshTimeInSeconds * 1000);

    } catch (err) {
        console.error('Error during cache clearing:', err);
    }
};

startCacheAutoClear();

module.exports = {
    deleteKeysByPatterns,
    clearAllCacheData

};
