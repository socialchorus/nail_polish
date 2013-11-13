NailPolish.Widget.Modal = NailPolish.View.extend({
  parentSelector: '#overlay-container',
  attachmentMethod: 'html',

  events: function () {
    _.extend(this.addListeners, {
      'click .close-modal': 'closeModal'
    });

    return NailPolish.View.prototype.events.apply(this);
  },

  renderTemplate: function () {
    // switch declared template into a partial for consistent usage
    var template = HoganTemplates['modal'];
    var partials = _.extend(this.partials(), {
      modal_content: HoganTemplates[this.templateName]
    });
    var rendered = template.render(this.presenter(), partials);
    this.$el.html(rendered);
  },

  render: function() {
    NailPolish.View.prototype.render.apply(this);
    this.addListenerForClose();
  },

  addListenerForClose: function() {
    NailPolish.Events.subscribe('page:new', this.close, this);
  },

  close: function (e) {
    this.remove();
    NailPolish.Events.publish('route:close-modal');
  }
});

