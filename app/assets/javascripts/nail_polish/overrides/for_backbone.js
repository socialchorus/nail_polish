Backbone.ajax = function() {
  // adds the authenticity token
  var args = _.map(arguments, function(a) {
    return new NailPolish.AuthTokenAdder(a).perform();
  });

  // reads events from data, and does a global publish
  args = _.map(args, function(a) {
    return new NailPolish.GlobalPublisherAdder(a).perform();
  });

  return Backbone.$.ajax.apply(Backbone.$, args);
};

