describe("NailPolish.Router", function() {
  var $parent;

  it("is a Backbone.Router", function() {
    expect(new NailPolish.Router() instanceof Backbone.Router).toBe(true);
  });

  beforeEach(function() {
    $parent = $('<div id="content"><span></span></div>');
  });

  describe("page", function() {
    var router;

    beforeEach(function() {
      router = new NailPolish.Router($parent);
    });

    it("clears the #content div of existing content", function() {
      router.page();
      expect($parent.find('span').length).toBe(0);
    });

    it("renders view passed in", function() {
      var view = new NailPolish.View({parent: $parent});
      view.el = $("<div class='new-view'></div>")[0];

      router.page([view]);
      expect($parent.find('.new-view').length).toBe(1);
    });

    it('triggers a page:new event', function() {
      spyOn(NailPolish.Events, 'publish');
      router.page();
      expect(NailPolish.Events.publish).toHaveBeenCalledWith('page:new');
    });
  });

  describe("render", function() {
    var router;

    beforeEach(function() {
      router = new NailPolish.Router($parent);
    });

    it("renders view passed in", function() {
      var view = new NailPolish.View({parent: $parent});
      view.el = $("<div class='new-view'></div>")[0];

      router.page([view]);
      expect($parent.find('.new-view').length).toBe(1);
    });

    it('calls afterRender after rendering everything', function() {
      spyOn(NailPolish.Router.prototype, 'afterRender');
      router.render();
      expect(router.afterRender).toHaveBeenCalled();
    });
  });

  describe("going to a route", function() {
    var router, RouterClass;

    beforeEach(function() {
      Backbone.history.start();

      RouterClass = NailPolish.Router.extend({
        routes: {
          '*wildcard': 'something'
        },

        something: jasmine.createSpy('router#something')
      });

      router = new RouterClass();
    });

    afterEach(function () {
      Backbone.history.stop();
    });

    it("triggers a route:start event", function() {
      var eventCallback = jasmine.createSpy('route:start callback');
      router.on('route:start', eventCallback);

      router.navigate('#somewhere', {trigger: true});
      expect(eventCallback).toHaveBeenCalled();
    });

    it("calls the original function", function() {
      router.navigate('#somewhere-else', {trigger: true});
      expect(router.something).toHaveBeenCalled();
    });
  });
});
