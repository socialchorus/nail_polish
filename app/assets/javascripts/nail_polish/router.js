NailPolish.Router = Backbone.Router.extend({
  initialize: function ($layout) {
    this.$layout = $layout;
    this.history = [];
    this.on('route:start', this.storeHistory, this);

    this.init();
  },

  init: function () {},

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

  page: function (views) {
    NailPolish.Events.publish('page:new');  
    this.$layout.empty();
    this.render(views);
  },

  render: function (args) {
    _.each(args, function (view) {
      view.parent = view.parent || this.$layout;
      view.repository = view.repository || this.repository;
      view.render();
    }.bind(this));
    this.afterRender();
  },

  afterRender: function(){
    //put your after render stuff here
  },

  // this is usually used for NailPolish.Events to publish a redirect event!
  redirect: function (path) {
    window.location = path;
  }, 

  go: function(fragment) {
    this.navigate(fragment, {trigger: true});
  },

  goReplacingLastHistory: function(fragment) {
    this.history.pop();
    this.navigate(fragment, { trigger: true, replace: true });
  },

  back: function () {
    this.history.pop();
    var fragment = _.last(this.history);
    this.goReplacingLastHistory(fragment);
  },

  storeHistory: function () {
    this.history.push(Backbone.history.fragment);
  }
});
