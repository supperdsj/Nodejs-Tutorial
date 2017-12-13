// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');


MongoClient.connect('mongodb://localhost:27017', (err, client) => {
    if (err) {
        return console.log('Unable to connect to mongodb server');
    }
    console.log('Connect to mongodb success');
    const db = client.db('TodoApp');
    // db.collection('Todos').deleteMany({"completed" : true}).then((res)=>{
    //     console.log(res.deletedCount);
    // },(err)=>{
    //     console.log(err);
    // });
    // db.collection('Todos').deleteOne({"completed" : true}).then((res)=>{
    //     console.log(res.deletedCount);
    // },(err)=>{
    //     console.log(err);
    // });
    db.collection('Todos').findOneAndDelete({"completed" : true}).then((res)=>{
        console.log(res);
    },(err)=>{
        console.log(err);
    });

});