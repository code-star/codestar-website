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
      .on('formvalid.zf.abide', (e,$form) => {
        e.preventDefault();
        this.submitForm(createMessageData($form));
      })
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
}

function createMessageData($form) {
  let messageData = {};
  return $form.serializeArray().map(field => {
    messageData[field.name] = field.value;
  });
 }
