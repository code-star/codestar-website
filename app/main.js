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
require('./img/Logos/akka.png');
require('./img/Logos/scala.png');
require('./img/Logos/spark.png');
require('./img/Logos/spray.png');
require('./img/Logos/typescript.png');
require('./img/Logos/docker.png');
require('./img/Logos/mesos.png');
require('./img/Logos/aws.png');
require('./img/Logos/cassandra.png');
require('./img/Logos/kafka.png');
require('./fonts/ConduitITCStd.otf');
require('./fonts/ConduitITCStd-Bold.otf');
require('./fonts/ConduitITCStd-BoldItalic.otf');
require('./fonts/ConduitITCStd-Italic.otf');

import d3 from 'd3';
import PointerEventsPolyfill from './libs/pointer_events_polyfill'
import isMobile from './js/mobileChecker';
import { getSunburst } from './js/sunburst';
import { getTeamTree } from './js/team';
import { getCasesTree } from './js/cases';
import { initiateSunMoon } from './js/sunmoon';
import { getArray } from './js/solararray';
import { getFeatures } from './js/features';
import { getGradients } from './js/backgrounds';
import Foundation from './libs/foundation';
import { getPixel } from './js/pixelbg';
import currentBrowser from './js/browserChecker';

const CONTACT_EMAIL_ADDRESS = 'codestar@ordina.nl';

// Queue CSS function to work with .delay().
// Example: $('p').delay(500).qss({'color': 'red'})
// Source: http://stackoverflow.com/a/35057342/572635
$.fn.extend({
  qcss: function(css) {
    return $(this).queue(function(next) {
      $(this).css(css);
      next();
    });
  }
});

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
  var fpAfterLoad = []

  // Initiate fullpage.js
  $('#fullpage').fullpage({
        menu: '.fixed-menu',
        anchors: ['join', 'team', 'why-work', 'attract', 'center', 'difference', 'features', 'cases', 'contact'],
        scrollingSpeed: 1100,
        responsiveWidth: 900,
        responsiveHeight: 700,
        recordHistory: false,
        navigation: true,
        normalScrollElements: '.panel-container',
        onLeave: function(index, nextIndex, direction) {
            // Call all listeners
            fpOnLeave.forEach(f => f(index,nextIndex,direction))
        },
        afterLoad: (anchor, index) => {
          fpAfterLoad.forEach(f => f(anchor, index))
        }
  });
  let centerpage = 5;

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
    if (nextIndex === centerpage) {
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

  // On desktop safari, disable the trees when not on the slide itself because of performance problems
  if(currentBrowser.isSafari() && !isMobile.iOS()){
    let graphFadeSpeed = 350

    // Warning: do not use display: none, because this removes the node images when setting display: block again
    function hideGraph(id) {
      let graph = $(id)
      graph.delay(graphFadeSpeed).qcss({'visibility': 'hidden'})
      graph.fadeTo(graphFadeSpeed, 0)
    }
    fpOnLeave.push((i, ni, dir) => {
      if(i == 2) {
        hideGraph('#teamTree')
      }
      if(i == 8) {
        hideGraph('#casesTree')
      }
    });

    hideGraph('#casesTree')
    hideGraph('#teamTree')

    fpAfterLoad.push((anchor, i) => {
      switch(anchor) {
        case "cases":
          $('#casesTree').css('visibility', 'visible')
          $('#casesTree').fadeTo(graphFadeSpeed, 1)
          break;
        case "team":
          $('#teamTree').css('visibility', 'visible')
          $('#teamTree').fadeTo(graphFadeSpeed, 1)
          break;
      }
    })
  }

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

  $('.navigate-up').click(() => {
    $.fn.fullpage.moveSectionUp()
  })
  $('.navigate-down').click(() => {
    $.fn.fullpage.moveSectionDown()
  })

  // "Pixel" backgrounds
  var pixelBgInterval = null


  // Set an interval for generating pixels
  fpOnLeave.push((i,ni,dir) => {
    if(ni == 4) {
      pixelBgInterval = setInterval(() => {
        // nonzero hance to generate a pixel
        if(Math.random() < 0.7) {
          $('body').append(getPixel())
        }
      }, 200)
    } else {
      if(pixelBgInterval !== null) {
        clearInterval(pixelBgInterval)
      }
      // Fadeout and remove all existing pixels
      $('.bgPixel')
        // Stop existing blinking
        .stop()
        .fadeOut(300,
          function() { $(this).remove() }
        )
    }
  })

  fpOnLeave.push(initiateSunMoon(centerpage).fpOnLeave)

  PointerEventsPolyfill.initialize({
    selector: '.noMouse, #map'
  });
});
