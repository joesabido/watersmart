var Path = require('path')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var DotenvPlugin = require('dotenv-webpack')

var environment = process.env.NODE_ENV

module.exports = {
	mode : environment,
	entry : Path.resolve(__dirname, 'src/App.js'),
	output : {
		path : Path.resolve(__dirname, 'dist'),
		filename : 'bundle.js'
	},
	optimization : {
		splitChunks : {
			chunks : 'all'
		}
	},
	devtool: 'inline-source-map',
	plugins : [
		new HtmlWebpackPlugin({
			template : Path.resolve(__dirname, 'public/index.html')
		}),
		new DotenvPlugin({
			path : './' + environment + '.env'
		})
	],
	performance : {
		hints : false
	},
	module : {
		rules : [{
			test : /\.js$/,
			exclude : /node_modules/,
			loader : 'babel-loader'
		},{
			test : /\.css$/,
			use : ['style-loader', 'css-loader']
		},{
			test : /\.(png|jpg|jpeg|svg|eot|svg|ttf|woff|woff2)$/,
			use : ['file-loader']
		}]
	}
}