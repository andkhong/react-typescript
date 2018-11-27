const path = require('path');
const { DefinePlugin } = require('webpack');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const common = require('./webpack.common.js');
const { PRODUCTION } = require('./settings');

module.exports = merge(common, {
  mode: 'production',
  output: {
    filename: '[name].[chunkhash].bundle.js',
    chunkFilename: '[name].[chunkhash].js'
  },
  plugins: [
    new DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
        SETTINGS: JSON.stringify(PRODUCTION)
      },
    }),
    new CleanWebpackPlugin('dist', {
      root: process.cwd(),
      verbose: true
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, '..', 'templates', 'production.html'),
      inject: 'body',
      cache: true,
      minify: {
        collapseWhitespace: true,
        collapseInlineTagWhitespace: true,
        removeComments: true,
        removeRedundantAttributes: true
      },
    }),
  ],
});