require('./js/dynamicRequire');
require('./stylesheets/main.scss');
require('jquery');

// Our "fork" contains both the united-gallery.js file and the theme appended
// Also do a diff when upgrading as we made some small changes in the non-theme code
require('./vendor/unitegallery');


import * as d3 from './libs/d3';
import PointerEventsPolyfill from './libs/pointer_events_polyfill';
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
import currentBrowser from './js/browserChecker';
import { JobList } from './js/JobList';
import { FullPage } from './js/FullPage';
import { Decorations } from './js/Decorations';
import { ContactForm } from './js/ContactForm';

let jobList = new JobList();
let contactForm = new ContactForm();
let decorations = new Decorations();
let fullPage = new FullPage();
let features = getFeatures();
let teamtree = getTeamTree();
let casestree = getCasesTree();
let gradients = getGradients();
let backgrounds = gradients.backgrounds;
let filters = gradients.filters;

$(document).ready(function() {
  $('#featureList').append(features);
  $('#solararray').append(getArray(7));
  $('#teamTree').append(teamtree.svg);
  $('#casesTree').append(casestree.svg);
  $('#sunburst').append(getSunburst());

  decorations.closeMenuIfOpen();
  decorations.applyWhiteLineFix(backgrounds);
  decorations.addQueueExtension();
  decorations.addCallToActionClickListeners();
  decorations.addMenuClickListener();
  decorations.removeTabIndexFromPage();
  if(isMobile.any()) {
      decorations.closeMenuIfOpen();
  }

  fullPage.initialize();
  fullPage.addListeners(teamtree, casestree);
  fullPage.addPixelBackground();

  // On desktop safari, disable the trees when not on the slide itself because of performance problems
  if(currentBrowser.isSafari() && !isMobile.iOS()){
    fullPage.hideGraphsOnSafari();
    fullPage.hideGraph('#casesTree')
    fullPage.hideGraph('#teamTree')
  }

  contactForm.bindValidationToForm();
  contactForm.addClickListeners();

  jobList.addJobListItemsClickEvent();
  jobList.showCorrectCloseButton();

  // Expand rabobank case
  d3.select('#caserabobank').each(function(d,i) {
    d3.select(this).on('click').apply(this, [d,i])
  });

  PointerEventsPolyfill.initialize({
    selector: '.noMouse, #map'
  });

  $('#gallery').unitegallery({
    tiles_type:'nested'
  });
  $('#gallery-launchevent').unitegallery({
    tiles_type:'nested'
  });

  $('#gallery-video').unitegallery({
	  gallery_theme: 'video',
      theme_skin: 'right-no-thumb'
  });

  $('#gallery-akkathon').unitegallery({
		tiles_type: 'nested'
  });

  // Put the default slides right and move to the center slide
  var hash = window.location.hash.replace('#', '').split('/');
  var section = (hash[0] === '' || typeof hash[0] == 'undefined') ? 'center' : hash[0];
  var slide = hash[1];

  // Put the correct starting slides. If we do this with slide sets there seems to be a Fullpage bug which doesn't let it move
  if(section !== 'team') {
    $.fn.fullpage.silentMoveTo(2, 'teamGraph');
  }

  $.fn.fullpage.silentMoveTo(section, slide);
});
