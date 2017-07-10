import isMobile from './mobileChecker';

const smallScreen = () =>  isMobile.any() || Foundation.MediaQuery.current === 'small' || Foundation.MediaQuery.current === 'medium';

/**
 * SlidePanel
 * @description Will slide in larger texts on a panel from the right.
 * @example
 *  CasesTree.slidePanel = new SlidePanel($('.cases-page'), ()=>{});
 *   $('.cases-page').on('click', '.open-panel', () => {
 *     CasesTree.slidePanel.showPanel('test');
 *   });
 *  Requires:
 *  * Something to open the panel (in the example above, something with class open-panel)
 *  * The pug template should have a last column like:
 *        .small-12.large-5.columns.slide-in.panel-wrapper.hide-on-mobile
 *          .panel-container.normalscroll
 *           .panel-content
 *             .close-button x
 *             #test_content.panel-content-item
 *               include:markdown-it cases/test.md
 *  * The SlidePanel constructor should be called with a class on the top level of the page.
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

  showPanel(contentItemId) {
    if (smallScreen()) {
      this.$fixedMenu.hide(); // TODO could be done by setting the fixedMenu behind the panel with CSS
      this.$xorPanelMobile.hide();
    } else {
      // TODO do with CSS
      // after panel is fully visible show close button
      setTimeout(()=> {
        this.$closeButton.fadeIn();
      }, 800)
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
  }

  loadContent(contentItemId) {
    this.$panelWrapper.find('.panel-content-item').hide();
    this.$panelWrapper.find(`#${contentItemId}_content`).show();
    this.$panelWrapper.find('.panel-content').scrollTop(0);
  }

  hidePanel() {
    if (smallScreen()) {
      this.$fixedMenu.show();
      this.$xorPanelMobile.show();
      this.$panelWrapper.addClass('hide-on-mobile slide-in');
    } else {
      this.$closeButton.hide();
    }

    this.$panelWrapper.find('.panel-content-item').hide();

    this.$panelWrapper
      .hide()
      .addClass('hide-on-mobile slide-in')
      .removeAttr('style');

    // TODO if the other things can be done with CSS, remove this, else use $panelWrapperElem.find('x')
    const $panelContainer = this.$panelWrapper.find('.panel-container');
    $panelContainer
      .hide();
    setTimeout(() => {
      $panelContainer.removeAttr('style');
    }, 500);
  }

}