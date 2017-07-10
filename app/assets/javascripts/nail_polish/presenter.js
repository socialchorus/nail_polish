I18n = I18n || {};

NailPolish.Presenter = function(presented) {
  this.presented = presented || {};
  this.initialize();
  this.init();
};

NailPolish.Presenter.prototype.initialize = function() {
  //Put your stuff here
};

NailPolish.Presenter.prototype.init = function() {
  //Put your stuff here
};

NailPolish.Presenter.extend = Backbone.Model.extend;

NailPolish.Presenter.prototype.presentedToJSON = function() {
  var json;
  if (this.presented && this.presented.toJSON) {
    json = this.presented.toJSON();
  }
  return json || this.presented;
};

NailPolish.Presenter.prototype.inclusions = function() {
  var inclusions = {};
  _.each(this.include || [], function(prop) {
     inclusions[prop] = this.inclusionFor(prop);
  }.bind(this));
  return inclusions;
};

NailPolish.Presenter.prototype.inclusionFor = function(attr) {
  var prop = this[attr];
  return _.isFunction(prop) ? prop.bind(this)() : prop;
};

/* I18n: */
NailPolish.Presenter.prototype.localization = ['i18n'];

NailPolish.Presenter.prototype.i18n = function () {
  return I18n.translations[I18n.locale || I18n.defaultLocale];
};

NailPolish.Presenter.prototype.localizations = function() {
  var localizations = {};
  _.each(this.localization || [], function(prop) {
    localizations[prop] = this.localizationFor(prop);
  }.bind(this));
  return localizations;
};

NailPolish.Presenter.prototype.localizationFor = function(attr) {
  var prop = this[attr];
  return _.isFunction(prop) ? prop.bind(this)() : prop;
};
/* /I18n */


/*
  Returns a template-friendly json representation of `presented`.

  Example:

    var model = new Backbone.Model({ username: "socialcoder" });

    var MyPresenter = NailPolish.Presenter.extend({
      include: ["status", "likes"],

      status: "better than ever",

      likes: function() {
        return ["clean code", "nice documentation"];
      }
    });

    var presenter = new MyPresenter(model);

    presenter.toJSON();

    // {
    //   "likes": ["clean code", "nice documentation"],
    //   "status": "better than ever",
    //   "username": "socialcoder",
    //   "username_error": "is too awesome"
    // }
*/
NailPolish.Presenter.prototype.toJSON = function() {
  var base = this.presentedToJSON();
  var inclusions = this.inclusions();
  var localizations = this.localizations();
  return _.extend(base, inclusions, localizations);
};
