NailPolish.Model = Backbone.Model.extend({
  save: function() {
    var callback = function(eventName, receiver) {
      return function() {
        Array.prototype.unshift.call(arguments, eventName, this);
        this.trigger.apply(this, arguments);
      }.bind(receiver);
    };
    xhr = Backbone.Model.prototype.save.apply(this, arguments);
    xhr.done(callback("save:success", this))
       .fail(callback("save:failure", this))
    return xhr;
  },

  setErrors: function(errors) {
    this.errors = errors;
  }
});

NailPolish.Collection = Backbone.Collection.extend({
  sync: Backbone.sync,

  save: function(options) {
    var xhr = this.sync("create", this, options);
    xhr.fail(this.populateErrors.bind(this));
    return xhr;
  },

  populateErrors: function(xhr, options) {
    var collectionServerErrors = xhr.responseJSON;

    if (!_.isArray(collectionServerErrors)) {
      return;
    }

    _.each(_.zip(this.models, collectionServerErrors), function(model, modelErrors) {
      model.setErrors(modelErrors, options);
    });
  }
});

