const webpack = require('webpack');
const config = require('./webpack.base.conf');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

// eval-source-map is faster for development
config.devtool = 'cheap-module-eval-source-map';
// add hot-reload related code to entry chunk
config.entry.app = [
  config.entry.app,
  'webpack-hot-middleware/client'
];

// necessary for the html plugin to work properly
// when serving the html from in-memory
config.output.publicPath = '/';

config.plugins = (config.plugins || []).concat([
  new webpack.optimize.OccurrenceOrderPlugin(),
  new webpack.HotModuleReplacementPlugin(),
  new webpack.NoEmitOnErrorsPlugin(),
  new ExtractTextPlugin({
    filename: 'style.css',
    allChunks: true
  }),
  new HtmlWebpackPlugin({
    filename: 'index.html',
    template: 'app/index.pug',
    favicon: 'app/img/favicon.ico',
    inject: 'body'
  }),
  new HtmlWebpackPlugin({
    filename: 'index_en.html',
    template: 'app/index_en.pug',
    favicon: 'app/img/favicon.ico',
    inject: 'body'
  }),
  new HtmlWebpackPlugin({
    filename: 'kafka_training.html',
    template: 'app/kafka_training.pug'
  }),
  new webpack.ProvidePlugin({
    $: 'jquery',
    jQuery: 'jquery'
  })
]);

module.exports = config;
