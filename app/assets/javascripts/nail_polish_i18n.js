I18n = I18n || {};

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


NailPolish.Presenter.prototype.toJSON = function() {
  var base = this.presentedToJSON();
  var inclusions = this.inclusions();
  var localizations = this.localizations();
  return _.extend(base, inclusions, localizations);
};
