Scoof.Router = Backbone.Router.extend({
  initialize: function (pageView) {
    this.pageView = pageView;
  },

  // We are overriding this method to add some events before and after
  // a route happens. Unfortunately, the anonymous function in the middle
  // doesn't allow us to call super and change just that behavior.
  route: function (route, name, callback) {
    if (!_.isRegExp(route)) route = this._routeToRegExp(route);
    if (_.isFunction(name)) {
      callback = name;
      name = '';
    }
    if (!callback) callback = this[name];

    var router = this;
    Backbone.history.route(route, function(fragment) {
      var args = router._extractParameters(route, fragment);
      router.trigger('route:start', fragment, args);
      callback && callback.apply(router, args);
      router.trigger.apply(router, ['route:' + name].concat(args));
      router.trigger('route', name, args);
      Backbone.history.trigger('route', router, name, args);
    });

    return this;
  },

  page: function () {
    this.pageView.$el.empty();
    this.render.apply(this, arguments);
  },

  render: function () {
    _.each(arguments, function (view) {
      view.render(this.pageView);
    });
  },

  redirect: function (path) {
    // send a redirect message to the Events publisher
    window.location = path;
  }
});
