var webpack = require('webpack')
var config = require('./webpack.base.conf')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var BowerWebpackPlugin = require('bower-webpack-plugin');

// eval-source-map is faster for development
config.devtool = 'cheap-module-eval-source-map'
// add hot-reload related code to entry chunk
config.entry.app = [
  config.entry.app,
  'webpack-hot-middleware/client'
]

// necessary for the html plugin to work properly
// when serving the html from in-memory
config.output.publicPath = '/';

config.plugins = (config.plugins || []).concat([
  new webpack.optimize.OccurenceOrderPlugin(),
  new webpack.HotModuleReplacementPlugin(),
  new webpack.NoErrorsPlugin(),
  new ExtractTextPlugin(
    'style.css', {
      allChunks: true
   }),
  new HtmlWebpackPlugin({
    filename: 'index.html',
    template: 'app/index.jade',
    inject: 'body'
  }),
  new HtmlWebpackPlugin({
    filename: 'redirect_confluent_training.html',
    template: 'app/redirect_confluent_training.jade'
  }),
  new webpack.ProvidePlugin({
    $:      "jquery",
    jQuery: "jquery"
  })
])

module.exports = config
