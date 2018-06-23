var path = require('path');
var webpack = require('webpack');
var UglifyJSPlugin = require('uglifyjs-webpack-plugin');
var VueLoaderPlugin = require('vue-loader/lib/plugin');

module.exports = {
	entry: './js/app/init.js',
	output: {
		path: path.resolve(__dirname, './js/public'),
		publicPath: '/public/',
		filename: 'build.js'
	},
	plugins: [
		new VueLoaderPlugin()
	],
	module: {
		rules: [
			{
				test: /\.vue$/,
				loader: 'vue-loader',
				options: {
					mode: 'development'
					// other vue-loader options go here
				}
			},
			{
				test: /\.js$/,
				loader: 'babel-loader',
				exclude: /node_modules/
			},
			{
				test: /\.(png|jpg|gif|svg)$/,
				loader: 'file-loader',
				options: {
					name: '[name].[ext]?[hash]'
				}
			},
			{
			  test: /\.css$/,
			  use: [
				'vue-style-loader',
				'css-loader'
			  ]
			}
		]
	},
	resolve: {
		alias: {
			'vue$': 'vue/dist/vue.esm.js',
			'@': path.resolve(__dirname, 'js/app')
		}
	},
	devServer: {
		historyApiFallback: true,
		noInfo: true,
		overlay: true
	},
	performance: {
		hints: false
	},
	devtool: '#eval-source-map'
};

if (process.env.NODE_ENV === 'production') {
	module.exports.devtool = '#source-map';
	module.exports.mode = "production";
	// http://vue-loader.vuejs.org/en/workflow/production.html
	module.exports.plugins = (module.exports.plugins || []).concat([
		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: '"production"'
			}
		}),
		new UglifyJSPlugin(),
		new webpack.LoaderOptionsPlugin({
			minimize: true
		})
	]);
}

// test specific setups
if (process.env.NODE_ENV === 'test') {
	module.exports.mode = "production";
	module.exports.externals = [require('webpack-node-externals')()];
	module.exports.devtool = 'eval';
  }
