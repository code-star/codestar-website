require('./stylesheets/main.scss');
require('./img/logo.svg');
import $ from 'jquery';
let Scrollax = require('scrollax');
let parallax = new Scrollax(window, {'horizontal': true}).init();
let mouseWheel = require('jquery-mousewheel');

$(document).ready(function(){
  window.scrollTo(($(document).width()-$(window).width())/2,0);
  $('body').css('background-size', Math.max($(document).width(), $(window).width()) + 'px');
});

$(window).resize(function(e) {
    parallax.reload();
});

$('html, body').mousewheel(function(event) {
  $('html, body').stop(true,true).animate({scrollLeft: '-='+event.deltaY},50);
  event.preventDefault();
});
