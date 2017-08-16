var express = require('express');
var baby = require('babyparse');
var fs = require('fs');
var app = express();


app.set('port', process.env.PORT || 3000);


app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');
    next();
});

app.get('/students', (req, resp) => {
    fs.readFile('students.csv', (err, data) => {
        if (err) {
            throw err;
        }
        resp.send(baby.parse(data.toString(), { header: true, quoteChar: '"' }).data);
    });
});

app.listen(app.get('port'), () => {
    console.log('Express server listening on port ' + app.get('port'));
});