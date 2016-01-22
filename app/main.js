require('./stylesheets/main.scss');
require('./img/logo-simple.svg');
require('./img/logo.svg');
require('./img/logo-simple.svg');
require('./fonts/ConduitITCStd.otf');
require('./fonts/ConduitITCStd-Bold.otf');
require('./fonts/ConduitITCStd-BoldItalic.otf');
require('./fonts/ConduitITCStd-Italic.otf');

import d3 from 'd3';
import { appendSunburst } from './js/sunburst';
let Scrollax = require('scrollax');
let parallax = new Scrollax(window, {'horizontal': true}).init();
let mouseWheel = require('jquery-mousewheel');
let smoothscroll = require('jquery-smooth-scroll');

$(document).ready(function(){
  var offset = $('#center').position().left;
  window.scrollTo(offset, 0);
  appendSunburst('#sunburst');

    $(window).resize(e => parallax.reload());

    $('html, body').mousewheel(event => {
      $('html, body').stop(true,true).animate({scrollLeft: '-='+event.deltaY},50);
      event.preventDefault();
    });

    $('.asterisk').click(() => $('.fixed-menu .menu').toggle(350));

    $('.fixed-menu .menu li a').on('click', (event) => {
        $('html, body').stop().animate({
            scrollLeft: $(event.currentTarget.hash).offset().left
        }, 1000);
        event.preventDefault();
    });

});
