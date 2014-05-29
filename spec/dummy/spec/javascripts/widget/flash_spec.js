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

    it("shows the el", function () {
      spyOn(flash.$el, 'show');
      flash.perform();
      expect(flash.$el.show).toHaveBeenCalled();
    });

    it("hides the el after animation length plus showFor length", function () {
      spyOn(flash.$el, 'hide');
      jasmine.clock().install();
      flash.perform();
      jasmine.clock().tick(flash.animationLength + flash.showFor);
      expect(flash.$el.hide).toHaveBeenCalled();
    });
  });
});
