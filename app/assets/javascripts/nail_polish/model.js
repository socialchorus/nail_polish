/*
  Base model class for NailPolish apps.
  It is fully backwards-compatible with Backbone.Model.

  It automatically populates `validationError` with server errors, if
  there were any, i.e. given 422 JSON response from server:

      {
        errors: {
          "username": ["is already in use"]
        }
      }

  it populates model's `validationError` with:

      {
        "username": ["is already in use"]
      }

  This would also trigger an 'invalid' event on the model.
*/
NailPolish.Model = Backbone.Model.extend({
  constructor: function() {
    var result = Backbone.Model.apply(this, arguments);
    this._initializeInternalEvents();
    return result;
  },

  _initializeInternalEvents: function() {
    this.listenTo(this, 'error', this._populateServerErrors);
  },

  _populateServerErrors: function(model, response, options) {
    if (response.responseJSON && response.responseJSON.errors) {
      var errors = response.responseJSON.errors
      model.validationError = errors;
      model.trigger('invalid', model, errors, _.extend(options, { validationError: errors }));
    }
  }
});
