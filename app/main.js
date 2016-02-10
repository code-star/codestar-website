require('./stylesheets/main.scss');
require('jquery');
require('fullpage.js/jquery.fullPage.scss');
require('fullpage.js/jquery.fullPage');
require('./img/logo-simple.svg');
require('./img/logo-simple-menu.svg');
require('./img/logo-zwart-notext.png')
require('./img/asterisk.png')
require('./img/logo.svg');
require('./img/Mouse.svg');
require('./img/Features/Features_Curved_Lines.svg');
require('./img/Features/Features_SmallLines.svg');
require('./img/Features/Features_BigLines.svg');
require('./img/Contact/Contact_LocationIcon.svg');
require('./img/Contact/Contact_MailIcon.svg');
require('./img/Contact/Contact_PhoneIcon.svg');
require('./img/Clouds/Cloud01Crop.png');
require('./img/Clouds/Cloud02.png');
require('./img/Clouds/Cloud03Crop.png');
require('./img/Clouds/Cloud04Crop.png');
require('./img/Clouds/Cloud05.png');
require('./fonts/ConduitITCStd.otf');
require('./fonts/ConduitITCStd-Bold.otf');
require('./fonts/ConduitITCStd-BoldItalic.otf');
require('./fonts/ConduitITCStd-Italic.otf');

import d3 from 'd3';
import isMobile from './js/mobileChecker';
import { getSunburst } from './js/sunburst';
import { getTeamTree } from './js/team';
import { getCasesTree } from './js/cases';
import { getMoon } from './js/moon';
import { getSun } from './js/sun';
import { getArray } from './js/solararray';
import { getFeatures } from './js/features';
import { getGradients } from './js/backgrounds';
import Foundation from './libs/foundation';

const CONTACT_EMAIL_ADDRESS = 'martin.weidner@ordina.nl';

