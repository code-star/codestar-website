var path = require('path')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var autoprefixer = require('autoprefixer');

module.exports = {
  entry: {
    app: './app/main.js',
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    publicPath: './',
    filename: '[name].js'
  },
  externals: {
    jQuery: 'jQuery',
    foundation: 'Foundation',
    unitegallery: ''
  },
  resolve: {
    extensions: ['', '.js',],
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
        loader: 'babel-loader',
        exclude: /node_modules/,
        exclude: /app\/vendor/,
      },
      { test: /\.pug$/, loader: 'pug' },
      { test: /\.json$/, loader: 'json' },
      {
        test: /\.(png|jpg|jpeg|gif|svg|otf|woff(2)?|eot|ttf)$/,
        loader: 'url',
        query: {
          limit: 100,
          name: '[name].[ext]?[hash]'
        }
      },
      {
         test:   /jquery\..*\.js/,
         loader: "imports?$=jquery,jQuery=jquery,this=>window"
      },
      { test: /vendor\/.+\.(jsx|js)$/,
        loader: 'imports?jQuery=jquery,$=jquery,this=>window'
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
