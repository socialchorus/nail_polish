NailPolish.Views.Form = NailPolish.View.extend({
  formAttrs: [], /* implement in subclass */

  init: function(){
    this.listenTo(this.model, 'invalid', this.addErrors);
  },

  readAttributes: function() {
    var attrs = {};

    _.each(this.formAttrs, function(name) {
      attrs[name] = this.readAttribute(name);
    }.bind(this));

    _.extend(attrs, this.readAdditionalAttributes());

    if(this.model.id) { _.extend(attrs, {'_method' : 'put'}); }
    return attrs;
  },

  readAttribute: function(attr) {
    return this.$('[name=' + attr  + ']').val();
  },

  readAdditionalAttributes: function() {
    return {}; /* override for additional form stuff */
  },

  addErrors: function() {
    var errorKeys = _.keys(this.model.validationError);
    var selector = _.map(errorKeys, function(key) {
      return ".input-row." + key;
    }).join(', ');
    this.$(selector).addClass('error');
  },

  clearErrors: function() {
    _.each(this.formAttrs, function(key) {
      this.model.set(key + '_error', undefined);
    }.bind(this));

    this.$('.input-row').removeClass('error');
  }
});
