NailPolish.App = function() {};
NailPolish.App.extend = Backbone.Model.extend;

_.extend(NailPolish.App.prototype, _.extend(_.clone(NailPolish.SubviewManager), {
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
    this.renderEach(this.subViews());
  },

  bootstrapData: function(selector) {
    return JSON.parse($(selector).text());
  },

  //Stuff for YOU to configure

  init: function() {
    //your init stuff here
  },

  bootstrapDataSelector: "#bootstrap-data",

  bootstrap: function() {
    //override this if you want specific models in your repo
    return this.bootstrapData(this.bootstrapDataSelector);
  },

  subViews: function() {
   //fill me in

   //return [
   // new View.That.I.Want.To.Render({model: model})
   //]
  },

  routerClass: function() {
    //set this, yo
  }
}));