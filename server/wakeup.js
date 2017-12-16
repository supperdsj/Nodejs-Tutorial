const request = require('request');

const wakeup = () => {
    request(`https://dongsj-note-app.herokuapp.com/wakeup`, function (error, response, body) {
        console.log(body);
    });
};

setInterval(() => {
    wakeup();
}, 60 * 20 * 1000);
wakeup();