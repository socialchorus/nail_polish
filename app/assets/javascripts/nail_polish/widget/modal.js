NailPolish.Widget.Modal = NailPolish.View.extend({
  parent: 'body',
  parentSelector: '#overlay-container',
  attachmentMethod: 'html',

  events: function () {
    _.extend(this.addListeners, {
      'click .close-modal': 'close',
      'click .cancel-link a': 'close',
      'click #overlay': 'verifyTargetAndClose'
    });

    return NailPolish.View.prototype.events.apply(this);
  },

  verifyTargetAndClose: function (e) {
    if($(e.target).is('#overlay')) {
      this.close();
    }
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
    this.freezeBody();
    this.addListenerForClose();
    this.setPosition();
  },

  addListenerForClose: function() {
    NailPolish.Events.subscribe('page:new', this.close, this);
  },

  close: function (e) {
    if(e){
      e.preventDefault(); // This is necessary to prevent clicking on elements behind the modal
    }
    NailPolish.Events.unsubscribe('page:new', this.close, this);
    $('body').removeClass('no-scroll');
    this.remove();
    this.onClose();
  },

  onClose: function() {}, // to be implemented by subclasses

  windowHeight: function () {
    return $(window).height();
  },

  setPosition: function () {
    var $modal = this.$('.modal');

    if ($modal.height()+100 < this.windowHeight() ){
      $modal.css('top', '100px');
    }
  },

  freezeBody: function() {
    setTimeout( function() {
      $('body').addClass('no-scroll');
    }, 0);
  }
});
