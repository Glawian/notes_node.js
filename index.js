var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var proxy = require('express-http-proxy');

var app = express();
var NOTES_URL = '/notes';
var notes = [];

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}))

app.get(NOTES_URL, (req, res) => {
    res.json({
        notes: notes
    })
});

app.post(NOTES_URL, (req, res) => {
    var note = req.body.note;
    notes.push(note);
    res.json({value: note});
});

app.delete(NOTES_URL, (req, res) => {
    res.json({
        status: 'deleted'
    });
});

var frontend;
if (process.env['PRODUCTION']) {
    frontend = express.static(path.resolve(__dirname, 'dist'));
} else {
    frontend = proxy('http://localhost:8081')
}

app.get('*', frontend);

app.listen(8080, () => {
    console.log('server is now listeining on port 8080');
});