const {SHA256} = require('crypto-js');

const message = 'I am user 3';
const hash = SHA256(message).toString();

console.log('Msg', message);
console.log('Hash', hash);

const data = {
    id: 4
};
const token = {
    data,
    hash: SHA256(JSON.stringify(data) + 'secret string ~~~').toString()
};

console.log(token);

const currentToken= SHA256(JSON.stringify(data) + 'secret string ~~~').toString();

console.log('Token check',currentToken===token.hash);