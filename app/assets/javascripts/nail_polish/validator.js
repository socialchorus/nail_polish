/*
  Provides errors object builder for Backbone.js models.
  Follows Backbone.js validation conventions.
*/

NailPolish.Validator = function() {
  this._attributeRuleSets = {};
};

/*
  Starts the validations chain for a particular attribute(s).
  See documentation for `NailPolish.Validator.RuleSet.prototype.addRule` below.
*/
NailPolish.Validator.prototype.attribute = function() {
  var ruleSet = new NailPolish.Validator.RuleSet();

  _.each(arguments, function(attributeName) {
    var attributeRuleSet = this._attributeRuleSets[attributeName] ||
      new NailPolish.Validator.RuleSet();
    attributeRuleSet.chain(ruleSet);
    this._attributeRuleSets[attributeName] = attributeRuleSet;
  }, this);

  return ruleSet;
};

/*
  Returns an object containing errors or `undefined` if there were none.

  Example:

    validate.validate()

    // {
    //   "username" : ["is too short", "must not contain whitespace"],
    //   "age": ["is not a number"]
    // }
*/
NailPolish.Validator.prototype.validate = function(attributes) {
  var errors = {};

  _.each(attributes, function(attributeValue, attributeName) {
    var ruleSet = this._attributeRuleSets[attributeName];
    if (!ruleSet) return;

    _.each(ruleSet.rules(), function(rule) {
      if (rule(attributeValue, attributeName)) {
        errors[attributeName] = errors[attributeName] || [];
        errors[attributeName].push(rule.message);
      }
    }, this);
  }, this);

  return _.isEmpty(errors) ? undefined : errors;
};

/*
  Built-in validations.

  Usage:

    var validate = new NailPolish.Validator();
    validate.
      attribute("username").
      addRule("is too short", validate.is.tooShort(5));

  Extending:

    _.extend(NailPolish.Validator.prototype.is, {
      whitespaceFree: function() {
        return function(value) { return undefined !== value && value.match(/\s/); }
      }
    });

    ...

    validate.
      attribute("username").
      addRule("must not contain whitespace", validate.is.whitespaceFree());
*/
(function() {
  var notEmpty = function(value) {
    return null != value && "" !== value;
  };

  NailPolish.Validator.prototype.is = {
    required: function() {
      return function(value) { return !notEmpty(value); };
    },

    tooShort: function(minLength) {
      return function(value) { return notEmpty(value) && value.length < minLength; };
    },

    tooLong: function(maxLength) {
      return function(value) { return notEmpty(value) && value.length > maxLength; };
    },

    notMatching: function(pattern) {
      return function(value) { return notEmpty(value) && !String(value).match(pattern); }
    }
  };
})();

NailPolish.Validator.RuleSet = function() {
  this._rules = [];
  this._chainedRuleSets = [];
};

/*
  Defines validation rule and an error message for a particular attribute(s).

  Attribute is considered to be *invalid* if the validation function returns a truthy value.

  Multiple calls to `addRule` can be chained to add as many validations as needed.

  In case of custom validation functions, it's up to you to make sure that
  validation functions don't depend on each other and are capable of handling
  any *possible* input, be it `null`, `undefined`, or an actual value.

  Usage:

    validate.
      attribute("username", "email").
      addRule("is already in use", function(attrValue, attrName) {
        return this.collection.detect(function(user) {
          return user.get(attrName) == attrValue;
        });
      }.bind(this));
*/
NailPolish.Validator.RuleSet.prototype.addRule = function(errorMessage, validatingFunc) {
  validatingFunc.message = errorMessage;
  this._rules.push(validatingFunc);
  return this;
}

/* private */
NailPolish.Validator.RuleSet.prototype.chain = function(ruleSet) {
  this._chainedRuleSets.push(ruleSet);
}

/* private */
NailPolish.Validator.RuleSet.prototype.rules = function() {
  return _.reduce(this._chainedRuleSets, function(memo, ruleSet) {
    return memo.concat(ruleSet.rules());
  }, this._rules);
}
