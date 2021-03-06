require('./js/dynamicRequire');
require('./stylesheets/main.scss');
require('jquery');

// Our "fork" contains both the united-gallery.js file and the theme appended
// Also do a diff when upgrading as we made some small changes in the non-theme code
require('./vendor/unitegallery');


import * as d3 from './vendor/d3';
import {GOOGLE_API_KEY, YOUTUBE_PLAYLIST_ID} from './js/constants';
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
import './libs/foundation';
import currentBrowser from './js/browserChecker';
import JobList from './js/JobList';
import VideoPlayer from './js/VideoPlayer';
import { FullPage } from './js/FullPage';
import { Decorations } from './js/Decorations';
import { ContactForm } from './js/ContactForm';
import Menu from './js/Menu';
import { trackUser } from './js/google.analytics';

const jobList = new JobList();
const videoPlayer = new VideoPlayer('#gallery-video', GOOGLE_API_KEY, YOUTUBE_PLAYLIST_ID);
const contactForm = new ContactForm();
const decorations = new Decorations();
const fullPage = new FullPage();
const features = getFeatures();
const teamtree = getTeamTree();
const casestree = getCasesTree();
const gradients = getGradients();
const backgrounds = gradients.backgrounds;
const filters = gradients.filters;
const menu = new Menu($('.asterisk'));

$(document).ready(function() {
  $('#featureList').append(features);
  $('#solararray').append(getArray(7));
  $('#teamTree').append(teamtree.svg);
  $('#casesTree').append(casestree.svg);
  $('#sunburst').append(getSunburst());

  menu.closeMenuIfOpen();
  decorations.applyWhiteLineFix(backgrounds);
  decorations.addQueueExtension();
  decorations.addCallToActionClickListeners();
  menu.addMenuClickListener();
  decorations.removeTabIndexFromPage();
  if(isMobile.any()) {
    menu.closeMenuIfOpen();
  }

  fullPage.initialize();
  fullPage.addListeners(teamtree, casestree);
  fullPage.addPixelBackground();

  // On desktop safari, disable the trees when not on the slide itself because of performance problems
  if(currentBrowser.isSafari() && !isMobile.iOS()){
    fullPage.hideGraphsOnSafari();
    fullPage.hideGraph('#casesTree');
    fullPage.hideGraph('#teamTree');
  }

  contactForm.bindValidationToForm();
  contactForm.addClickListeners();

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

  $('#gallery-akkathon').unitegallery({
		tiles_type: 'nested'
  });

  // Put the default slides right and move to the center slide
  const hash = window.location.hash.replace('#', '').split('/');
  const section = (hash[0] === '' || typeof hash[0] == 'undefined') ? 'center' : hash[0];
  const slide = hash[1];

  // Hide the sections, except the center section, until all sections are loaded
  $('.fullpage-wrapper > section.special').show();

  // Put the correct starting slides. If we do this with slide sets there seems to be a Fullpage bug which doesn't let it move
  if(section !== 'team') {
    $.fn.fullpage.silentMoveTo(2, 'teamGraph');
  }

  $.fn.fullpage.silentMoveTo(section, slide);

  if(section && section === 'join' && slide && JobList.isValidJobName(slide)) {
    const jobName = slide; // a[name]
    JobList.slidePanel.showPanel(jobName);
    JobList.deselectJobItems();
    JobList.selectJobItem(jobName);
  }

  trackUser();
});
