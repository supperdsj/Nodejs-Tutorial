console.log('Starting app.js');

const fs = require('fs');
const os = require('os');
const notes = require('./notes');

let res = notes.addNote();
console.log(res);
console.log('add(1,-19) result:' + notes.add(1, -19));

const userInfo = os.userInfo();
fs.appendFile('greetings.txt', `Hello ${userInfo.username}! Age ${notes.age}\n`, (err) => {
    if (err) {
        console.log('append file error');
        throw err;
    } else {
        console.log('append file success')
    }
});

