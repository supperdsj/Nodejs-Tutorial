// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');


MongoClient.connect('mongodb://localhost:27017', (err, client) => {
    if (err) {
        return console.log('Unable to connect to mongodb server');
    }
    console.log('Connect to mongodb success');
    const db = client.db('TodoApp');
    const obj = new ObjectID();
    console.log(obj);
    db.collection('Todos').insertOne({
        text: 'Something to do',
        completed: false,
        _id: obj
    }, (err, result) => {
        if (err) {
            return console.log('unable to insert todo', err);
        }
        console.log(JSON.stringify(result.ops[0]._id.getTimestamp()));
        client.close();
    });
});