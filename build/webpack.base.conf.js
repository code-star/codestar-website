const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer');
const ThumbnailWebpackPlugin = require('thumbnail-webpack-plugin');
const BannerWebpackPlugin = require('banner-webpack-plugin');

const pkg = require('../package.json');

module.exports = {
  entry: {
    app: './app/main.js',
    sw: './app/sw.js'
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
    alias: {
      'app': path.resolve(__dirname, '../app')
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          {
            loader: 'babel-loader',
            query: {
              compact: false
            }
          },
          {
            loader: 'eslint-loader',
            options: {
              formatter: require('eslint-friendly-formatter')
            }
          }
        ],
        exclude: /node_modules/,
        exclude: /app\/vendor/
      },
      { test: /\.pug$/, loader: 'pug-loader' },
      { test: /\.json$/, loader: 'json-loader' },
      {
        test: /\.(png|jpg|jpeg|gif|svg|otf|woff(2)?|eot|ttf)$/,
        loader: 'url-loader',
        query: {
          limit: 100,
          name: '[name].[ext]?[hash]'
        }
      },
      {
         test:   /jquery\..*\.js/,
         loader: 'imports-loader?$=jquery,jQuery=jquery,this=>window'
      },
      { test: /vendor\/.+\.(jsx|js)$/,
        loader: 'imports-loader?jQuery=jquery,$=jquery,this=>window'
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract({
          use: [
            'css-loader',
            'postcss-loader',
            'sass-loader'
          ]
        })
      }
    ]
  },
  plugins: [
    //new ThumbnailWebpackPlugin(thumbnailConfigs),
    new BannerWebpackPlugin({
      chunks: {
        'app': {
          beforeContent: `/* version ${pkg.version} */`
        }
      }
    })
  ]
};
