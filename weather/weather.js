const request = require('request');

const apiKey = 'a67adc5a5ee600048fa8aa7ab68ee28f';

const getWeather = (lat, lng, callback) => {
    request({
        url: `https://api.darksky.net/forecast/${apiKey}/${lat},${lng}`,
        json: true
    }, (err, resp, body) => {
        if (!err && resp.statusCode === 200) {
            // console.log(body.currently.temperature);
            callback(null, {temperature:body.currently.temperature,apparentTemperature:body.currently.apparentTemperature});
        } else {
            // console.log('unable to fetch weather');
            callback(err, null);
        }
    });
};
module.exports.getWeather = getWeather;