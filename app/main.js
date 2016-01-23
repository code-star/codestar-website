require('./stylesheets/main.scss');
require('./img/logo-simple.svg');
require('./img/logo.svg');
require('./img/logo-simple.svg');
require('./img/sun.svg');
require('./fonts/ConduitITCStd.otf');
require('./fonts/ConduitITCStd-Bold.otf');
require('./fonts/ConduitITCStd-BoldItalic.otf');
require('./fonts/ConduitITCStd-Italic.otf');

import d3 from 'd3';
import { getSunburst } from './js/sunburst';
import { getTeamTree } from './js/team';
import { getMoon } from './js/moon';
import { retinaCanvas } from './js/retinaCanvas';
let Scrollax = require('scrollax');
let parallax = new Scrollax(window, {'horizontal': true}).init();
let mouseWheel = require('jquery-mousewheel');
let smoothscroll = require('jquery-smooth-scroll');

$(document).ready(function() {

  var offset = $('#center').position().left;
  window.scrollTo(offset, 0);

  $('#teamTree').append(getTeamTree());

  $('#sunburst').append(getSunburst());
  var rc = retinaCanvas(1600, 1600);
  var svg = getSunburst(true);
  svg.setAttribute('version', '1.1');
  svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
  svg.setAttribute('xmlns:xlink','http://www.w3.org/1999/xlink');
  var style = document.createElement('style');
  style.type = 'text/css';
  style.appendChild(document.createTextNode('path{stroke: rgba(255, 255, 255, 1.0); fill-rule: evenodd;}'));
  svg.insertBefore(style, svg.childNodes[0]);
//  var svgText = '<?xml version="1.0" standalone="no"?>\n<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">;\n' + svg.outerHTML;
//  console.log(svgText);

  $('body').append('<div id="tempSunburst">');
  $('#tempSunburst').append(svg);
  var src = 'data:image/svg+xml;base64,' + window.btoa($('#tempSunburst').html());
  var img = new Image();
  img.src = src;
  img.width = 1600;
  img.height = 1600;
  img.onload = () => rc.ctx.drawImage(img, 0, 0);
  $('#sunburst2').append(rc.canvas);

  var moon = getMoon(50);
  var sun = $('<img id="sun" src="sun.svg" width="200"/>');
  $('#center .decorations').append(moon);
  $('#center .decorations').append(sun);

  function movePlanet(planet, x, property) {
    if (x < 1.5) {
      // y is an inverted parabola
      // http://www.wolframalpha.com/input/?i=-%28x+-+0.5%29%5E2+*+400+%2B+100
      var y = 100 - 400 * (x - 0.5) * (x - 0.5);
      // opacity is a triangle function peaking at a=1.0 when x=0.5
      var a = x > 0.5 ? 2 - 2*x : 2*x;
      if (y > 0) {
        planet.css('opacity', a);
        planet.css('top', 10 +  0.9 * (100 - y) + '%');
        planet.css(property, ((1 - x) * 480) + '%');
      }
    }
  }

  $(window).Scrollax({horizontal: true}, {
    scroll: function () {
      // move moon
      // x position from 0 to 1
      var base = $('#center').position().left + $(window).width();
      var x_moon= $('body').scrollLeft() / $('#center').position().left;
      var x_sun = 1 - ($('body').scrollLeft() + $(window).width() - base) / ($(document).width() - base);

      movePlanet(moon, x_moon, 'right');
      movePlanet(sun, x_sun, 'left');
    }
  }).init();

  console.log($('#logo').find('#paren1').attr('d'));
  console.log($('#paren1').attr('d'));
});

function closeMenuIfOpen() {
  if ($('.fixed-menu .menu').css('display') !== 'none') {
    $('.fixed-menu .menu').hide(350)
  }
}

$(window).resize(e => parallax.reload());

$('html, body').mousewheel(event => {
  var delta = event.deltaY - event.deltaX
  $('html, body').stop(true,true).animate({scrollLeft: '-='+delta},50);
  closeMenuIfOpen();
  event.preventDefault();
});
$('.fixed-menu .menu li a').on('click', (event) => {
    $('html, body').stop().animate({
        scrollLeft: $(event.currentTarget.hash).offset().left
    }, 1000);
    event.preventDefault();
});

$('.job_list_items li a').click(() => {
    let element = $('.profile');
    let elementVisibility = element.css('visibility');

    if(elementVisibility === 'visible') {
       element.css('visibility','hidden');
    }
    else {
       element.css('visibility', 'visible');
    }
});

$('.asterisk').click(() => $('.fixed-menu .menu').toggle(350));

$('.scroll-button').on('click', (event) => {
    event.preventDefault();
    closeMenuIfOpen();
    $('html, body').stop().animate({
        scrollLeft: $(event.currentTarget.hash).offset().left
    }, 1000);
});
