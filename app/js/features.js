require('../img/Features/Features_Aftercare.svg');
require('../img/Features/Features_FastTimeMarket.svg');
require('../img/Features/Features_HorizontallyScalable.svg');
require('../img/Features/Features_Integrating.svg');
require('../img/Features/Features_Partner.svg');
require('../img/Features/Features_ReduceCode.svg');
require('../img/Features/Features_TheRightPeople.svg');

var features = require('../data/features.json');

export function getFeatures() {
  var list = $('<div>');

  features.features.forEach((feature) => {
    var featureDiv = $('<div>');

    var imgTitle = $('<div>');
    var img = $('<img class="featureIcon" src="' + feature.img + '" width="50">');
    var title = $('<p class="featureTitle">').text(feature.name);
    imgTitle.append(img);
    imgTitle.append(title);

    var description = $('<p class="featureDescription">').text(feature.text);
    description.hide();

    imgTitle.click(() => {
      var desc = $(featureDiv).find('.featureDescription');
      $('.featureDescription').not(desc).slideUp(350);
      desc.slideToggle(350);
    });

    featureDiv.append(imgTitle);
    featureDiv.append(description);
    list.append(featureDiv);
  });

  return list;
}
