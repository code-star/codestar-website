require('./stylesheets/main.scss');
require('jquery');
require('fullpage.js/jquery.fullPage.scss');
require('fullpage.js/jquery.fullPage');
require('./img/logo-simple.svg');
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
  $('#teamTree').append(getTeamTree());
  $('#casesTree').append(getCasesTree());
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

  // $('body').snapscroll();
  $('#fullpage').fullpage({
        menu: '.fixed-menu',
        anchors:['join', 'team', 'why-work', 'attract', 'center', 'difference', 'features', 'cases', 'contact'],
        scrollingSpeed: 1100,
        responsiveWidth: 900,
        recordHistory: false,
        navigation: true,
        normalScrollElements: '.panel-container',
        onLeave: function(index, nextIndex, direction) {
//            $('.special:eq(' + (nextIndex - 1) + ')').css('-webkit-transform', 'translate3d(0, 0, 0)');
//            $('.special:eq(' + (index - 1) + ')').css('-webkit-transform', 'none');
            if (!shown && nextIndex == 7) {
                shown = true;
                setTimeout(() => $('.featureIcon:first').trigger('click'), 1000);
            }

            if (nextIndex === 5) {
                $('.navigate-arrows').fadeIn(350);
            } else {
                $('.navigate-arrows').fadeOut(350);
            }

            // Disable tabs when not on contact page because of fullpage.js bug: https://github.com/alvarotrigo/fullPage.js/issues/1237
            if (nextIndex === 9) {
              $('#contact_form input, #contact_form select, #contact_form textarea, #contact_form button').removeAttr('tabindex')
            } else if(index === 9) {
              $('#contact_form input, #contact_form select, #contact_form textarea, #contact_form button').prop('tabIndex', -1);
            }
            
            closeMenuIfOpen();
        }
  });

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



});

