const path = require('path');
const { DefinePlugin, HotModuleReplacementPlugin } = require('webpack');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

const common = require('./webpack.common.js');
const { DEVELOPMENT } = require('./settings');

module.exports = merge(common, {
  mode: 'development',
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
    new DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development'),
        SETTINGS: JSON.stringify(DEVELOPMENT)
      },
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, '..', 'templates', 'development.html'),
    }),
    new HotModuleReplacementPlugin(),
    new HardSourceWebpackPlugin(),
    new BundleAnalyzerPlugin(),
  ],
});