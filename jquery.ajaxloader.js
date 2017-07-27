// ruediger@webit.de

(function( $ ) {

  $.fn.ajaxloader = function(options) {
    var self = this,
        settings = $.extend({
          url: self.attr('data-url'),
          container: self.attr('data-container'),
          type: 'POST',
          aria_text: {
            loading: 'loading',
            success: 'successfully loaded',
            error: 'there was an error loading the new content'
          },
          success: function() {
            console.log('success');
          }
      }, options);

      var $focus_holder = $('<span class="focus-holder" tabindex="-1" style="font-size: 0; line-heiht: 0;">' + settings.aria_text.loading + '</span>');
      var $container = $(settings.container);

    /**
     * Initiates the module.
     * @function init
     * @public
     */
    function init() {

      _bindEvents();
    }

    /**
     * Binds all events to jQuery DOM objects.
     * @function _bindEvents
     * @private
     */
    function _bindEvents() {
      self.on('click.ajaxloader', function(event) {
        event.preventDefault();
        _loadContent();
      });
    }

    function _loadContent() {
      $container.append($focus_holder);

      setTimeout(function() {
        $focus_holder.focus();
      }, 10);

      $.ajax({
        url: settings.url,
        dataType: "html",
        type: settings.ajax_type
      }).done(function(response) {
        if (response !== null && typeof response !== undefined) {

          self.trigger('ajaxloader.success');
          $focus_holder.text(settings.aria_text.success).css({
            'position': 'absolute',
            'top': $container.height()
          });

          settings.success.call(self, response);
        } else {
          //error
          $focus_holder.text(settings.aria_text.error).insertBefore(self);
        }

        $focus_holder.text(settings.aria_text.loading).on('blur', function() {
          $focus_holder.remove();
        });
      });
    }

    if (this.length) {
      init();
    }

    return self;

  };

}( jQuery ));
