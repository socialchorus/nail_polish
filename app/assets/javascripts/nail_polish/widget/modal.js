NailPolish.Widget.Modal = NailPolish.View.extend({
  parent: 'body',
  parentSelector: '#overlay-container',
  attachmentMethod: 'html',
  baseModalTemplateName: "nail_polish/templates/modal",
  overlaySelector: "#overlay",
  closeConditionsMet: true,

  events: function () {
    _.extend(this.addListeners, {
      'click .close-modal': 'close',
      'click .cancel-link a': 'close'
    });

    this.addListeners["click " + this.overlaySelector] = "verifyTargetAndClose";
    return NailPolish.View.prototype.events.apply(this);
  },

  verifyTargetAndClose: function (e) {
    if($(e.target).is(this.overlaySelector)) {
      this.close();
    }
  },

  renderTemplate: function () {
    // switch declared template into a partial for consistent usage
    var template = HoganTemplates[this.baseModalTemplateName];
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
    if (this._subject && typeof this._subject.beforeClose === "function" && !this._subject.beforeClose()) {
      return;
    }else {
      NailPolish.Events.unsubscribe('page:new', this.close, this);
      this.unfreezeBody();
      this.remove();
      this.onClose();
    }
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
    $('body').addClass('no-scroll');
  },

  unfreezeBody: function() {
    $('body').removeClass('no-scroll');
  }
});
