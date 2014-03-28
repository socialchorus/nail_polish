NailPolish.App = function(parent, opts) {
  this.initialize(parent, opts);
};

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
    this.$el = this.parent; // will act like a view when the parent finder encounters it
    // TODO: switch naming to el/$el everywhere???
    this.renderEach(this.subviews());
    this.afterRender();
  },

  afterRender: function(){

  },

  bootstrapData: function(selector) {
    try {
      return JSON.parse($(selector).text());
    } catch(e) {
      return {};
    }
  },

  //Stuff for YOU to configure

  init: function() {
    //your init stuff here
  },

  bootstrapDataSelector: "#bootstrap-json",

  bootstrap: function() {
    //override this if you want specific models in your repo
    return this.bootstrapData(this.bootstrapDataSelector);
  },

  subviews: function() {
   //fill me in

   //return [
   // new View.That.I.Want.To.Render({model: model})
   //]
  },

  routerClass: function() {
    //set this, yo
  }
}));
