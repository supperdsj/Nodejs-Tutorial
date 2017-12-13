// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');


MongoClient.connect('mongodb://localhost:27017', (err, client) => {
    if (err) {
        return console.log('Unable to connect to mongodb server');
    }
    console.log('Connect to mongodb success');
    const db = client.db('TodoApp');
    // db.collection('Todos').find().toArray().then((docs)=>{
    // db.collection('Todos').find({completed: false}).toArray().then((docs) => {
    //     console.log(docs);
    // }, (err) => {
    //     console.log(err);
    // });
    db.collection('Todos').find({completed: false}).count().then((count) => {
        console.log(count);
    }, (err) => {
        console.log(err);
    });
});