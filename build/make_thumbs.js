#!/usr/bin/env node
/* eslint-env node */

'use strict';

// Re-using config from webpack.base.conf.js as long as thumbnail-webpack-plugin has bugs

const config = require('./webpack.base.conf');
const thumb = require('node-thumbnail').thumb;

const thumbPromises = config.thumbnailConfigs.map(config => thumb(config));

console.log('Start generating thumbnails.');
Promise
  .all(thumbPromises)
  .then(() => {
    console.log('Finished generating thumbnails.');
  })
  .catch(err => {
    throw new Error('Failed to transform' + err);
  });