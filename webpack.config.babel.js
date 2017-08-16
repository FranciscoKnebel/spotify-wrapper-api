import { join } from 'path';
import webpack from 'webpack';
import dotenv from 'dotenv';

dotenv.config();
const include = join(__dirname, 'src');

export default {
	entry: './src/index',
	output: {
		path: join(__dirname, 'dist'),
		libraryTarget: 'umd',
		library: 'spotifyWrapper',
	},
	devtool: 'source-map',
	module: {
		loaders: [
			{
				test: /\.js$/,
				loader: 'babel-loader',
				include,
			},
		],
	},
	node: {
		fs: 'empty',
	},
	plugins: [
		new webpack.EnvironmentPlugin([
			'SPOTIFY_TOKEN',
		]),
	],
};
