const {ObjectID} = require('mongodb');
const jwt = require('jsonwebtoken');

const {Todo} = require('./../../models/todo');
const {User, jwtSec} = require('./../../models/user');

const userOneId = new ObjectID();
const userTwoId = new ObjectID();

const users = [{
    _id: userOneId,
    email: 'dongsj@123.com',
    password: 'userOnePassword',
    tokens: [{
        access: 'auth',
        token: jwt.sign({_id: userOneId, access: 'auth'}, jwtSec).toString()
    }]
}, {
    _id: userTwoId,
    email: 'supperdsj@123.com',
    password: 'userTwoPassword',
    tokens: [{
        access: 'auth',
        token: jwt.sign({_id: userTwoId, access: 'auth'}, jwtSec).toString()
    }]
}];

const todos = [{
    _id: new ObjectID(),
    text: 'First test todo',
    _creator:userOneId
}, {
    _id: new ObjectID(),
    text: 'Second test todo',
    _creator:userTwoId
}];

const populateTodos = (done) => {
    Todo.remove({}).then(() => {
        return Todo.insertMany(todos);
    }).then(() => done());
};


const populateUsers = (done) => {
    User.remove({}).then(() => {
        let userOne = new User(users[0]).save();
        let userTwo = new User(users[1]).save();

        return Promise.all([userOne, userTwo]);
    }).then(() => done());
};


module.exports = {todos, populateTodos, users, populateUsers};