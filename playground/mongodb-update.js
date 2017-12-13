// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');


MongoClient.connect('mongodb://localhost:27017', (err, client) => {
    if (err) {
        return console.log('Unable to connect to mongodb server');
    }
    console.log('Connect to mongodb success');
    const db = client.db('TodoApp');
    db.collection('Todos').findOneAndUpdate(
        {_id: new ObjectID('5a30ecf456b9682d7dcf269a')}, {
            $set: {
                completed: true
            }
        }, {
            returnOriginal: false
        })
        .then((res) => {
            console.log(res);
        }, (err) => {
            console.log(err);
        });

});