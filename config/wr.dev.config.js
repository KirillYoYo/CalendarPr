var hot = require("react-hot-loader/patch")
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';

module.exports = {
	entry: [
		'babel-polyfill',
		'react-hot-loader/patch',
		"webpack/hot/only-dev-server",
		"webpack-dev-server/client?http://localhost:7700/",
		__dirname + '/../client/index.js',
	],
	devtool: 'inline-source-map',
	output: {
		path: __dirname + '/../public',
		filename: "js/bundle.js",
		publicPath: '/'
	},
	module: {
		loaders: [
			{
				test: /.jsx?$/,
				loader: 'babel-loader',
				exclude: /node_modules/,
			},
			{
				test: /\.css$/,
				use: [
					'style-loader',
					{
						loader: 'css-loader',
						options: {
							modules: true,
							importLoaders: 1,
							localIdentName: "[local]__[hash:base64:5]",
							minimize: false
						}
					},
				]
			},
			{
				test: /\.scss$/,
				loaders: ['style-loader', 'css-loader', 'sass-loader']
			}
		]
	},
	devServer: {
		publicPath: "http://127.0.0.1:7700",
		//contentBase: path.join(__dirname, "./../build"),
		hot: true,
		inline: true,
		historyApiFallback: true,
		quiet: true,
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: './client/index.html',
			inject: "body"
		}),
		new webpack.HotModuleReplacementPlugin(),
		new webpack.LoaderOptionsPlugin(),
		new webpack.LoaderOptionsPlugin({
			options: {
				// postcss: [
				// 	autoprefixer(),
				// ]
			}
		})
	]
};