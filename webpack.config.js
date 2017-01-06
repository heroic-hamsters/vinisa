const webpack = require('webpack');
const path = require('path');

module.exports = {
  entry: './client/src/index.js',

  devtool: 'inline-source-map',

  output: {
    path: path.join(__dirname, 'client', 'compiled'),
    filename: 'bundle.js'
  },

  watch: true,

  devServer: {
    historyApiFallback: true
  },

  module: {
    loaders: [
      {
        test: /\.jsx?/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.json$/, 
        loader: 'json-loader'
      }
    ],
    node: {
      fs: 'empty'
    }
  }
};

