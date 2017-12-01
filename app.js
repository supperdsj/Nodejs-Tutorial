const yargs = require('yargs');
const axios = require('axios');

const geocode = require('./geocode/geocode.js');
const weather = require('./weather/weather.js');

const argv = yargs
    .options({
        a: {
            demand: true,
            alias: 'address',
            describe: 'Address to fetch weather for',
            string: true
        }
    })
    .help()
    .alias('help', 'h')
    .argv;

// geocode.geocodeAddress(argv.address, (errorMessage, results) => {
//     if (errorMessage) {
//         console.log(errorMessage);
//     } else {
//         console.log(JSON.stringify(results, undefined, 2));
//         weather.getWeather(results.lat, results.lng, (err, weatherResult) => {
//             if (err) {
//                 console.log('unable to fetch weather');
//             } else {
//                 console.log(JSON.stringify(weatherResult,undefined,2));
//             }
//         });
//     }
// });
geocode.geocodeAddressPromise(argv.address)
    .then((city) => {
        return weather.getWeatherPromise(city)
    })
    .then((temperature) => {
        console.log(temperature);
    })
    .catch((e) => {
        console.log('get temperature fail');
        console.log(e);
    });
