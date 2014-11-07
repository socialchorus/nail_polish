describe("NailPolish.Model", function() {
  var model, jsonErrorResponse;

  beforeEach(function() {
    model = new NailPolish.Model();
    model.url = '/foo';
    jsonErrorResponse = {
      responseText: JSON.stringify({ errors: { foo: ["bar"] } })
    };
  });

  it("is a Backbone.Model still", function() {
    expect(model instanceof Backbone.Model).toBeTruthy();
  });

  it("Uses the fetch mixin", function() {
    expect(model.fetch).toBe(NailPolish.Mixins.Fetch.fetch);
  });

  describe("#save", function() {
    describe("when there were server errors", function() {
      it("populates validationError with server errors", function() {
        model.trigger('error', model, jsonErrorResponse, {});
        expect(model.validationError).toEqual({ foo: ["bar"] });
      });

      it("triggers conventional Backbone 'invalid' event", function() {
        var triggeredWithModel, triggeredWithError, triggeredWithOptions;
        model.listenTo(model, 'invalid', function(model, validationError, options) {
          triggeredWithModel = model;
          triggeredWithError = validationError;
          triggeredWithOptions = options;
        });

        model.trigger('error', model, jsonErrorResponse, { some: "option" });

        expect(triggeredWithModel).toEqual(model);
        expect(triggeredWithError).toEqual({ foo: ["bar"] });
        expect(triggeredWithOptions).toEqual({
          some: "option",
          validationError: { foo: ["bar"] }
        });
      });
    });

    it("does not populate errors if there were none", function() {
      model.trigger('error', model, {
        responseText: JSON.stringify({})
      }, {});
      expect(model.validationError).toEqual(null);
    });

    it("does not populate errors if response does not contain json", function() {
      model.trigger('error', model, {}, {});
      expect(model.validationError).toEqual(null);
    });
  });

  describe("extendability", function() {
    it("can have #initialize overridden without breaking stuff", function() {
      var MyModel = NailPolish.Model.extend({
        initialize: function() {}
      });
      var model = new MyModel();
      model.trigger('error', model, jsonErrorResponse, {});
      expect(model.validationError).toEqual({ foo: ["bar"] });
    });
  });
});
