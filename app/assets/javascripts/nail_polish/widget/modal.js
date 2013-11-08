NailPolish.Widget.Modal = NailPolish.View.extend({
  parentSelector: '#overlay-container',
  attachmentMethod: 'html',

  addListeners: {
    'click .close-modal': 'close'
  },

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

  close: function (e) {
    this.$el.remove();
    NailPolish.Events.publish('route:close-modal');
  }
});

