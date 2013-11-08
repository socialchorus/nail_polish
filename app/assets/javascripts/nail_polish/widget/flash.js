NailPolish.Widget.Flash = NailPolish.View.extend({
  templateName: 'flash',
  className: 'flash',
  parentSelector: '#flash-container',
  attachmentMethod: 'html',
  animationLength: 500,
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
    window.scrollTo(0, 0);
    this.$el.css('opacity', 0);
    this.$el.show();
    this.$el.animate({opacity: 1}, this.animationLength);

    setTimeout(this.hide.bind(this), this.showFor);
  },

  hide: function () {
    this.$el.animate(
      {opacity: 0}, this.animationLength, this.$el.hide.bind(this.$el)
    );
  }
});
