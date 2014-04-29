var NailPolish = {
  apps: function () {
    if (this._apps) return this._apps;
    this._apps = [];
    return this._apps;
  },

  add: function (app) {
    if (this.apps().length <= 0) {
      this.startServices();
    }
    if (!_.include(this.apps(), app)) {
      this.apps().push(app);
    }
  },

  startServices: function () {
    Backbone.history.start();
    _.each(this.subscriptions, function (callback, event) {
      NailPolish.Events.subscribe(event, callback);
    });
  }
};

NailPolish.Widget = {};
NailPolish.Models = {};
NailPolish.Views = {};
