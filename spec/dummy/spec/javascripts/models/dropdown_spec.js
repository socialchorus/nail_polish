describe("NailPolish.Model.Dropdown", function() {
  var model;

  beforeEach(function() {
    GenericDropdown = NailPolish.Models.Dropdown.extend({
      options: {"option1": "Option 1", "option2":"Option 2"}
    });

    model = new GenericDropdown({
      selected_key: "option2"
    });
  });

  describe("#selected", function() {
    it("returns the selected_key if there is one", function(){
      expect(model.selected()).toEqual("option2");
    });

    it("returns the first key of the options if there isn't a selected_key", function() {
      model.set('selected_key', undefined);
      expect(model.selected()).toEqual("option1");
    });
  });
});