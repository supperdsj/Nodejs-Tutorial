const request = require('request');

const wakeup = () => {
    request(`http://localhost:${process.env.PORT}/wakeup`, function (error, response, body) {
        console.log(body);
    });
};

setInterval(() => {
    wakeup();
}, 60 * 20 * 1000);
wakeup();