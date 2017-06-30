import { CONTACT_EMAIL_ADDRESS } from './constants';
export class ContactForm {

  constructor() {
    $('#contact_form').foundation();
  }

  bindValidationToForm() {
    var that = this; // No this context within the $() context.
    $('#contact_form')
      .on('submit', function(e) {
        e.preventDefault();
      })
      .on('formvalid.zf.abide', function(e,$form) {
        e.preventDefault();
        let messageData = that.createMessageData($form)
        that.submitForm(messageData);
      })
      .on('forminvalid.zf.abide', function(e, $form) {
        let messageData = this.createMessageData($form)
      });
  }

  submitForm(messageData) {
    $.ajax({
      url: '//formspree.io/'+CONTACT_EMAIL_ADDRESS,
      method: 'POST',
      data: messageData,
      dataType: 'json'
    }).done(() => {
      $('#contact_form').get(0).reset();
      $('.email-success').toggle('slow');
    }).fail(() => {
      $('.email-fail').toggle('slow');
    });
  }

  addClickListeners() {
    $('.email-success .close-button').click(() => {
      $('.email-success').toggle('slow');
    });
    $('.email-fail .close-button').click(() => {
      $('.email-fail').toggle('slow');
    });
  }

  createMessageData($form) {
    let serializedForm = $form.serializeArray();
    let messageData = {};
    serializedForm.map(field => {
      messageData[field.name] = field.value;
    });
    return messageData;
  }
}
