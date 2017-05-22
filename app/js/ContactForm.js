import { CONTACT_EMAIL_ADDRESS } from './constants';
export class ContactForm {
  constructor() {
    $('#contact_form').foundation();
  }

  bindValidationToForm() {
    $('#contact_form')
    .bind('submit', function(e) {
      e.preventDefault();
    })
    .bind('formvalid.zf.abide', function(e,$form) {
      let serializedForm = $form.serializeArray();
      let messageData = {};
      serializedForm.map(field => {
        messageData[field.name] = field.value;
      });

      that.submitForm();
    });
  }
  submitForm() {
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
}
