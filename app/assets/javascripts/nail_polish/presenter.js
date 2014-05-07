NailPolish.Presenter = function(presented) {
  this.presented = presented || {};
  this.initialize();
  this.init();
};

NailPolish.Presenter.prototype.initialize = function () {
  //Put your stuff here
};

NailPolish.Presenter.prototype.init = function () {
  //Put your stuff here
};

NailPolish.Presenter.extend = Backbone.Model.extend;

NailPolish.Presenter.prototype.presentedToJSON = function () {
  var json;
  if (this.presented && this.presented.toJSON) {
    json = this.presented.toJSON();
  }
  return json || this.presented;
};

NailPolish.Presenter.prototype.inclusions = function () {
  var inclusions = {};
  _.each(this.include || [], function (prop) {
     inclusions[prop] = this.inclusionFor(prop);
  }.bind(this));
  return inclusions;
};

NailPolish.Presenter.prototype.inclusionFor = function (attr) {
  var prop = this[attr];
  return _.isFunction(prop) ? prop.bind(this)() : prop;
};

NailPolish.Presenter.prototype.errors = function() {
  var errors = {};
  if (this.presented.errors === undefined) {
    return errors;
  }

  _.each(this.presented.errors, function(field, error) {
    errors[field + "_error"] = error;
  });

  return errors;
};

NailPolish.Presenter.prototype.toJSON = function() {
  var base = this.presentedToJSON();
  var inclusions = this.inclusions();
  var errors = this.errors();

  return _.extend(base, inclusions, errors);
};

