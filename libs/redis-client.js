const redis = require('redis');
const {promisify} = require('util');
const {REDIS_HOST, REDIS_PORT} = require('../config');
let redisClient = redis.createClient(REDIS_PORT, REDIS_HOST);
let getAsync = promisify(redisClient.get).bind(redisClient);
let redisOnline = false;
redisClient.on("error", (err) => {
    console.log("RedisError: " + err);
    redisOnline = false;
});
redisClient.on("ready", () => {
    console.log("REDIS ON");
    redisOnline = true;
});

exports.redisClient = {
    get: async (key) => {
        return await getAsync(key);
    },
    set: (key, value) => {
        return redisClient.set(key, value, 'EX', 3600);//force expires to 1 hour
    },
    isOnline: () => {
        return redisOnline;
    }
}