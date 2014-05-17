// Will become default after transition has finished
NailPolish.PresenterWithErrors = NailPolish.Presenter.extend({});

NailPolish.PresenterWithErrors.prototype.errors = function() {
  if (!_.isObject(this.presented.validationError)) {
    return {};
  }

  return _.reduce(this.presented.validationError, function(memo, attrErrors, attrName) {
    memo[attrName + "_errors"] = attrErrors;
    memo[attrName + "_error"] = attrErrors[0];
    return memo;
  }, {});
};

/*
  Returns a template-friendly json representation of `presented`.

  Example:

    var MyModel = Backbone.Model.extend({
      validate: function(attributes) {
        var validate = new NailPolish.Validator();
        validate.
          attribute("username").
          addRule("is too awesome", validate.is.notMatching(/^kaboom$/)).
          addRule("is too long", validate.is.tooLong(5));
        return validate.validate(attributes);
      }
    });

    var model = new MyModel({ username: "socialcoder" });

    var MyPresenter = NailPolish.Presenter.extend({
      include: ["status", "likes"],

      status: "better than ever",

      likes: function() {
        return ["clean code", "nice documentation"];
      }
    });

    var presenter = new MyPresenter(model);
    model.isValid();

    presenter.toJSON();

    // {
    //   "likes": ["clean code", "nice documentation"],
    //   "status": "better than ever",
    //   "username": "socialcoder",
    //   "username_error": "is too awesome",
    //   "username_errors": ["is too awesome", "is too long"]
    // }
*/
NailPolish.PresenterWithErrors.prototype.toJSON = function() {
  var base = NailPolish.Presenter.prototype.toJSON.apply(this);
  var errors = this.errors();
  return _.extend(base, errors);
};
