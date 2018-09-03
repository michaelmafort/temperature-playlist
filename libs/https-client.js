const https = require('https');
const {URL} = require('url');
const {redisClient} = require('./redis-client');

exports.httpsGet = async (url, headers) => {
    const {hostname, pathname, search} = new URL(url);
    const options = {
        hostname: hostname,
        port: 443,
        path: pathname + search,
        method: 'GET',
        headers: headers
    };
    let cacheKey = Buffer.from(url).toString('base64');

    return new Promise(async (resolve, reject) => {
        //check if cache exists
        if (redisClient.isOnline()) {
            let content = await redisClient.get(cacheKey).then((cache) => {
                console.log("Content from cache.");
                return JSON.parse(cache.toString());
            }).catch((err) => {
                return false;
            });

            if(content) {
                return resolve(content);
            }
        }

        let data = '';
        const req = https.request(options, (res) => {
            res.on('data', (buffer) => {
                data += buffer;
            });
            res.on('end', () => {
                if (redisClient.isOnline()) {
                    redisClient.set(cacheKey, data);
                }
                resolve(JSON.parse(data));
            })
        });
        
        req.on('error', (e) => {
            reject(e);
        });

        req.end();
    });
};