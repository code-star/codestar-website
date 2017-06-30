export class Decorations {

  applyWhiteLineFix(backgrounds) {
    $('.special').each((i, element) => {
      for (var j = 0; j < backgrounds.length; ++j) {
        $(element).css('background', backgrounds[i][j]);
        $(element).css('-webkit-transform', 'translate3d(0, 0, 0)'); // Safari fix for scrolling disappearances
        $(element).css('-webkit-padding-before', '2px'); // Webkit fix for the safari fix above adding a white line...
        $(element).css('-webkit-margin-after', '-2px'); // Webkit fix for the safari fix above adding a white line...
      }
      // IE 9- doesn't support the background-gradients, but a DirectX filter can be used instead
      //$(element).css('filter', filters[i])
    });
  }

  addQueueExtension() {
    // Queue CSS function to work with .delay().
    // Example: $('p').delay(500).qss({'color': 'red'})
    // Source: http://stackoverflow.com/a/35057342/572635
    $.fn.extend({
      qcss: function(css) {
        return $(this).queue(function(next) {
          $(this).css(css);
          next();
        });
      }
    });
  }

  addCallToActionClickListeners() {
    $('.navigate-up').click(() => {
      $.fn.fullpage.moveSectionUp();
    })
    $('.navigate-down').click(() => {
      $.fn.fullpage.moveSectionDown();
    })
  }

  removeTabIndexFromPage() {
    $('input, select, textarea, button, a').prop('tabIndex', -1);
  }
}
