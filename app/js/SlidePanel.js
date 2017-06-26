import isMobile from './mobileChecker';

const smallScreen = () =>  isMobile.any() || Foundation.MediaQuery.current === 'small' || Foundation.MediaQuery.current === 'medium';

export default class SlidePanel {

  constructor(onCloseCallback) {
    this.$panelWrapper = $('.panel-wrapper');
    this.$closeButton = this.$panelWrapper.find('.close-button');
    this.$closeButton.click(() => {
      this.hidePanel();
      onCloseCallback();
    });
  }

  showPanel(contentItemId) {
    if (smallScreen()) {
      $('#fixed-menu').hide();
      $('.job-text').hide();
    }

    // TODO if the other things can be done with CSS, remove this, else use $panelWrapperElem.find('x')
    const $panelContainer = $('.panel-wrapper .panel-container');

    this.$panelWrapper
      .show()
      .removeClass('hide-on-mobile slide-in')
      .css('opacity', '1'); // TODO do with CSS

    // TODO do with CSS
    $panelContainer.css('transform', 'initial');
    $panelContainer.css('-webkit-transform', 'initial');

    this.loadContent(contentItemId);

    // TODO do with CSS
    // after panel is fully visible show close button
    setTimeout(()=> {
      $('.panel-wrapper .close-button').fadeIn();
    }, 800)
  }

  loadContent(contentItemId) {
    this.$panelWrapper.find('.panel-content-item').hide();
    $(`#${contentItemId}_content`).show();
  }

  hidePanel() {
    if (smallScreen()) {
      $('#fixed-menu').show(); // TODO how to make this abstract?
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