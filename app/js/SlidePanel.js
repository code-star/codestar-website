import isMobile from './mobileChecker';

const smallScreen = () =>  isMobile.any() || Foundation.MediaQuery.current === 'small' || Foundation.MediaQuery.current === 'medium';

/*
example for cases:

 cases.js
 // this.slideOutArticle = new SlideOutArticle($('#caseName').closest('section').find('.row').first());
 // $('#caseDesc').on('click', '.toggleSlideOutArticle', ev => this.slideOutArticle.toggle());

 cases.json
 <button class=\"toggleSlideOutArticle scroll-button button codestar-button\">Test</button>",
*/

/**
 * TODO documentation
 * //  * expects: ? with .slide-out-article-offset
 //  * ? is giving as $domContext to the constructor
 //  * expects button in ?? to which you should manually bind .toggle, e.g. with $('#caseDesc').on('click', '.toggleSlideOutArticle', ev => this.slideOutArticle.toggle());
 */
export default class SlidePanel {

  constructor($context, onCloseCallback) {
    this.$fixedMenu = $('#fixed-menu');
    this.$panelWrapper = $context.find('.panel-wrapper');
    // If the panel is open, hide this element on mobile. Usually the main content of the page
    this.$xorPanelMobile = $context.find('.xor-panel-mobile');
    this.$closeButton = this.$panelWrapper.find('.close-button');
    this.$closeButton.click(() => {
      this.hidePanel();
      onCloseCallback();
    });
  }

  // TODO test on mobile/small screen
  // TODO try on another page (cases)
  // TODO extract template

  showPanel(contentItemId) {
    if (smallScreen()) {
      this.$fixedMenu.hide(); // TODO could be done by setting the fixedMenu behind the panel with CSS
      this.$xorPanelMobile.hide();
    }

    this.$panelWrapper
      .show()
      .removeClass('hide-on-mobile slide-in')
      .css('opacity', '1'); // TODO do with CSS

    // TODO do with CSS, .panel-container is relative to $panelWrapper, so no JS needed
    // Must be relative to $context
    const $panelContainer = this.$panelWrapper.find('.panel-container');
    $panelContainer.css('transform', 'initial');
    $panelContainer.css('-webkit-transform', 'initial');

    this.loadContent(contentItemId);

    // TODO do with CSS
    // after panel is fully visible show close button
    setTimeout(()=> {
      this.$closeButton.fadeIn();
    }, 800)
  }

  loadContent(contentItemId) {
    this.$panelWrapper.find('.panel-content-item').hide();
    this.$panelWrapper.find(`#${contentItemId}_content`).show();
  }

  hidePanel() {
    if (smallScreen()) {
      this.$fixedMenu.show();
      this.$xorPanelMobile.show();
      this.$panelWrapper.addClass('hide-on-mobile slide-in');
    }

    this.$panelWrapper.find('.panel-content-item').hide();

    this.$panelWrapper
      .hide()
      .addClass('hide-on-mobile slide-in')
      .removeAttr('style');

    // TODO if the other things can be done with CSS, remove this, else use $panelWrapperElem.find('x')
    const $panelContainer = this.$panelWrapper.find('.panel-container');
    $panelContainer.removeAttr('style');

    this.$closeButton.hide();
  }

}