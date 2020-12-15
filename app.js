const express = require('express');
const bodyParser = require('body-parser');
const connection = require('./database/database');

/*
    Connection
*/

const Asks = require('./database/model/Asks');
const Replies = require('./database/model/Replies');

connection.authenticate()
.then(() => {
    console.log('Application connected to database.')
}).catch((err) => {
    console.log(`An error occurred when trying to connect mysql: ${err}`)
});

/*
    Express Settings
*/

const app = express();
const port = process.env.PORT || 80;

// EJS
app.set('view engine', 'ejs');
app.use(express.static('public'))

// Body Parser
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

/*
    Routes
*/

// Index
app.get('/',(req, res) => {
    Asks.findAll({
        raw: true,
        order: [
            ['id', 'DESC']
        ]
    }).then(asksContent => {
        res.render('index', {
            asks: asksContent
        });
    });
});

// Replies
app.get('/reply/:id', (req, res) => {
    let id = req.params.id;
    Asks.findOne({
        raw: true,
        where: {id: id}
    }).then(ask => {
        if(ask != undefined) {
            Replies.findAll({
                raw: true,
                order: [
                    ['id', 'DESC']
                ],
                where: {askId: id}
            }).then(replies => {
                res.render('reply', {
                    ask: ask,
                    replies: replies
                });
            }).catch(() => {
                res.redirect('/');
            });
        }
    });
});

// Asking
app.get('/ask', (req, res) => {
    res.render('ask');
});

app.post('/replysuccess', (req, res) => {

    // Getting data
    let id = req.body.id;
    let content = req.body.content;

    // Inserting in the database
    Replies.create({
        askId: id,
        content: content
    }).then(() => {
        res.redirect(`/reply/${id}`);
    });
});

app.post('/asksuccess', (req, res) => {

    // Getting data
    let title = req.body.title;
    let content = req.body.content;

    // Inserting in the database
    Asks.create({
        title: title,
        content: content
    }).then(() => {
        res.redirect('/');
    });
});

/*
    Listen
*/

app.listen(port, (err) => {
    if(err) {
        console.log(`An error occurred when trying to listen the port ${port}: ${err}`)
        return;
    }
    console.log(`App started at port ${port}`);
});