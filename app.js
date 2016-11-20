var express = require('express');
var app = express();
var path = require('path');
var config = require('./webpack.config.js');


app.get('/', function (req, res) {
	res.sendFile(path.join(__dirname + '/client/index.html'));
});
app.use('/', express.static(__dirname + '/client'));

app.get('/:name', function (req, res) {
    res.sendFile(path.join(__dirname + '/client/index.html'));
});
app.get('/page/:name', function (req, res) {
    var pageName = req.params.name;
    res.sendFile(path.join(__dirname + '/client/component-html/' + pageName + '.html'));
});

app.listen(process.env.PORT  || 3000, function () {
    console.log('Example app listening on port 3000!');
});


// if (process.env.NODE_ENV === 'production') {
//     var webpack = require('webpack');
//     var WebpackDevServer = require('webpack-dev-server');
//     new WebpackDevServer(webpack(config), {
//         proxy: {
//             "*": "http://localhost:3000"
//         }
//     }).listen(3001, 'localhost', function (err, result) {
//         if (err) {
//             console.log(err);
//         }
//     });
// }
