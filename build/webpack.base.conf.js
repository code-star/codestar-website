var path = require('path')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var autoprefixer = require('autoprefixer');

module.exports = {
  entry: {
    app: './app/main.js'
  },
  output: {
    path: path.resolve(__dirname, '../dist/static'),
    publicPath: './',
    filename: '[name].js'
  },
  resolve: {
    extensions: ['', '.js',],
    root: [path.join(__dirname, "bower_components")],
    alias: {
      'app': path.resolve(__dirname, '../app')
    }
  },
  resolveLoader: {
    root: path.join(__dirname, 'node_modules'),
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader!eslint',
        exclude: /node_modules/
      },
      {
        test: /\.json$/,
        loader: 'json'
      },
      {
        test: /\.(png|jpg|gif|svg|otf)$/,
        loader: 'url',
        query: {
          limit: 1000,
          name: '[name].[ext]?[hash]'
        }
      },
      {
            test:   /jquery\..*\.js/,
            loader: "imports?$=jquery,jQuery=jquery,this=>window"
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract('css!postcss-loader!sass')
      }
    ]
  },
  postcss: [ autoprefixer({ browsers: ['last 2 versions'] }) ],
  eslint: {
    formatter: require('eslint-friendly-formatter')
  }
}
