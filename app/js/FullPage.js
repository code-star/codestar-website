require('fullpage.js/jquery.fullPage.scss');
require('fullpage.js/jquery.fullPage');
import { Decorations } from './Decorations';
import { getPixel } from './pixelbg';

export class FullPage {
  constructor() {
    this.shown = false;
    this.fpOnLeave = [];
    this.fpAfterLoad = [];
    this.centerPage = 5;
    this.graphFadeSpeed = 350;
  }

  initialize() {
    let that = this;
    // Initiate fullpage.js
    $('#fullpage').fullpage({
          menu: '.fixed-menu',
          anchors: ['join', 'team', 'why-work', 'attract', 'center', 'difference', 'features', 'cases', 'contact'],
          scrollingSpeed: 1100,
          responsiveWidth: 900,
          responsiveHeight: 700,
          recordHistory: false,
          navigation: true,
          normalScrollElements: '.normalscroll',
          onLeave: function(index, nextIndex, direction) {
            // Call all listeners
            that.fpOnLeave.forEach(f => f(index,nextIndex,direction))
          },
          afterLoad: (anchor, index) => {
            that.fpAfterLoad.forEach(f => f(anchor, index))
          }
    });
  }

  addListeners(teamtree, casestree) {
    let that = this;

    this.fpOnLeave.push(function(index, nextIndex, direction) {
      new Decorations().closeMenuIfOpen();
    })

    this.fpOnLeave.push(function(index, nextIndex, direction) {
      if (!that.shown && nextIndex == 7) {
        that.shown = true;
        setTimeout(() => $('.featureIcon:first').trigger('click'), 1000);
      }
    })

    // Hide menu logo on center page
    this.fpOnLeave.push(function(index, nextIndex, direction) {
      if (nextIndex === that.centerpage) {
        $('.navigate-arrows').fadeIn(350);
        $('#menu-logo').fadeOut(350);
      } else {
        $('.navigate-arrows').fadeOut(350);
        $('#menu-logo').fadeIn(350);
      }
    })

    // Reset the team graph when entering its slide
    this.fpOnLeave.push(function(index, nextIndex, direction) {
      if(nextIndex == 2) {
        // Shuffle the nodes a bit
        teamtree.layout.nodes().forEach(function (n) {
          n.x = n.x + (Math.random() * 100 - 50)
          n.y = n.y + (Math.random() * 80 - 40)
        })
        teamtree.layout.resume()
      }
    })

    // Reset the cases graph when entering its slide
    this.fpOnLeave.push(function(index, nextIndex, direction) {
      if(nextIndex == 8) {
        // Shuffle the nodes a bit
        casestree.layout.nodes().forEach(function (n) {
          n.x = n.x + (Math.random() * 150 - 75)
          n.y = n.y + (Math.random() * 80 - 40)
        })
        casestree.layout.resume()
      }
    })

    // Disable tabs when not on contact page because of fullpage.js bug: https://github.com/alvarotrigo/fullPage.js/issues/1237
    this.fpOnLeave.push(function(index, nextIndex, direction) {
      if (nextIndex === 9) {
        $('#contact_form input, #contact_form select, #contact_form textarea, #contact_form button').removeAttr('tabindex')
      } else if (index === 9) {
        $('#contact_form input, #contact_form select, #contact_form textarea, #contact_form button').prop('tabIndex', -1);
      }
    })
  }

  addPixelBackground() {
    // "Pixel" backgrounds
    let pixelBgInterval = null;

    // Set an interval for generating pixels
    this.fpOnLeave.push((i,ni,dir) => {
      if(ni == 4) {
        pixelBgInterval = setInterval(() => {
          // nonzero hance to generate a pixel
          if(Math.random() < 0.7) {
            $('body').append(getPixel())
          }
        }, 200)
      } else {
        if(pixelBgInterval !== null) {
          clearInterval(pixelBgInterval)
        }
        // Fadeout and remove all existing pixels
        $('.bgPixel')
          // Stop existing blinking
          .stop()
          .fadeOut(300,
            function() { $(this).remove() }
          )
      }
    })
  }

  hideGraphsOnSafari() {
    let that = this;

    this.fpOnLeave.push((i, ni, dir) => {
      if(i == 2) {
        that.hideGraph('#teamTree')
      }
      if(i == 8) {
        that.hideGraph('#casesTree')
      }
    });

    this.fpAfterLoad.push((anchor, i) => {
      switch(anchor) {
        case "cases":
          $('#casesTree').css('visibility', 'visible')
          $('#casesTree').fadeTo(that.graphFadeSpeed, 1)
          break;
        case "team":
          $('#teamTree').css('visibility', 'visible')
          $('#teamTree').fadeTo(that.graphFadeSpeed, 1)
          break;
      }
    })
  }
  // Warning: do not use display: none, because this removes the node images when setting display: block again
  hideGraph(id) {
    let graph = $(id)
    graph.delay(this.graphFadeSpeed).qcss({'visibility': 'hidden'})
    graph.fadeTo(this.graphFadeSpeed, 0)
  }

}
