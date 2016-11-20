var path = require('path');

var PATHS = {
	app: path.join(__dirname, 'client/js/init.js'),
	build: path.join(__dirname, 'client/build')
};

var entry;
var plugins;

// if (process.env.NODE_ENV === 'production') {
// 	var webpack = require('webpack');
// 	entry = [
// 		PATHS.app,
// 		'webpack-dev-server/client?http://localhost:3001',
// 		'webpack/hot/only-dev-server',
// 	];
// 	plugins = [new webpack.HotModuleReplacementPlugin()];
// } else {
	entry = [PATHS.app];
// }
module.exports = {
	entry: entry,
	output: {
		path: path.join(__dirname, 'client/build'),
		filename: 'bundle.js'
	},
	devServer: {
		contentBase: PATHS.build,
		historyApiFallback: true,
		inline: true,
		stats: 'errors-only',
		host: process.env.HOST,
		port: 3001
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
    plugins: plugins
}