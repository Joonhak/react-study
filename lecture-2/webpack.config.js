const path = require('path');

// config
module.exports = {
	name: 'project',
	mode: 'development', // <-> production
	devtool: 'eval', // hidden-source-map in production
	resolve: {
		extensions: ['.js', '.jsx'],
	}, // extensions for entry files

	entry: {
		app: ['./client'],
	}, // entry files ( input )

	module: {
		rules: [{
			test: /\.jsx?$/,
			loader: 'babel-loader',
			options: {
				presets: ['@babel/preset-env', '@babel/preset-react'],
				plugins: ['@babel/plugin-proposal-class-properties'],
			}
		}],
	},

	output: {
		path: path.join(__dirname, 'dist'), // -> /path/to/project/dist
		filename: 'app.js',
		publicPath: '/dist',
	}, // output file -> /path/to/project/dist/app.js
}