describe("NailPolish.Events.Flasher", function() {
  var view, flasher;

  beforeEach(function() {
    view = new NailPolish.View();
    view.show = jasmine.createSpy('show the flash');
    flasher = new NailPolish.Events.Flasher(view);
  });

  describe("flash events", function() {
    var data;
    beforeEach(function() {
      data = {message: 'yay!'};
      flasher.subscribe();
      NailPolish.Events.publish('flash', data);
    });

    it("sets the model", function() {
      expect(flasher.view.model).toEqual(data);
    });

    it("calls show on the flash", function() {
      expect(view.show).toHaveBeenCalled();
    });
  });
});
