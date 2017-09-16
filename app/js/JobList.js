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
    const $jobItem = $('ul.job_list_items a, a.job-item-link');

    $jobItem.click(JobList.jobItemClicked);
  }

  // Checks if the job name exists, for use in main.js
  static isValidJobName(jobName) {
    // Array.from would be better, but not certain if this is supported
    const jobNames = Array.prototype.slice.call(document.querySelectorAll('ul.job_list_items a')).map(i => i.name);
    return jobNames && jobNames.indexOf(jobName) > -1;
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
