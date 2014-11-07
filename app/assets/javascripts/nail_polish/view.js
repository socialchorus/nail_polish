NailPolish.View = Backbone.View.extend(_.extend(_.clone(NailPolish.SubviewManager), {
  addListeners: {},
  presenterClass: function () {
    return NailPolish.Presenter;
  },

  initialize: function (opts) {
    opts = opts || {};
    this.parent = (this.parent && $(this.parent)) || opts.parent;
    this.repository = opts.repository;
    this.attachmentMethod = opts.attachmentMethod || this.attachmentMethod || 'append';
    this.parentSelector = opts.parentSelector || this.parentSelector;
    this.templateName = opts.templateName || this.templateName;
    if (opts.presenterClass) {
      this.presenterClass = function() {
        return opts.presenterClass;
      };
    }
    this.init(opts);
  },

  init: function (opts) {
    // override in classes
  },

  render: function () {
    var opts = arguments[0] || {};
    opts = _.extend({
      attachToParent: true
    }, opts);

    this.renderTemplate();
    this.renderSubviews();
    if (opts.attachToParent) this.attachToParent();

    $(window).trigger('NPView::Rendered');
    this.afterRender();
  },

  reRender: function() {
    this.render({attachToParent: false});
  },

  subviews: function () {
    return [];
  },

  renderSubviews: function() {
    this.renderEach(this.subviews());
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
    return this.addListeners;
  },

  renderTemplate: function () {
    var templateName = _.isFunction(this.templateName) ? this.templateName() : this.templateName;

    var template = HoganTemplates[templateName];
    if (!template) {
      return;
    }

    var rendered = template.render(this.presenter(), this.partials());
    this.$el.html(rendered);
  },

  presenter: function () {
    var presented = this.model || this.collection || {};
    var presenter = new (this.presenterClass())(presented);
    presenter.repository = presenter.repository || this.repository;
    return presenter.toJSON();
  },

  partials: function () {
    // override with own partials if necessary
    return {};
  },

  removeSelf: function() {
    Backbone.View.prototype.remove.apply(this);
  }
}));
