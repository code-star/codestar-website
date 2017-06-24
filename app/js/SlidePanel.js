import isMobile from './mobileChecker';

const smallScreen = () =>  isMobile.any() || Foundation.MediaQuery.current === 'small' || Foundation.MediaQuery.current === 'medium';

export default class SlidePanel {

  constructor($context, onCloseCallback) {
    this.$panelWrapper = $context.find('.panel-wrapper');
    this.$closeButton = this.$panelWrapper.find('.close-button');
    this.$closeButton.click(() => {
      this.hidePanel();
      onCloseCallback();
    });
  }

  // TODO find all occurrences of .job-text and extract
  // TODO try on another page (cases)
  // TODO extract template
  // TODO test on mobile/small screen

  showPanel(contentItemId) {
    if (smallScreen()) {
      $('#fixed-menu').hide(); // TODO convert to $fixedMenu, but not relative to $context
      $('.job-text').hide();
    }

    // TODO if the other things can be done with CSS, remove this
    // Must be relative to $context
    const $panelContainer = this.$panelWrapper.find('.panel-container');

    this.$panelWrapper
      .show()
      .removeClass('hide-on-mobile slide-in')
      .css('opacity', '1'); // TODO do with CSS

    // TODO do with CSS, .panel-container is relative to $panelWrapper, so no JS needed
    $panelContainer.css('transform', 'initial');
    $panelContainer.css('-webkit-transform', 'initial');

    this.loadContent(contentItemId);

    // TODO do with CSS
    // after panel is fully visible show close button
    setTimeout(()=> {
      this.$panelWrapper.find('.close-button').fadeIn();
    }, 800)
  }

  loadContent(contentItemId) {
    this.$panelWrapper.find('.panel-content-item').hide();
    $(`#${contentItemId}_content`).show();
  }

  hidePanel() {
    if (smallScreen()) {
      $('#fixed-menu').show();
      this.$panelWrapper.addClass('hide-on-mobile slide-in');
    }

    this.$panelWrapper.find('.panel-content-item').hide();

    this.$panelWrapper
      .hide()
      .addClass('hide-on-mobile slide-in')
      .removeAttr('style');

    // TODO if the other things can be done with CSS, remove this, else use $panelWrapperElem.find('x')
    const $panelContainer = $('.panel-wrapper .panel-container');
    $panelContainer.removeAttr('style');

    this.$closeButton.removeAttr('style');

    $('.job-text, #fixed-menu').removeAttr('style');
  }

}