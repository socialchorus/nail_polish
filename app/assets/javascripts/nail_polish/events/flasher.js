NailPolish.Events.Flasher = function (view) {
  this.view = view;
};

_.extend(NailPolish.Events.Flasher.prototype, {
  subscribe: function () {
    NailPolish.Events.subscribe('flash', this.perform, this);
  },

  perform: function (data) {
    this.view.model = data;
    this.view.show();
  }
});

NailPolish.Events.Flasher.extend = Backbone.Model.extend;

