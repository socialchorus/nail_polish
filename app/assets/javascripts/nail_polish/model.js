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
    this.init(arguments);
    return result;
  },

  init: function (arguments) {
    //override in subclass!
  },

  _initializeInternalEvents: function() {
    this.listenTo(this, 'error', this._populateServerErrors);
  },

  _populateServerErrors: function(model, response, options) {
    var errors = this._errors(response);
    if (errors) {
      model.validationError = errors;
      model.trigger('invalid', model, errors, _.extend(options, { validationError: errors }));
    }
  },

  _errors: function (response) {
    var errors;
    try {
      return JSON.parse(response.responseText).errors;
    } catch(e) {
      return;
    }
  }
});
