var express = require('express');
var path = require('path');
var app = express();

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function (req, res) {
    response.send('Hello World!')
});

app.get('/:name', function (req, res) {
    res.sendFile(path.join(__dirname + '/public/index.html'));
});
app.get('/page/:name', function (req, res) {
    var pageName = req.params.name;
    res.sendFile(path.join(__dirname + '/public/component-html/' + pageName + '.html'));
});

app.listen(process.env.PORT  || 3000, function () {
    console.log('Example app listening on port 3000!');
});
