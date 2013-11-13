describe("NailPolish.Widget.Modal", function() {
  var view;

  beforeEach(function() {
    HoganTemplates['modal'] = Hogan.compile(
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
      expect(view.events()['click .close-modal']).toEqual('closeModal');
    });

    it("listens to events in addListeners", function() {
      expect(view.events()['click .here-it-is']).toEqual('oop');
    });
  });

  describe("close", function() {
    beforeEach(function() {
      view.render();
    });

    it("removes the element from the dom", function() {
      spyOn(view, 'remove');
      view.close();
      expect(view.remove).toHaveBeenCalled();
    });

    it("publishes a back event, which the router listens for", function() {
      spyOn(NailPolish.Events, 'publish');
      view.close();
      expect(NailPolish.Events.publish).toHaveBeenCalledWith('route:close-modal');
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
