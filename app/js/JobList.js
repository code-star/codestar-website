import SlidePanel from './SlidePanel';

export class JobList {
  constructor() {
    JobList.initEvents();
  }

  static initEvents() {
    const jobItemNodes = $('ul.job_list_items a');
    const closeButtonNode = $('.job_openings .close-button');

    jobItemNodes.click(JobList.jobItemClicked);
    closeButtonNode.click(() => {
      SlidePanel.hideJobOfferPanel();
      JobList.deselectJobItems();
    });
  }

  static jobItemClicked(event) {
    event.preventDefault();

    const jobName = $(event.currentTarget).attr('name');

    SlidePanel.showJobOfferPanel(jobName);
    JobList.deselectJobItems();
    JobList.selectJobItem(jobName);
  }

  static selectJobItem(name) {
    $(`ul.job_list_items a[name=${name}]`).parent().addClass('active');
  }

  static deselectJobItems() {
    $('ul.job_list_items .active').removeClass('active')
  }
}
