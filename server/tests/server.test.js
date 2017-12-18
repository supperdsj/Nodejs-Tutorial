const expect = require('expect');
const request = require('supertest');
const {ObjectID} = require('mongodb');

const {app} = require('./../server');
const {Todo} = require('./../models/todo');
const {User} = require('./../models/user');

const {todos, populateTodos, users, populateUsers} = require('./seed/seed');

beforeEach(populateUsers);
beforeEach(populateTodos);

describe('POST /todos', () => {
    it('should to create a new todo', (done) => {
        let text = 'Test todo text';

        request(app)
            .post('/todos')
            .send({text})
            .expect(200)
            .expect((res) => {
                expect(res.body.text).toBe(text);
            })
            .end((err, res) => {
                if (err) {
                    return done(err);
                } else {
                    Todo.find().then((todos) => {
                        expect(todos.length).toBe(3);
                        expect(todos[2].text).toBe(text);
                        done();
                    }).catch((e) => done(e));
                }
            });
    });
    it('should not create todo with invalid body data', (done) => {
        let text = '';

        request(app)
            .post('/todos')
            .send({text})
            .expect(400)
            .end((err, res) => {
                if (err) {
                    return done(err);
                } else {
                    Todo.find().then((todos) => {
                        expect(todos.length).toBe(2);
                        done();
                    }).catch((e) => done(e));
                }
            });
    });
});

describe('GET /todos', () => {
    it('should get all todos', (done) => {
        request(app)
            .get('/todos')
            .expect(200)
            .expect((res) => {
                expect(res.body.todos.length).toBe(2);
            }).end(done);
    });
});

describe('GET /todos/:id', () => {
    it('should return todo doc by id', (done) => {
        request(app)
            .get(`/todos/${todos[0]._id.toString()}`)
            .expect(200)
            .expect((res) => {
                expect(res.body.todo.text).toBe(todos[0].text);
            })
            .end(done);
    });
    it('should return 404 with invalid id', (done) => {
        request(app)
            .get(`/todos/123`)
            .expect(404)
            .end(done);
    });
    it('should return 404 with wrong id', (done) => {
        request(app)
            .get(`/todos/${(new ObjectID()).toString()}`)
            .expect(404)
            .end(done);
    });
});
describe('DEL /todos/:id', () => {
    it('should remove todo doc by id', (done) => {
        request(app)
            .delete(`/todos/${todos[0]._id.toString()}`)
            .expect(200)
            .expect((res) => {
                expect(res.body.todo.text).toBe(todos[0].text);
            })
            .end((err, res) => {
                if (err) {
                    return done(err);
                } else {
                    Todo.findById(todos[0]._id.toString()).then((todo) => {
                        expect(todo).toNotExist();
                        done();
                    }).catch((e) => done(e));
                }
            });
    });
    it('should return 404 with invalid id', (done) => {
        request(app)
            .delete(`/todos/123`)
            .expect(404)
            .end(done);
    });
    it('should return 404 with wrong id', (done) => {
        request(app)
            .delete(`/todos/${(new ObjectID()).toString()}`)
            .expect(404)
            .end(done);
    });
});
describe('PATCH /todos/:id', () => {
    it('should update todo doc by id to completed', (done) => {
        request(app)
            .patch(`/todos/${todos[0]._id.toString()}`)
            .send({
                completed: true,
                text: 'make it completed'
            })
            .expect(200)
            .expect((res) => {
                expect(res.body.todo.text).toBe('make it completed');
                expect(res.body.todo.completed).toBe(true);
                expect(res.body.todo.completedAt).toBeA('number');
            })
            .end(done);
    });
    it('should update todo doc by id to uncompleted', (done) => {
        request(app)
            .patch(`/todos/${todos[0]._id.toString()}`)
            .send({
                completed: false,
                text: 'make it uncompleted'
            })
            .expect(200)
            .expect((res) => {
                expect(res.body.todo.text).toBe('make it uncompleted');
                expect(res.body.todo.completed).toBe(false);
                expect(res.body.todo.completedAt).toNotExist();
            })
            .end(done);
    });
    it('should return 404 with invalid id', (done) => {
        request(app)
            .patch(`/todos/123`)
            .expect(404)
            .end(done);
    });
    it('should return 404 with wrong id', (done) => {
        request(app)
            .patch(`/todos/${(new ObjectID()).toString()}`)
            .expect(404)
            .end(done);
    });
});
describe('GET /users/me', () => {
    it('should return user if authenticated', (done) => {
        request(app)
            .get(`/users/me`)
            .set('x-auth', users[0].tokens[0].token)
            .expect(200)
            .expect((res) => {
                expect(res.body._id).toBe(users[0]._id.toString());
                expect(res.body.email).toBe(users[0].email);
            })
            .end(done);
    });
    it('should return 401 if not authenticated', (done) => {
        request(app)
            .get(`/users/me`)
            .set('x-auth', 'wrong auth')
            .expect(401)
            .end(done);
    });
});
describe('POST /users/me', () => {
    it('should create a user', (done) => {
        const email = '232171773@qq.com';
        const password = 'abc!123456';
        request(app)
            .post('/users')
            .send({email, password})
            .expect(200)
            .expect((res) => {
                expect(res.headers['x-auth']).toExist();
                expect(res.body._id).toExist();
                expect(res.body.email).toBe(email);
            })
            .end((err) => {
                if (err) {
                    return done(err);
                }
                User.findOne({email}).then((user) => {
                    expect(user).toExist();
                    expect(user.password).toNotBe(password);
                    done();
                });
            });
    });
    it('should not create a user with a exist email', (done) => {
        request(app)
            .post('/users')
            .send({email: users[0].email, password: users[0].password})
            .expect(400)
            .end(done);
    });
    it('should not create with invalid email', (done) => {
        const email = 'www.qq.com';
        const password = 'abc!123456';
        request(app)
            .post('/users')
            .send({email, password})
            .expect(400)
            .end((err) => {
                if (err) {
                    return done(err);
                }
                User.findOne({email}).then((user) => {
                    expect(user).toNotExist();
                    done();
                });
            });
    });
});
describe('POST /users/login', () => {
    it('should login user and return auth token', (done) => {
        request(app)
            .post('/users/login')
            .send({email: users[1].email, password: users[1].password})
            .expect(200)
            .expect((res) => {
                expect(res.headers['x-auth']).toExist();
                expect(res.body._id).toExist();
                expect(res.body.email).toBe(users[1].email);
            })
            .end((err, res) => {
                if (err) {
                    done(err);
                }
                User.findById(users[1]._id).then((user) => {
                    expect(user.tokens.filter((t)=>t.access==='auth')[0].token).toBe(res.headers['x-auth']);
                    done();
                }).catch((e) => {
                    done(e);
                });
            });
    });
    it('should reject invalid login', (done) => {
        request(app)
            .post('/users/login')
            .send({email: users[0].email, password: 'wrone pwd'})
            .expect(401)
            .expect((res) => {
                expect(res.headers['x-auth']).toNotExist();
            })
            .end(done);
    });
});