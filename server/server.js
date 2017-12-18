if (process.env.NODE_ENV === 'production') {
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
const {authenticate} = require('./middleware/authenticate');

console.log(User.findByToken);
let app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.post('/todos', authenticate, (req, res) => {
    let todo = new Todo({
        text: req.body.text,
        _creator: req.user._id
    });
    todo.save().then((doc) => {
        res.send(doc);
    }, (err) => {
        res.status(400).send(err);
    });
});

app.get('/todos', authenticate, (req, res) => {
    Todo.find({_creator: req.user._id})
        .then((todos) => {
            res.send({todos});
        }, (err) => {
            res.status(400).send(err);
        });
});

app.get('/todos/:id', authenticate, (req, res) => {
    if (!ObjectID.isValid(req.params['id'])) {
        return res.status(404).send();
    }
    Todo.findOne({_id: req.params['id'], _creator: req.user._id}).then((todo) => {
        if (!todo) {
            res.status(404).send();
        } else {
            res.send({todo});
        }
    }, (err) => {
        res.status(400).send();
    });
});

app.delete('/todos/:id', authenticate, (req, res) => {
    if (!ObjectID.isValid(req.params['id'])) {
        return res.status(404).send();
    }
    Todo.findOneAndRemove({_id: req.params['id'], _creator: req.user._id}).then((todo) => {
        if (!todo) {
            res.status(404).send();
        } else {
            res.send({todo});
        }
    }, (err) => {
        res.status(400).send();
    });
});

app.patch('/todos/:id', authenticate,(req, res) => {
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
    Todo.findOneAndUpdate({_id:req.params['id'], _creator: req.user._id}, {$set: body}, {new: true}).then((todo) => {
        if (!todo) {
            res.status(404).send();
        } else {
            res.send({todo});
        }
    }, (err) => {
        res.status(404).send(err);
    });
});

app.post('/users', (req, res) => {
    const body = _.pick(req.body, ['email', 'password']);
    const user = new User(body);

    user.save().then((_user) => {
        return _user.generateAuthToken();
    }).then((token) => {
        res.header('x-auth', token).send(user);
    }).catch((err) => {
        err = JSON.parse(JSON.stringify(err));
        delete  err.op;
        res.status(400).send(err);
    });
});

app.post('/users/login', (req, res) => {
    const body = _.pick(req.body, ['email', 'password']);
    User.findByCredentials(body.email, body.password).then((user) => {
        user.generateAuthToken().then((token) => {
            res.header('x-auth', token).send(user);
        });
    }).catch((e) => {
        res.status(401).send()
    });
});

app.get('/users/me', authenticate, (req, res) => {
    res.send(req.user);
});


app.delete('/users/me/token', authenticate, (req, res) => {
    req.user.removeToken(req.token).then(() => {
        res.status(200).send();
    }).catch((e) => {
        res.status(401).send();
    })
});

app.get('/error', (req, res) => {
    throw 'test Error';
});

app.listen(port, () => {
    console.log(`Started on port ${port}`);
});


module.exports = {app};