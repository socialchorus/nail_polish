describe("NailPolish.Widget.Flash", function() {
  var flash;

  beforeEach(function() {
    flash = new NailPolish.Widget.Flash();
  });

  describe("perform", function() {
    it("sets the model", function() {
      flash.perform({my:'data'});
      expect(flash.model).toEqual({my: 'data'});
    });

    it("renders", function() {
      spyOn(flash, 'render');
      flash.perform();
      expect(flash.render).toHaveBeenCalled();
    });

    it("scrolls to the top", function() {
      spyOn(window, 'scrollTo');
      flash.perform();
      expect(window.scrollTo).toHaveBeenCalledWith(0,0);
    });

    xit("shows the el");
  });

  describe("close button", function() {
    xit("calls close");
  });
});
