require('./stylesheets/main.scss');
require('./img/logo-simple.svg');
require('./img/logo.svg');
require('./img/logo-simple.svg');
require('./fonts/ConduitITCStd.otf');
require('./fonts/ConduitITCStd-Bold.otf');
require('./fonts/ConduitITCStd-BoldItalic.otf');
require('./fonts/ConduitITCStd-Italic.otf');

import $ from 'jquery';
import d3 from 'd3';
import { appendSunburst } from './js/sunburst';
import { getMoon } from './js/moon';
let Scrollax = require('scrollax');
let parallax = new Scrollax(window, {'horizontal': true}).init();
let mouseWheel = require('jquery-mousewheel');

$(document).ready(function() {
  var offset = $('#center').position().left;
  window.scrollTo(offset, 0);

  appendSunburst('#sunburst');

  var moon = getMoon(60);
  $('#center .decorations').append(moon);
  $(window).Scrollax({horizontal: true}, {
    scroll: function () {
      // x position from 0 to 1
      var x = $('body').scrollLeft() / $('#center').position().left;
      if (x < 1) {
        // y is an inverted parabola
        // http://www.wolframalpha.com/input/?i=-%28x+-+0.5%29%5E2+*+400+%2B+100
        var y = 100 - 400 * (x - 0.5) * (x - 0.5);
        // opacity is a triangle function peaking at a=1.0 when x=0.5
        var a = x > 0.5 ? 2 - 2*x : 2*x;
        moon.css('opacity', a);
        moon.css('top', 10 +  0.9 * (100 - y) + '%');
        moon.css('right', ((1 - x) * 480) + '%' );
      }
    }
  }).init();

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
