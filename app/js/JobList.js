import isMobile from './mobileChecker';
export class JobList {
  hideContent() {
    $('.profile').removeClass('is-visible');
    $('.job_openings').removeClass('hide-on-mobile');
    $('.job_openings').removeAttr('style');
    $('.job_list_items li').removeAttr('style');
    $('.job-text').removeAttr('style');
    $('.job_list_items .active').removeClass('active')
  }

  jobOfferClicked(event) {
    this.hideContent();

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

    //$('.job_content').hide()
    $('#' + jobName + '_content').show();

    if(elementVisibility === 'visible' && parentOfClickedElement.hasClass('active') || isMobile.any()) {
      $('.job_openings').removeClass('hide-on-mobile');
      $('.job_openings').removeClass('slide-in');
      $('.job_openings').css('opacity', '1');
      $('.job_openings .panel-container').css('transform', 'initial');
      $('.job_openings .panel-container').css('-webkit-transform', 'initial');
      $('.job-text').hide();

      if (isMobile.any()) {
        $('#fixed-menu').hide()
      }
    }
    else {
      element.addClass('is-visible');
      $('.job_openings').addClass('hide-on-mobile');
      parentOfClickedElement.addClass('active');
      $('.job_list_items li').removeAttr('style');
      parentOfClickedElement.css('background', 'rgba(59, 78, 110, 0.6)');

      $('#fixed-menu').removeAttr('style')
    }
  }

  addJobListItemsClickEvent() {
    // job offer clicked
    $('.job_list_items li a').click(e => this.jobOfferClicked(e));

    // close button clicked
    $('.close-button, .close-button-mobile').click(this.hideContent);
  }

  showCorrectCloseButton() {
    if(Foundation.MediaQuery.atLeast('medium') && !isMobile.any()) {
      $('.close-button').show();
      $('.close-button-mobile').hide();
    }
    if(Foundation.MediaQuery.current === 'small' || isMobile.any()) {
      $('.close-button').hide();
      $('.close-button-mobile').show();
    }
  }
}
