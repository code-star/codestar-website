import { CONTACT_EMAIL_ADDRESS } from './constants';
export class ContactForm {

  constructor() {
    $('#contact_form').foundation();
    console.log(this);
  }

  bindValidationToForm() {
    console.log($().jquery);
    console.log('We gaan enorm binden.');
    console.log(this);
    var that = this;
    $('#contact_form')
      .on('submit', function(e) {
        console.log(e);
        e.preventDefault();
      })
      .on('formvalid.zf.abide', function(e,$form) {
        e.preventDefault();
        let messageData = that.createMessageData($form)
        that.submitForm(messageData);
      })
      .on('forminvalid.zf.abide', function(e, $form) {
        console.log(e);
        console.log($form);
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
