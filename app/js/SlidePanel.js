import isMobile from './mobileChecker';

const smallScreen = () =>  isMobile.any() || Foundation.MediaQuery.current === 'small' || Foundation.MediaQuery.current === 'medium';

export default class SlidePanel {

  static showJobOfferPanel(name) {
    if (smallScreen()) {
      $('#fixed-menu').hide();
      $('.job-text').hide();
    }

    const jobOpeningsNode = $('.job_openings');
    const jobPanelNode = $('.job_openings .panel-container');

    jobOpeningsNode.show();
    jobOpeningsNode.removeClass('hide-on-mobile slide-in');
    jobOpeningsNode.css('opacity', '1');

    jobPanelNode.css('transform', 'initial');
    jobPanelNode.css('-webkit-transform', 'initial');

    SlidePanel.hideJobOffersContent();
    SlidePanel.showJobOfferContent(name);

    // after panel is fully visible show close button
    setTimeout(()=> {
      $('.job_openings .close-button').fadeIn();
    }, 800)
  }

  static hideJobOfferPanel() {
    if (smallScreen()) {
      $('#fixed-menu').show();
      $('.job_openings').addClass('hide-on-mobile slide-in');
    }

    $('.job_content').hide();
    $('.job-text, .job_openings, .job_openings .panel-container, #fixed-menu, .job_openings .close-button').removeAttr('style');

    //JobList.deselectJobItems();
  }

  static showJobOfferContent(name) {
    $(`#${name}_content`).show();
  }

  static hideJobOffersContent() {
    $('.job_content').hide();
  }

}