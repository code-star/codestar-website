import isMobile from './mobileChecker';
export class JobList {
  addJobListItemsClickEvent() {
    $('.job_list_items li a').click((event) => {
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

      $('.job_content').hide()
      $('#' + jobName + '_content').show()

      if(elementVisibility === 'visible' && parentOfClickedElement.hasClass('active') || isMobile.any()) {
        $('.job_openings').removeClass('hide-on-mobile');
        $('.job_openings').removeClass('slide-in');
        $('.job_openings').css('opacity', '1');
        $('.job_openings .panel-container').css('transform', 'initial');
        $('.job_openings .panel-container').css('-webkit-transform', 'initial');
        $('.job-text').css('display', 'none')
      }
      else {
        element.addClass('is-visible');
        $('.job_openings').addClass('hide-on-mobile');
        parentOfClickedElement.addClass('active');
        $('.job_list_items li').removeAttr('style');
        parentOfClickedElement.css('background', 'rgba(59, 78, 110, 0.6)');
      }
    });
    $('.close-button, .close-button-mobile').click(() => {
      $('.profile').removeClass('is-visible');
      $('.job_openings').removeClass('hide-on-mobile');
      $('.job_list_items li').removeAttr('style');
    });
  }

  showCorrectCloseButton() {
    if(Foundation.MediaQuery.atLeast('medium') && !isMobile.any()) {
      $('.close-button-mobile').hide();
    }
    if(Foundation.MediaQuery.current === 'small' || isMobile.any()) {
      $('.close-button-mobile').show();
    }
  }
}
