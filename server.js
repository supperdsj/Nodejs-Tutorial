const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

let port = process.env.PORT || 3000;
let app = express();

hbs.registerPartials(__dirname + '/views/partials');

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});
hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});

app.set('view engine', 'hbs');

app.use((req, res, next) => {
    res.render('main.hbs');
});

app.use(express.static(__dirname + '/public'));

app.use((req, res, next) => {
    let now = new Date().toString();
    let log = `${now}:${req.method} ${req.url}`;
    console.log(log);
    fs.appendFile('server.log', log + '\n', (err) => {
        if (err) {
            console.log('unable to append to server.log')
        }
    });
    next();
});
app.get('/', (req, res) => {
    // res.send('<h1>hello express</h1>');
    // res.send({
    //     name: 'dongsj',
    //     age: '28'
    // })

    res.render('home.hbs', {
        pageTitle: 'Home Page',
    });
});
app.get('/about', (req, res) => {
    // res.send('About page');
    res.render('about.hbs', {
        pageTitle: 'About Page',
    });
});
app.listen(port, () => {
    console.log(`server is up to port ${port}`);
});