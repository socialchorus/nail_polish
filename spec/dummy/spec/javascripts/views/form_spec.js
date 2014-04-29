describe('NailPolish.Views.Form', function() {
  var view, model;

  beforeEach(function() {
    model = new Backbone.Model();
    view = new NailPolish.Views.Form({model: model});
    view.formAttrs = ['name', 'email'];
    view.$el.html("<input type='text' class='input-row name' name='name' value='name value'></input><input name='email' class='input-row email' type='text' value='email value'></input>");
  });

  describe("#readAttributes", function() {
    it("reads the specified attributes from the DOM", function() {
      expect(view.readAttributes()).toEqual({ name: 'name value', email: 'email value' });
    });

    it("should extend the attributes with any additional attributes", function() {
      spyOn(view, 'readAdditionalAttributes').and.returnValue({ something: 'else' });
      expect(view.readAttributes()).toEqual({ name: 'name value', email: 'email value', something: 'else' });
    });

    it("should add the put _method if the model has an id", function() {
      model.set('id', '1234');
      expect(view.readAttributes()['_method']).toBe('put');
    });
  });

  describe("errors", function() {
    beforeEach(function() {
      model.validationError = {
        name: 'Name must not be blank.',
        email: 'Email too long.'
      };
      view.addErrors();
    });

    describe('#addErrors', function() {
      it("should add the 'error' class to the invalid fields", function() {
        expect(view.$el.find('.error').length).toBe(2);
      });
    });

    describe("#clearErrors", function() {
      it("should clear the 'error' classes in the form", function() {
        view.clearErrors();
        expect(view.$el.find('.error').length).toBe(0);
      });

      it("should remove the error attributes from the model", function() {
        model = new Backbone.Model({name_error: 'name required', email: 'email@example.com'});
        view = new NailPolish.Views.Form({ model: model });
        view.formAttrs = ['name', 'email'];
        view.clearErrors();
        expect(model.get('name_error')).toBe(undefined);
      });
    });
  });
});