const {httpsGet} = require('../libs/https-client');
const {WEATHER_API_ENDPOINT, WEATHER_API_KEY} = require('../config');

exports.weather = async (query) => {
    let url = WEATHER_API_ENDPOINT + query + '&appid=' + WEATHER_API_KEY;
    return await httpsGet(url, {})
        .then((weatherResponse) => {
            if(weatherResponse.cod == "200") {
                return weatherResponse;
            } else {
                return Promise.reject({code: 500, message: "Weather API: Content error."});
            }
        }).catch((error) => {
            console.log("Weather API error: " + error);
            return {code: 500, message: "Weather API: " + error};
        });
};