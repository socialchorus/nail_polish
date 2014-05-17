describe("NailPolish.PresenterWithErrors", function() {
  var presenter;

  describe("validation-induced properties", function() {
    describe("when initialized with something that has validationError property, i.e. Backbone.Model", function() {
      describe("when validationError is a [conventional NailPolish] error object", function() {
        var model, presenter;

        beforeEach(function () {
          model = {
            validationError: { "username": ["is already in use", "is strange"] }
          };
          presenter = new NailPolish.PresenterWithErrors(model);
        });

        it("adds <attribute>_errors properties", function() {
          expect(presenter.toJSON()["username_errors"]).toEqual(["is already in use", "is strange"]);
        });

        it("adds <attribute>_error propertes with first error as a value", function() {
          expect(presenter.toJSON()["username_error"]).toEqual("is already in use");
        })
      });

      describe("when validationError is something indigestible", function () {
        it("does not populate errors", function () {
          var model = {
            validationError: "life is hard",
            toJSON: function() { return { foo: "bar" }; }
          };
          var presenter = new NailPolish.PresenterWithErrors(model);

          expect(presenter.toJSON()).toEqual(model.toJSON());
        });
      });
    });
  });
});
