console.log('Starting app.js');

const fs = require('fs');
const os = require('os');
const notes = require('./notes');
const _ = require('lodash');

let res = notes.addNote();
console.log(res);
console.log('add(1,-19) result:' + notes.add(1, -19));

console.log(`123 is string? ${_.isString(123)}`);
console.log(`abc is string? ${_.isString('abc')}`);

console.log(`5,1,2,3,4,5,1,2,3 uniq: ${_.uniq([5,1,2,3,4,5,1,2,3])}`);

const userInfo = os.userInfo();
fs.appendFile('greetings.txt', `Hello ${userInfo.username}! Age ${notes.age}\n`, (err) => {
    if (err) {
        console.log('append file error');
        throw err;
    } else {
        console.log('append file success')
    }
});

