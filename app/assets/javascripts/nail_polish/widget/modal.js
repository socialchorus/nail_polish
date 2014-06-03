NailPolish.Widget.Modal = NailPolish.View.extend({
  parentSelector: '#overlay-container',
  attachmentMethod: 'html',

  events: function () {
    _.extend(this.addListeners, {
      'click .close-modal': 'close',
      'click .cancel-link a': 'close'
    });

    return NailPolish.View.prototype.events.apply(this);
  },

  renderTemplate: function () {
    // switch declared template into a partial for consistent usage
    var template = HoganTemplates['nail_polish/templates/modal'];
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
    if(e){
      e.preventDefault(); // This is necessary to prevent clicking on elements behind the modal
    }
    NailPolish.Events.unsubscribe('page:new', this.close, this);
    this.remove();
    this.onClose();
  },

  onClose: function() {} // to be implemented by subclasses
});
