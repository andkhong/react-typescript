const path = require('path');
const { DefinePlugin, HotModuleReplacementPlugin } = require('webpack');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'development',
  output: {
    filename: '[name].js',
    chunkFilename: '[name].js',
  },
  devServer: {
    contentBase: path.join(__dirname, '..', 'dist'),
    compress: true,
    open: true,
    port: 9000
  },
  watchOptions: {
    ignored: /node_modules/,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, '..', 'development.html'),
    }),
    new DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development'),
      },
    }),
    new HotModuleReplacementPlugin(),
    new HardSourceWebpackPlugin(),
    new BundleAnalyzerPlugin(),
  ],
});