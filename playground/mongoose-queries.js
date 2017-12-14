const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {ObjectID} = require('mongodb');

const id = '5a310dca19a75cbc659aa9d1';

if (!ObjectID.isValid(id)) {
    console.log('ObjectID is not valid');
} else {
    Todo.find({_id: id}).then((doc) => {
        if (doc.length === 0) {
            console.log('not found');
        } else {
            console.log('find', doc)
        }
    }).catch((e) => {
        console.log('error!', JSON.stringify(e, undefined, 2));
    });
    Todo.findOne({_id: id}).then((doc) => {
        if (!doc) {
            console.log('not found');
        } else {
            console.log('findOne', doc);
        }
    }).catch((e) => {
        console.log('error!', JSON.stringify(e, undefined, 2));
    });
    Todo.findById(id).then((doc) => {
        if (!doc) {
            console.log('not found');
        } else {
            console.log('findById', doc);
        }
    }).catch((e) => {
        console.log('error!', JSON.stringify(e, undefined, 2));
    });
}