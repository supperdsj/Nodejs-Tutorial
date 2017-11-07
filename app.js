console.log('Starting app.');

const fs = require('fs');
const os = require('os');

const userInfo=os.userInfo();
fs.appendFile('greetings.txt', `Hello ${userInfo.username}!\n`, (err) => {
    if (err) {
        console.log('append file error');
        throw err;
    } else {
        console.log('append file success')
    }
});

