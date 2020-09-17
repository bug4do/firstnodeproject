const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 80;

// EJS
app.set('view engine', 'ejs');
app.use(express.static('public'))

// Body Parser
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

/*
    Routes
*/

app.get('/',(req, res) => {
    res.render('index');
});

app.get('/ask', (req, res) => {
    res.render('ask');
});

app.post('/asksuccess', (req, res) => {
    let title = req.body.title;
    let content = req.body.content;

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