$(document).ready(function() {
  let features = getFeatures();
  $('#featureList').append(features);
  $('#solararray').append(getArray(7));
  let teamtree = getTeamTree()
  $('#teamTree').append(teamtree.svg);
  let casestree = getCasesTree();
  $('#casesTree').append(casestree.svg);
  $('#sunburst').append(getSunburst());

  function closeMenuIfOpen() {
    if ($('.fixed-menu .menu').css('display') !== 'none') {
      $('.fixed-menu .menu').fadeOut(350);
    }
  }

  let gradients = getGradients();
  let backgrounds = gradients.backgrounds;
  let filters = gradients.filters;
  $('.special').each((i, element) => {
    for (var j = 0; j < backgrounds.length; ++j) {
      $(element).css('background', backgrounds[i][j]);
      $(element).css('-webkit-transform', 'translate3d(0, 0, 0)'); // Safari fix for scrolling disappearances
      $(element).css('-webkit-padding-before', '2px'); // Webkit fix for the safari fix above adding a white line...
      $(element).css('-webkit-margin-after', '-2px'); // Webkit fix for the safari fix above adding a white line...
    }
    // IE 9- doesn't support the background-gradients, but a DirectX filter can be used instead
    //$(element).css('filter', filters[i])
  });

  let shown = false;

  var fpOnLeave = []

  // Initiate fullpage.js
  $('#fullpage').fullpage({
        menu: '.fixed-menu',
        anchors:['join', 'team', 'why-work', 'attract', 'center', 'difference', 'features', 'cases', 'contact'],
        scrollingSpeed: 1100,
        responsiveWidth: 900,
        responsiveHeight: 700,
        recordHistory: false,
        navigation: true,
        normalScrollElements: '.panel-container',
        onLeave: function(index, nextIndex, direction) {
            // Call all listeners
            fpOnLeave.forEach((f) => f(index,nextIndex,direction))
        }
  });

  // Close menu on slide transition
  fpOnLeave.push(function(index, nextIndex, direction) {
    closeMenuIfOpen();
  })

  fpOnLeave.push(function(index, nextIndex, direction) {
    if (!shown && nextIndex == 7) {
      shown = true;
      setTimeout(() => $('.featureIcon:first').trigger('click'), 1000);
    }
  })

  // Hide menu logo on center page
  fpOnLeave.push(function(index, nextIndex, direction) {
    if (nextIndex === 5) {
      $('.navigate-arrows').fadeIn(350);
      $('#menu-logo').fadeOut(350);
    } else {
      $('.navigate-arrows').fadeOut(350);
      $('#menu-logo').fadeIn(350);
    }
  })

  // Reset the team graph when entering its slide
  fpOnLeave.push(function(index, nextIndex, direction) {
    if(nextIndex == 2) {
      // Shuffle the nodes a bit
      teamtree.layout.nodes().forEach(function (n) {
        n.x = n.x + (Math.random() * 100 - 50)
        n.y = n.y + (Math.random() * 80 - 40)
      })
      teamtree.layout.resume()
    }
  })

  // Reset the cases graph when entering its slide
  fpOnLeave.push(function(index, nextIndex, direction) {
    if(nextIndex == 8) {
      // Shuffle the nodes a bit
      casestree.layout.nodes().forEach(function (n) {
        n.x = n.x + (Math.random() * 150 - 75)
        n.y = n.y + (Math.random() * 80 - 40)
      })
      casestree.layout.resume()
    }
  })

  // Disable tabs when not on contact page because of fullpage.js bug: https://github.com/alvarotrigo/fullPage.js/issues/1237
  fpOnLeave.push(function(index, nextIndex, direction) {
    if (nextIndex === 9) {
      $('#contact_form input, #contact_form select, #contact_form textarea, #contact_form button').removeAttr('tabindex')
    } else if (index === 9) {
      $('#contact_form input, #contact_form select, #contact_form textarea, #contact_form button').prop('tabIndex', -1);
    }
  })

  $('input, select, textarea, button, a').prop('tabIndex', -1);

  $('.job_list_items li a').click((event) => {
      event.preventDefault();
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

      $('.job_content').hide()
      $('#' + jobName + '_content').show()

      if(elementVisibility === 'visible' && parentOfClickedElement.hasClass('active')) {
        element.removeClass('is-visible');
        $('.job_openings').removeClass('hide-on-mobile');
        $('.job_list_items li').removeAttr('style');
      }
      else {
        element.addClass('is-visible');
        $('.job_openings').addClass('hide-on-mobile');
        parentOfClickedElement.addClass('active');
        $('.job_list_items li').removeAttr('style');
        parentOfClickedElement.css('background', 'rgba(59, 78, 110, 0.6)');
      }
  });

  $('.close-button, .close-button-mobile').click(() => {
    $('.profile').removeClass('is-visible');
    $('.job_openings').removeClass('hide-on-mobile');
    $('.job_list_items li').removeAttr('style');
  });

  $('.asterisk').click(() => $('.fixed-menu .menu').fadeToggle(350));
  $('#contact_form').foundation();

  $('#contact_form')
  .bind("submit", function(e) {
    e.preventDefault();
  })
  .bind("formvalid.zf.abide", function(e,$form) {
    let serializedForm = $form.serializeArray();
    let messageData = {};
    serializedForm.map(field => {
      messageData[field.name] = field.value;
    });

    $.ajax({
      url: "//formspree.io/"+CONTACT_EMAIL_ADDRESS,
      method: "POST",
      data: messageData,
      dataType: "json"
    }).done(() => {
      $('#contact_form').get(0).reset();
      $('.email-success').toggle('slow');
    }).fail(() => {
      $('.email-fail').toggle('slow');
    });
  });

  $('.email-success .close-button').click(() => {
    $('.email-success').toggle('slow');
  });
  $('.email-fail .close-button').click(() => {
    $('.email-fail').toggle('slow');
  });
  if(Foundation.MediaQuery.atLeast('medium') && !isMobile.any()) {
    $('.close-button-mobile').hide();
  }
  if(Foundation.MediaQuery.current === 'small' || isMobile.any()) {
    $('.close-button-mobile').show();
  }
  if(isMobile.any()) {
      closeMenuIfOpen();
  }
  if(isMobile.iOS()) {
    $(document.body).animate({
      'scrollTop':   $('#fifthPage').offset().top
    }, 100);
  }

  // Expand rabobank case
  d3.select('#caserabobank').each(function(d,i) {
    d3.select(this).on("click").apply(this, [d,i])
  })

  if(document.location.hostname == "localhost") {
    $('.debug').show()
  }

  var moon = getMoon(50);
  var sun = getSun(55);
  $('body').append(moon);
  $('body').append(sun);

  let sunPositions = {
    5: {"left": "calc(0% - 155px)", "top": "calc(-6% - 3 * 55px)"},
    6: {"left": "calc(10% - 155px)", "top" : "calc(20% - 3 * 55px)"},
    7: {"left": "calc(16.6% - 155px)", "top": "calc(46.6% - 155px)"},
    8: {"left": "calc(23.3% - 155px)", "top": "calc(73.3% - 155px)"},
    9: {"left": "calc(30% - 155px)", "top": "calc(100% - 155px)"}
  }

  let moonPositions = {
    5: {"right": "calc(0% - 155px)", "bottom" : "calc(5% - 155px)"},
    4: {"right": "calc(10% - 155px)", "bottom" : "calc(25% - 155px)"},
    3: {"right": "calc(20% - 155px)", "bottom": "calc(45% - 155px)"},
    2: {"right": "calc(30% - 155px)", "bottom": "calc(65% - 155px)"},
    1: {"right": "calc(40% - 155px)", "bottom": "calc(85% - 155px)"}
  }

  // Sun and moon control
  fpOnLeave.push(function(index, nextIndex, direction) {
    var sun = $('#sun')
    var moon = $('#moon')
    if(nextIndex > 5) {
      sun.fadeIn(350)
      $.each(sunPositions[nextIndex], function(k, v) {
        sun.css(k, v)
      })

    } else {
      sun.css("left", sunPositions[5].left)
      sun.css("top", sunPositions[5].top)
      sun.fadeOut(350)
    }
    if(nextIndex < 5) {
      moon.fadeIn(350)
      $.each(moonPositions[nextIndex], function(k, v) {
        moon.css(k, v)
      })
    } else {
      moon.css("right", moonPositions[5].right)
      moon.css("bottom", moonPositions[5].bottom)
      moon.fadeOut(350)
    }
  })


  /*function movePlanet(planet, x, property) {
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

    movePlanet(moon, 0.5, 'right');
    movePlanet(sun, 0.5, 'left');
  }*/
});

