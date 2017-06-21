/**
 * expects: ? with .slide-out-article-offset
 * ? is giving as $domContext to the constructor
 * expects button in ?? to which you should manually bind .toggle, e.g. with $('#caseDesc').on('click', '.toggleSlideOutArticle', ev => this.slideOutArticle.toggle());
 */
export default class SlideOutArticle {
  constructor($domContext) {
    this.$domContext = $domContext;
    this.$mainContent = $domContext.find('.slide-out-article-main'); //.slide-out-article-offset


    console.log('new SlideOutArticle', this.$domContext);
    // TODO create article container
    this.createDom();
    // TODO import the article content from a pug or json or js (with backticks) file?
    this.$container[0].innerHTML = `
    regel 1<br/>
    regel 2
    `;
    // TODO slide animation
    // on the sibling container in domContext: -> transition: 1s flex, 1s max-width and switch from large-12 to large-6
    // TODO bind to some button
  }

  createDom() {
    // const container = document.createElement('div');
    // //container.textContent = 'foobar'; TODO remove
    // container.setAttribute('class', 'large-6');
    // container.setAttribute('style', `
    //   background-color: white;
    //   width: 400px;
    //   height: 100vh;
    //   color: black;
    // `);
    // /*
    //  transition-property: transform;
    //  transition-duration: 0.3s;
    //  transition-delay: 0.3s;
    //  transform: translate3d(100%, 0, 0);
    //  */
    // this.container = container;
    // this.$domContext[0].append(container);

    this.$container = $('<div class="large-6 slide-out-article-side"></div>');
    /*
     transition-property: transform;
     transition-duration: 0.3s;
     transition-delay: 0.3s;
     transform: translate3d(100%, 0, 0);
     */
    this.$domContext.append(this.$container);

  }

  toggle() {
    console.log('toggle');
    if(this.$mainContent.is('.slide-out-article-offset')) {
      this.$mainContent.removeClass('slide-out-article-offset');
    } else {
      this.$mainContent.addClass('slide-out-article-offset');
    }
  }
}