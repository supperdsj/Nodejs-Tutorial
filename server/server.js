let express = require('express');
let bodyParser = require('body-parser');
let {ObjectID} = require('mongodb');

let {mongoose} = require('./db/mongoose');
let {Todo} = require('./models/todo');
let {User} = require('./models/user');

let app = express();
const port = process.env.PORT||3000;

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
        res.status(404).send();
    });
});
app.listen(port, () => {
    console.log(`Started on port ${port}`);
});


module.exports = {app};