NailPolish.Widget.Flash = NailPolish.View.extend({
  templateName: 'flash',
  className: 'flash',
  parentSelector: '#flash-container',
  attachmentMethod: 'html',
  animationLength: 1000,
  showFor: 2000,

  addListeners: {
    'click .close': 'hide'
  },

  perform: function (model) {
    this.model = model;
    this.render();
  },

  afterRender: function () {
    this.show();
  },

  show: function () {
    this.$el.show();
    this.$el.find('.flash').css('opacity', 1);
    setTimeout(this.hide.bind(this), this.showFor);
  },

  hide: function () {
    this.$el.find('.flash').css('opacity', 0);
    setTimeout(this.removeFlash.bind(this), this.animationLength);
  },

  removeFlash: function() {
    this.$el.hide();
  }
});
