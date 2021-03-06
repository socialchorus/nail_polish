describe("NailPolish.Widget.Modal", function() {
  var view, e;

  beforeEach(function() {
    HoganTemplates['nail_polish/templates/modal'] = Hogan.compile(
      "<div id=\"overlay\"><div class='modal'>{{> modal_content}}</div></div>"
    );

    HoganTemplates['my_modal_template'] = Hogan.compile(
      "<div class='here-it-is'>Popup!</div> <div class='close-modal'>x</div>"
    );

    var View = NailPolish.Widget.Modal.extend({
      templateName: 'my_modal_template',
      addListeners: {
        'click .here-it-is': 'oop'
      }
    });

    view = new View();
  });

  describe("render", function() {
    beforeEach(function () {
      spyOn(view, 'setPosition');
      spyOn(view, 'freezeBody');
    });

    it("wraps the declared template in a modal template", function() {
      view.render();
      expect(view.$('#overlay .modal .here-it-is').length).toBe(1);
    });

    it("sets position of modal to current position on page", function () {
      view.render();
      expect(view.setPosition).toHaveBeenCalled();
    });

    it("sets the overlay height to the full height of the window", function () {
      view.render();
      expect(view.freezeBody).toHaveBeenCalled();
    });
  });

  describe("events", function() {
    it("adds listening for close-modal", function() {
      expect(view.events()['click .close-modal']).toEqual('close');
    });

    it("adds listening for .cancel-link", function() {
      expect(view.events()['click .cancel-link a']).toEqual('close');
    });

    it("adds listening for #overlay", function() {
      expect(view.events()['click #overlay']).toEqual('verifyTargetAndClose');
    });

    it("listens to events in addListeners", function() {
      expect(view.events()['click .here-it-is']).toEqual('oop');
    });
  });

  describe("close", function() {
    beforeEach(function() {
      view.render();
      e = jasmine.createSpyObj('event', ['preventDefault']);
    });

    it('removes subscription to page:new events', function() {
      spyOn(NailPolish.Events, 'unsubscribe');
      view.close(e);
      expect(NailPolish.Events.unsubscribe).toHaveBeenCalledWith('page:new', view.close, view);
    });

    it("removes the element from the dom", function() {
      spyOn(view, 'remove');
      view.close(e);
      expect(view.remove).toHaveBeenCalled();
    });

    it('calls the template method "onClose"', function() {
      spyOn(view, 'onClose');
      view.close(e);
      expect(view.onClose).toHaveBeenCalled();
    });

    it("removes 'no-scroll' from the body", function () {
      $('body').addClass('no-scroll');
      view.close();
      expect($('body').hasClass('no-scroll')).toBeFalsy();
    });
  });

  describe('listening for global events', function() {
    it('closes when it hears a page:new event', function() {
      spyOn(view, 'close');
      view.render();

      NailPolish.Events.publish('page:new');
      expect(view.close).toHaveBeenCalled();
    });
  });

  describe("setPosition", function () {
    describe("the window is bigger than the modal", function () {
      it("set the position of the modal relative to the window position", function () {
        spyOn(view, 'windowHeight').and.returnValue(1000);
        view.render();
        expect(view.$('.modal').css('top')).toBe('100px');
      });
    });

    describe("the window is smaller than the modal", function () {
      it("sets the position of the modal to top", function () {
        spyOn(view, 'windowHeight').and.returnValue(1);
        view.render();
        expect(view.$('.modal').css('top')).toBe('');
      });
    });
  });

  describe("verifyTargetAndClose", function () {
    it("closes the modal/overlay if the target was just the overlay (clicked outside the modal)", function () {
      spyOn(view, 'close');
      view.render();
      view.verifyTargetAndClose({target: view.$('#overlay')})
      expect(view.close).toHaveBeenCalled();
    });
  });
});
