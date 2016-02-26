require('./js/dynamicRequire');
require('./stylesheets/main.scss');
require('jquery');

import d3 from 'd3';
import PointerEventsPolyfill from './libs/pointer_events_polyfill'
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
    d3.select(this).on("click").apply(this, [d,i])
  });

  PointerEventsPolyfill.initialize({
    selector: '.noMouse, #map'
  });
});
