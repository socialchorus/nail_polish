describe("NailPolish.Presenter.Dropdown", function(){
  var model, presenter;

  beforeEach(function(){

    Dummy = NailPolish.Models.Dropdown.extend({
      options: {"option1": "Option 1", "option2":"Option 2"}
    });

    model = new Dummy({selected_key: "option2"})

    presenter = new NailPolish.Presenter.Dropdown(model);
  });

  describe("#selected_value", function() {

    it("returns the selected value if there is one in the model", function(){
      expect(presenter.selected_value()).toBe("Option 2");
    });

    it("returns the the first value in the presented options if it doesn't exist on the model", function() {
      model.set("selected_key", "")
      expect(presenter.selected_value()).toBe("Option 1")
    });
  });

  describe("#selectable_items", function() {
    it("returns an exploded hash of the supplied keys and values", function(){
      explodedOptions = [{key: "option1", value:"Option 1"},
                         {key: "option2", value:"Option 2"}];
      expect(presenter.selectable_items()).toEqual(explodedOptions);
    });
  });
});