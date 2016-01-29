require('./stylesheets/main.scss');
require('jquery');
require('fullpage.js/jquery.fullPage.scss');
require('fullpage.js/jquery.fullPage');
require('./img/logo-simple.svg');
require('./img/logo.svg');
require('./img/logo-simple.svg');
require('./img/Mouse.svg');
require('./img/Features/Features_Curved_Lines.svg');
require('./img/Features/Features_SmallLines.svg');
require('./img/Features/Features_BigLines.svg');
require('./img/Contact/Contact_LocationIcon.svg');
require('./img/Contact/Contact_MailIcon.svg');
require('./img/Contact/Contact_PhoneIcon.svg');
require('./fonts/ConduitITCStd.otf');
require('./fonts/ConduitITCStd-Bold.otf');
require('./fonts/ConduitITCStd-BoldItalic.otf');
require('./fonts/ConduitITCStd-Italic.otf');

import d3 from 'd3';
import { getSunburst } from './js/sunburst';
import { getTeamTree } from './js/team';
import { getCasesTree } from './js/cases';
import { getMoon } from './js/moon';
import { getSun } from './js/sun';
import { getArray } from './js/solararray';
import { getFeatures } from './js/features';
import { getBackgrounds } from './js/backgrounds';
//import { retinaCanvas } from './js/retinaCanvas';
// let Scrollax = require('scrollax');
// let parallax = new Scrollax(window, {'horizontal': true}).init();
// let mouseWheel = require('jquery-mousewheel');

// require('./js/jquery.scroll_to.js');
// require('./js/jquery.snapscroll.js');

