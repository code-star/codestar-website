const webpack = require('webpack');
const config = require('./webpack.base.conf');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const path = require('path');

// naming output files with hashes for better caching.
// dist/index.html will be auto-generated with correct URLs.
config.output.filename = '[name].[chunkhash].js';
config.output.chunkFilename = '[id].[chunkhash].js';

// whether to generate source map for production files.
// disabling this can speed up the build.
const SOURCE_MAP = true;

config.devtool = SOURCE_MAP ? 'source-map' : false;

// generate loader string to be used with extract text plugin
function generateExtractLoaders (loaders) {
  return loaders.map(function (loader) {
    return loader + '-loader' + (SOURCE_MAP ? '?sourceMap' : '')
  }).join('!')
}
config.plugins = (config.plugins || []).concat([
  new CleanWebpackPlugin(['dist'], {root: path.dirname(__dirname, '/../dist')}),
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: '"production"'
    }
  }),
  new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: false
    }
  }),
  new webpack.optimize.OccurrenceOrderPlugin(),
  // extract css into its own file
  new ExtractTextPlugin('[name].[contenthash].css'),
  // generate dist index.html with correct asset hash for caching.
  // you can customize output by editing /build/index.template.html
  // see https://github.com/ampedandwired/html-webpack-plugin
  new HtmlWebpackPlugin({
    filename: 'index.html',
    template: 'app/index.pug',
    inject: 'body'
  }),
  new HtmlWebpackPlugin({
    filename: 'kafka_training.html',
    template: 'app/kafka_training.pug'
  }),
  // BowerWebpackPlugin does not work with Webpack 2. This needs to be done with resolving options: https://github.com/lpiepiora/bower-webpack-plugin/issues/39
  // new BowerWebpackPlugin({
  //   excludes: /.*\.less/
  // }),
  new webpack.ProvidePlugin({
    $:      'jquery',
    jQuery: 'jquery'
  })
]);

module.exports = config;
