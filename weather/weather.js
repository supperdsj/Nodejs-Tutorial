const request = require('request');

const apiKey = 'a67adc5a5ee600048fa8aa7ab68ee28f';

const getWeather = (lat, lng, callback) => {
    request({
        url: `https://api.darksky.net/forecast/${apiKey}/${lat},${lng}`,
        json: true
    }, (err, resp, body) => {
        if (!err && resp.statusCode === 200) {
            callback(null, {
                temperature: body.currently.temperature,
                apparentTemperature: body.currently.apparentTemperature
            });
        } else {
            callback(err, null);
        }
    });
};
const getWeatherPromise = (city) => {
    return new Promise((resolve, reject) => {
        getWeather(city.lat,city.lng, (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(Object.assign(city,result));
            }
        });
    });
};
module.exports = {getWeather, getWeatherPromise};