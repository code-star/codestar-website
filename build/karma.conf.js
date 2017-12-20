process.env.CHROME_BIN = require('puppeteer').executablePath();
const webpackConfig = require('./webpack.dev.conf');

module.exports = function(config) {
    'use strict';

    config.set({
        basePath: '..',
        frameworks: ['jasmine'],
        files: [
            {pattern: 'test/*.spec.js', watched: false}
        ],
        browsers: ['ChromeHeadless'],
        singleRun: true,
        reporters: ['progress'],
        preprocessors: {
            'test/*.spec.js': ['webpack']
        },

        webpack: webpackConfig,

        webpackMiddleware: {
            stats: 'errors-only'
        }
    });
};
