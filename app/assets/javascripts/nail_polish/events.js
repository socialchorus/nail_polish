NailPolish.Events = {
  isTouch: function() {
    // taken from Modernizr: http://modernizr.com/license
    return (('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch);
  },

  isWindowsTouch: function() {
    if (/Windows.NT.6/i.test(navigator.userAgent)){
      return true;
    }
    return false;
  },
  startEvent: 'touchstart',

  publisher: _.extend({}, Backbone.Events),

  publish: function (event, args) {
    this.publisher.trigger(event, args);
  },

  subscribe: function (event, callback, context) {
    this.publisher.on(event, callback, context);
  },

  unsubscribe: function(event, callback, context) {
    this.publisher.off(event, callback, context);
  }
};

NailPolish.Events['click'] = NailPolish.Events.isTouch() ? NailPolish.Events.startEvent+' ' : 'click ';
