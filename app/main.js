require('./stylesheets/main.scss');
import $ from 'jquery';
let Scrollax = require('scrollax');
let parallax = new Scrollax(window, {'horizontal': true}).init();
let mouseWheel = require('jquery-mousewheel');

$(document).ready(function(){
  window.scrollTo(($(document).width()-$(window).width())/2,0);
});

$(window).resize(function(e) {
    parallax.reload();
});
$('body').mousewheel(function(event, delta) {
  this.scrollLeft -= (delta * 30);
  event.preventDefault();
});
