//specs to come
NailPolish.App = function() {};
NailPolish.App.extend = Backbone.Model.extend;

_.extend(NailPolish.App.prototype, {
  initialize: function(parent, opts) {
    this.parent = parent;
    this.opts = opts;
    this.init(parent, opts);
  },

  start: function () {
    this.repository = this.bootstrap();
    this.route();
    this.render();
  },

  route: function() {
    this.router = new (this.routerClass())();
    this.router.repository = this.repository;
    Backbone.history.start();
  },

  render: function() {
    _.each(this.subViews(), function(view) {
      view.parent = view.parent || this.parent;
      view.render();
    }.bind(this));
  },

  bootstrapData: function() {
    var data = data || JSON.parse($('#bootstrap-json').text());
    return data;
  },

  //Stuff for YOU to configure

  init: function() {
    //your init stuff here
  },

  bootstrap: function() {
    //override this if you want specific models in your repo
    return this.bootstrapData();
  },

  subViews: function() {
   //fill me in

   //return [
   // new View.That.I.Want.To.Render({model: model})
   //]
  },

  routerClass: function () {
    //set this, yo
  }
});