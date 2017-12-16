if (process.env.NODE_ENV === 'production'){
    const opbeat = require('opbeat').start();
}

require('./config/config');

const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');
const _ = require('lodash');

const {mongoose} = require('./db/mongoose');
const {Todo} = require('./models/todo');
const {User} = require('./models/user');

let app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.post('/todos', (req, res) => {
    let todo = new Todo({
        text: req.body.text
    });
    todo.save().then((doc) => {
        res.send(doc);
    }, (err) => {
        res.status(400).send(err);
    });
});

app.get('/todos', (req, res) => {
    Todo.find().then((todos) => {
        res.send({todos});
    }, (err) => {
        res.status(400).send(err);
    });
});

app.get('/todos/:id', (req, res) => {
    if (!ObjectID.isValid(req.params['id'])) {
        return res.status(404).send();
    }
    Todo.findOne({_id: req.params['id']}).then((todo) => {
        if (!todo) {
            res.status(404).send();
        } else {
            res.send({todo});
        }
    }, (err) => {
        res.status(400).send();
    });
});

app.delete('/todos/:id', (req, res) => {
    if (!ObjectID.isValid(req.params['id'])) {
        return res.status(404).send();
    }
    Todo.findByIdAndRemove(req.params['id']).then((todo) => {
        if (!todo) {
            res.status(404).send();
        } else {
            res.send({todo});
        }
    }, (err) => {
        res.status(400).send();
    });
});

app.patch('/todos/:id', (req, res) => {
    if (!ObjectID.isValid(req.params['id'])) {
        return res.status(404).send();
    }
    const body = _.pick(req.body, ['text', 'completed']);
    if (_.isBoolean(body.completed) && body.completed) {
        body.completedAt = new Date().getTime();
    } else {
        body.completed = false;
        body.completedAt = null;
    }
    Todo.findByIdAndUpdate(req.params['id'], {$set: body}, {new: true}).then((todo) => {
        if (!todo) {
            res.status(404).send();
        } else {
            res.send({todo});
        }
    }, (err) => {
        res.status(404).send();
    });
});

app.get('/error',(req,res)=>{
    throw 'test Error';
});

app.get('/wakeup',(req,res)=>{
    res.send('I\'m wake!');
});

app.listen(port, () => {
    console.log(`Started on port ${port}`);
});

require('./wakeup');

module.exports = {app};