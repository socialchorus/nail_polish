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
    it("wraps the declared template in a modal template", function() {
      view.render();
      expect(view.$('#overlay .modal .here-it-is').length).toBe(1);
    });
  });

  describe("events", function() {
    it("adds listening for close-modal", function() {
      expect(view.events()['click .close-modal']).toEqual('close');
    });

    it("adds listening for .cancel-link", function() {
      expect(view.events()['click .cancel-link a']).toEqual('close');
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
  });

  describe('listening for global events', function() {
    it('closes when it hears a page:new event', function() {
      spyOn(view, 'close');
      view.render();

      NailPolish.Events.publish('page:new');
      expect(view.close).toHaveBeenCalled();
    });
  });
});
