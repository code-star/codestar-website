import getLanguage from './utlis';

require('../img/Features/Features_FastTimeMarket.svg');
require('../img/Features/Features_Integrating.svg');
require('../img/Features/Features_Partner.png');
require('../img/Features/Features_ReduceCode.svg');
require('../img/Features/Features_TheRightPeople.svg');

const features = getLanguage() === 'nl'
  ? require('../translations/nl/features.json')
  : require('../translations/en/features.json');

export function getFeatures() {
  const list = $('<div>');

  features.features.forEach((feature) => {
    const featureDiv = $('<div>');

    const imgTitle = $('<div>');
    const img = $('<img class="featureIcon" src="' + feature.img + '">');
    const title = $('<p class="featureTitle">').text(feature.name);
    imgTitle.append(img);
    imgTitle.append(title);

    const description = $('<p class="featureDescription">').html(feature.text);
    description.hide();

    imgTitle.click(() => {
      const desc = $(featureDiv).find('.featureDescription');
      $('.featureDescription').not(desc).slideUp(350);
      desc.slideToggle(350);
    });

    featureDiv.append(imgTitle);
    featureDiv.append(description);
    list.append(featureDiv);
  });

  return list;
}
