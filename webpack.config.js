'use strict'
var path = require('path');
var webpack = require('webpack');
var config = {
	entry: path.join(__dirname, 'public/js/init.js'),
	output: {
		path: path.join(__dirname, 'public/build'),
		filename: 'bundle.js'
	},
	module: {
	    loaders: [
			{
				test: /\.css$/,
				loaders: ['style', 'css']
			},
			{
				test: /\.html$/,
		        loader: "html"
			}
	    ]
	},
	devtool: 'source-map',
	htmlLoader: {
		ignoreCustomFragments: [/\{\{.*?}}/]
	},
    plugins: [
    	new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
                drop_console: true
            },
            beautify: false,
            // Eliminate comments
            comments: false,
        })
    ]
};
module.exports = config;
