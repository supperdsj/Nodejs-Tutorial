const express = require('express');

let app = express();
app.get('/', (req, res) => {
    // res.status(200).send('hello world');
    res.status(404).send({error: 'Page not found.', name: 'Todo app V1.0'});

});
// GET /users
// give users a name prop and age prop

app.get('/users', (req, res) => {
    res.send([{name: 'dongsj', age: 27}, {name: 'wux', age: 24}]);
});
app.listen(3000);
module.exports.app = app;