$(document).ready(function() {
  // var offset = $('#center').position().left;
  // window.scrollTo(offset, 0);

  var features = getFeatures();
  $('#featureList').append(features);

  $('#solararray').append(getArray(7));

  $('#teamTree').append(getTeamTree());
  $('#casesTree').append(getCasesTree());

  $('#sunburst').append(getSunburst());
//  var rc = retinaCanvas(1600, 1600);
//  var svg = getSunburst(true);
//  svg.setAttribute('version', '1.1');
//  svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
//  svg.setAttribute('xmlns:xlink','http://www.w3.org/1999/xlink');
//  var style = document.createElement('style');
//  style.type = 'text/css';
//  style.appendChild(document.createTextNode('path{stroke: rgba(255, 255, 255, 1.0); fill-rule: evenodd;}'));
//  svg.insertBefore(style, svg.childNodes[0]);
//  var svgText = '<?xml version="1.0" standalone="no"?>\n<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">;\n' + svg.outerHTML;
//  console.log(svgText);

//  $('body').append('<div id="tempSunburst">');
//  $('#tempSunburst').append(svg);
//  var src = 'data:image/svg+xml;base64,' + window.btoa($('#tempSunburst').html());
//  var img = new Image();
//  img.src = src;
//  img.width = 1600;
//  img.height = 1600;
//  img.onload = () => {
//    rc.ctx.drawImage(img, 0, 0);
//    $('#tempSunburst').remove();
//  }
//  $('#sunburst2').append(rc.canvas);

   var moon = getMoon(50);
   var sun = getSun(55);
   $('#center .decorations').append(moon);
   $('#center .decorations').append(sun);

  // function movePlanet(planet, x, property) {
  //   if (x < 1.5) {
  //     // y is an inverted parabola
  //     // http://www.wolframalpha.com/input/?i=-%28x+-+0.5%29%5E2+*+400+%2B+100
  //     var y = 100 - 400 * (x - 0.5) * (x - 0.5);
  //     // opacity is a triangle function peaking at a=1.0 when x=0.5
  //     var a = x > 0.5 ? 2 - 2*x : 2*x;
  //     if (y > 0) {
  //       planet.css('opacity', a);
  //       planet.css('top', 10 +  0.9 * (100 - y) + '%');
  //       planet.css(property, ((1 - x) * 480) + '%');
  //     }
  //   }
  // }

  // $(window).Scrollax({horizontal: true}, {
  //   scroll: function () {
  //     var scroll = $(window).scrollLeft();
  //     // move moon
  //     // x position from 0 to 1
  //     var base = $('#center').offset().left + $(window).width();
  //     var x_moon = scroll / $('#center').offset().left;
  //     var x_sun = 1 - (scroll + $(window).width() - base) / ($(document).width() - base);
  //
  //     movePlanet(moon, x_moon, 'right');
  //     movePlanet(sun, x_sun, 'left');
  //   }
  // }).init();

  function closeMenuIfOpen() {
    if ($('.fixed-menu .menu').css('display') !== 'none') {
      $('.fixed-menu .menu').hide(350)
    }
  }

  var backgrounds = getBackgrounds();
  $('.special').each((i, element) => {
    for (var j = 0; j < backgrounds.length; ++j) {
      $(element).css('background', backgrounds[i][j]);
      $(element).css('-webkit-transform', 'translate3d(0, 0, 0)'); // Safari fix for scrolling disappearances
    }
  });

  // $('body').snapscroll();
  $('#fullpage').fullpage({
        menu: '.fixed-menu',
        anchors:['join', 'team', 'why-work', 'attract', 'center', 'difference', 'features', 'cases', 'contact'],
        scrollingSpeed: 1100,

        onLeave: function(index, nextIndex, direction) {
//            $('.special:eq(' + (nextIndex - 1) + ')').css('-webkit-transform', 'translate3d(0, 0, 0)');
//            $('.special:eq(' + (index - 1) + ')').css('-webkit-transform', 'none');
            closeMenuIfOpen();
        }
  });

  $('.job_list_items li a').click((event) => {
      let element = $('.profile');
      let elementVisibility = element.css('visibility');
      let arrow = $('.arrow-left');
      let parentOfClickedElement = $(event.currentTarget).parent();
      let positionOfClickedElement = $(event.currentTarget).position().top;
      let job_list_items = $('.job_list_items');
      let jobName = $(event.currentTarget).attr('name');
      if(job_list_items.find('.active').length > 0) {
        job_list_items.find('li').removeClass('active');
      }

      arrow.css('top', positionOfClickedElement + 5);
      let json = require('./data/'+jobName+'.json');

      let profile = [];
      let offer = [];

      $.each( json.profile, function( key, val ) {
        profile.push( "<li id='profile_" + key + "'>" + val + "</li>" );
      });

      $.each( json.offer, function( key, val ) {
        offer.push( "<li id='offer_" + key + "'>" + val + "</li>" );
      });

      let profileList = $( '<ul/>', {
        'class': 'simple vertical',
        html: profile.join( '' )
      });
      let offerList = $( '<ul/>', {
        'class': 'simple vertical',
        html: '<p>'+json.offer_intro+'</p>'+ offer.join('')
      });

      $('.profile-list').html(profileList);
      $('.offer-list').html(offerList);

      if(elementVisibility === 'visible' && parentOfClickedElement.hasClass('active')) {
         element.removeClass('is-visible');
         $('.job_list_items li').removeAttr('style');
      }
      else {
         element.addClass('is-visible');
         parentOfClickedElement.addClass('active');
         $('.job_list_items li').removeAttr('style');
         parentOfClickedElement.css('background', 'rgba(59, 78, 110, 0.6)');
      }
  });

  $('.close-button').click(() => {
    $('.profile').removeClass('is-visible');
    $('.job_list_items li').removeAttr('style');
  });

  $('.asterisk').click(() => $('.fixed-menu .menu').toggle(350));

});

// $(window).resize(e => parallax.reload());

// $('body').mousewheel(event => {
//   if(event.target && event.target.closest && event.target.closest('.profile') !== null) {
//     return;
//   }
//   // if($('body').scrollBottom() > 100) {
//   //   $('.job_list_items li').removeAttr('style');
//   //   $('.profile').removeClass('is-visible');
//   // }
//
//   // var delta = event.deltaY - event.deltaX;
//   // if (Math.abs(delta) < 12) delta = delta < 0 ? -12 : 12;
//   // $('html, body').stop(true,true).animate({scrollLeft: '-='+delta},50);
//   closeMenuIfOpen();
//   event.preventDefault();
// });


// $('.fixed-menu .menu li a').on('click', (event) => {
//     $('html, body').stop().animate({
//         scrollLeft: $(event.currentTarget.hash).offset().left
//     }, 1000);
//     event.preventDefault();
// });

// $('.scroll-button').on('click', (event) => {
//     event.preventDefault();
//     closeMenuIfOpen();
//     $('html, body').stop().animate({
//         scrollLeft: $(event.currentTarget.hash).offset().left
//     }, 1000);
// });
