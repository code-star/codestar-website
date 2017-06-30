import SlidePanel from './SlidePanel';

// TODO the arrow pointing at the selected job is missing. Was there in the version of beginning of june

export default class JobList {
  constructor() {
    JobList.initEvents();
    function onCloseCallback() {
      JobList.deselectJobItems();
    }
    JobList.slidePanel = new SlidePanel($('.job-list'), onCloseCallback);
  }

  static initEvents() {
    const $jobItem = $('ul.job_list_items a');

    $jobItem.click(JobList.jobItemClicked);
  }

  static jobItemClicked(event) {
    event.preventDefault();

    const jobName = $(event.currentTarget).attr('name');

    JobList.slidePanel.showPanel(jobName);
    JobList.deselectJobItems();
    JobList.selectJobItem(jobName);
  }

  static selectJobItem(name) {
    $(`ul.job_list_items a[name=${name}]`)
      .parent().addClass('active');
  }

  static deselectJobItems() {
    $('ul.job_list_items .active').removeClass('active')
  }
}
