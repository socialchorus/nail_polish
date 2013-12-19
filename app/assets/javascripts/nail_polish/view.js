NailPolish.View = Backbone.View.extend({
  addListeners: {},
  presenterClass: function () {
    return NailPolish.Presenter;
  },

  initialize: function (opts) {
    opts = opts || {};
    this.parent = opts.parent;
    this.repository = opts.repository;
    this.attachmentMethod = this.attachmentMethod || 'append';
    this.init(opts);
  },

  init: function (opts) {
    // override in classes
  },

  render: function () {
    this.renderTemplate();
    this.renderSubviews();
    this.attachToParent();
    this.afterRender();
  },

  subviews: function () {
    return [];
  },

  renderSubviews: function () {
    _.each(this.subviews(), function (view) {
      view.parent = view.parent || this;
      view.render();
    }.bind(this));
  },

  attachToParent: function () {
    var $parent = new NailPolish.View.ParentFinder(
      this.parent, this.parentSelector, this.attachmentMethod
    ).perform();
    $parent && $parent[this.attachmentMethod](this.el);
  },

  afterRender: function () { /* template method hook ! */
  },

  events: function () {
    if (NailPolish.Events.isTouch() && !NailPolish.Events.isWindowsTouch()) {
      var eventSet = {};

      _.each(_.keys(this.addListeners), function (eventKey) {
        var key = eventKey.replace('click', NailPolish.Events.startEvent);
        eventSet[key] = this.addListeners[eventKey];
      }.bind(this));

      return eventSet;
    }
    return this.addListeners;
  },

  renderTemplate: function () {
    var template = HoganTemplates[this.templateName];
    if (!template) {
      return;
    }
    var rendered = template.render(this.presenter(), this.partials());
    this.$el.html(rendered);
  },

  presenter: function () {
    var presented = this.model || this.collection || {};
    var presenter = new (this.presenterClass())(presented);
    return presenter.toJSON();
  },

  partials: function () {
    // override with own partials if necessary
    return {};
  }
});
