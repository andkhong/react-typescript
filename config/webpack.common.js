const path = require('path');

const root = path.resolve(__dirname, '..', 'src');
const nodeModules = path.resolve(__dirname, '..', 'node_modules');

module.exports = {
  entry: {
    index: `${root}/index.tsx`,
    vendor: [
      'react',
      'react-dom'
    ],
  },
  output: {
    path: path.resolve(__dirname, '..', 'dist'),
    pathinfo: false,
    publicPath: '/',
  },
  resolve: {
    alias: {
      config: `${root}/config`,
      components: `${root}/components`,
    },
    extensions: ['.tsx', '.ts', '.js', '.json'],
    modules: [root, nodeModules],
    symlinks: false,
  },
  optimization: {
    runtimeChunk: {
      name: 'manifest',
    },
    splitChunks: {
      cacheGroups: {
        default: false,
        commons: {
          test: nodeModules,
          chunks: 'all',
          name: 'vendor',
          minChunks: 2,
          minSize: 1,
        },
      },
    },
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        include: root,
        exclude: nodeModules,
        loader: 'babel-loader',
      },
      {
        test: /\.(ts|tsx)$/,
        include: root,
        exclude: nodeModules,
        loader: ['babel-loader', 'awesome-typescript-loader'],
      },
    ],
  },
};