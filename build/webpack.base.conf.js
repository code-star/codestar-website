const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer');
const ThumbnailWebpackPlugin = require('thumbnail-webpack-plugin');

function getThumbnailConfigs(srcPath) {
  return {
    source: srcPath,
    destination: srcPath + '/thumbs',
    prefix: 'thumb_',
    suffix: '',
    width: '400',
    ignore: true // ignore unsupported files, e.g. .gitignore
  };
}

const thumbnailConfigs = [
    './app/img/gallery',
    './app/img/galleryLaunchEvent',
    './app/img/galleryAkkathon'
  ]
  .map(getThumbnailConfigs);

module.exports = {
  entry: {
    app: './app/main.js',
  },
  output: {
    path: path.resolve(__dirname, '../dist/static'),
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
      { test: /\.jade$/, loader: 'jade' },
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
         loader: 'imports?$=jquery,jQuery=jquery,this=>window'
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
  eslint: {
    formatter: require('eslint-friendly-formatter')
  },
  /*plugins: [
    new ThumbnailWebpackPlugin(thumbnailConfigs)
  ]*/
  thumbnailConfigs
};
