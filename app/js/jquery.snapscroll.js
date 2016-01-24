// Generated by CoffeeScript 1.6.1
// usage: $('.container').snapscroll({'scrollOptions':{'axis':'y'}});
// for scrollOptions refer to https://github.com/flesler/jquery.scrollTo
(function($, window, document, undefined_) {
  var Plugin, defaults, pluginName;
  pluginName = 'snapscroll';
  defaults = {
    rightPadding: 20,
    leftPadding: 20,
    scrollSpeed: 1400,
    scrollEndSpeed: 100,
    scrollOptions: {'axis':'xy'}
  };
  Plugin = function(element, options) {
    this.container = $(element);
    this.options = $.extend({}, defaults, options);
    return this.init();
  };
  Plugin.prototype = {
    init: function() {
      return this.snapping();
    },
    snapping: function() {
      var $children, autoscrolling, prev_position, scroll_end_speed, scroll_speed, scroll_options, timer,
        _this = this;
      $children = this.container.children();
      scroll_speed = this.options.scrollSpeed;
      scroll_end_speed = this.options.scrollEndSpeed;
	  scroll_options = this.options.scrollOptions;
      prev_position = $(document).scrollLeft();
      timer = null;
      autoscrolling = false;
      return $(window).off('scroll.snapscroll').on('scroll.snapscroll', function() {
        var $child, cur_position, direction;
        if (!autoscrolling) {
          cur_position = $(document).scrollLeft();
          direction = _this.getDirection(prev_position, cur_position);
          $child = _this.getTargetChild($children, direction, cur_position);
          if ($child) {
            clearTimeout(timer);
            timer = setTimeout(function() {
              $(window).scrollTo($child, scroll_speed, scroll_options);
              $child.siblings('.ss-active').removeClass('ss-active');
              $child.addClass('ss-active');
              autoscrolling = true;
              return setTimeout(function() {
                prev_position = $(document).scrollLeft();
                return autoscrolling = false;
              }, scroll_speed + 20);
            }, scroll_end_speed);
          }
          return prev_position = cur_position;
        }
      });
    },
    getDirection: function(a, b) {
      if (a > b) {
        return 'left';
      } else {
        return 'right';
      }
    },
    getTargetChild: function($children, direction, position) {
      var $target, right_position, fc_left, lc_right, options, window_width;
      options = this.options;
      window_width = $(window).width();
      right_position = position + window_width;
      fc_left = $children.first().offset().left;
      lc_right = $children.last().offset().left + window_width;
      $target = null;
      if (fc_left < position + options.leftPadding) {
        $children.not('.ss-active').each(function(i) {
          var object_right, object_left;
          object_left = $(this).offset().left;
          object_right = object_left + $(this).width();
          if (direction === 'right') {
            if (object_left < right_position && object_right > position) {
              $target = $(this);
              return false;
            }
          } else {
            if (object_left < position && position < object_right) {
              return $target = $(this);
            }
          }
        });
      }
      return $target;
    }
  };
  return $.fn[pluginName] = function(options) {
    return this.each(function() {
      if (!$.data(this, 'plugin_' + pluginName)) {
        return $.data(this, 'plugin_' + pluginName, new Plugin(this, options));
      }
    });
  };
})(jQuery, window, document);
