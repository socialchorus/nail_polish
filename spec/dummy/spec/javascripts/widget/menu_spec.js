describe('NailPolish.Widget.Menu', function() {
  var view, event;
  
  beforeEach(function() {
    event = {
      preventDefault: jasmine.createSpy(),
      stopPropagation: jasmine.createSpy(),
      currentTarget: jasmine.createSpy()
    }

    view = new NailPolish.Widget.Menu();
  });

  it('is a NailPolish.View subclass', function(){
    expect(view instanceof NailPolish.View).toBeTruthy();
  });

  describe("clicking the menu trigger", function() {
    it('should show the menu', function () {
      spyOn(view, 'menuIsVisible').and.returnValue(false);
      spyOn(view, 'showMenu');
      spyOn(view, 'hideAllMenus');
      view.toggleMenu(event);

      expect(view.hideAllMenus).toHaveBeenCalled();
      expect(view.showMenu).toHaveBeenCalledWith(event);
    });

    it('should hide the menu', function () {
      spyOn(view, 'menuIsVisible').and.returnValue(true);
      spyOn(view, 'hideMenu');
      view.toggleMenu(event);

      expect(view.hideMenu).toHaveBeenCalled();
    });
  });

  describe("clicking the menu item", function() {
    it('should hide the menu', function () {
      spyOn(view, 'hideMenu');
      view.menuItemClick(event);
      
      expect(view.hideMenu).toHaveBeenCalled();
      expect(event.preventDefault).toHaveBeenCalled();
      expect(event.stopPropagation).toHaveBeenCalled();
    });

    it('should call the hook method', function() {
      spyOn(view, 'onMenuItemClick');
      view.menuItemClick(event);

      expect(view.onMenuItemClick).toHaveBeenCalledWith($(event.currentTarget));
    });
  });
});
