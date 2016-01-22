require('./stylesheets/main.scss');
require('./img/logo-simple.svg');
require('./img/logo.svg');
require('./img/logo-simple.svg');
require('./fonts/ConduitITCStd.otf');
require('./fonts/ConduitITCStd-Bold.otf');
require('./fonts/ConduitITCStd-BoldItalic.otf');
require('./fonts/ConduitITCStd-Italic.otf');

import $ from 'jquery';
let Scrollax = require('scrollax');
let parallax = new Scrollax(window, {'horizontal': true}).init();
let mouseWheel = require('jquery-mousewheel');

$(document).ready(function(){
  var offset = $('#center').position().left;
  window.scrollTo(offset, 0);
  console.log($('#logo').find('#paren1').attr('d'));
  console.log($('#paren1').attr('d'));
});

$(window).resize(function(e) {
  parallax.reload();
});

$('html, body').mousewheel(function(event) {
  $('html, body').stop(true,true).animate({scrollLeft: '-='+event.deltaY},50);
  event.preventDefault();
});
