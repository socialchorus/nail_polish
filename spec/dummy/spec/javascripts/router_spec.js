describe("Scoof.Router", function() {
  var $parent;

  it("is a Backbone.Router", function() {
    expect(new Scoof.Router() instanceof Backbone.Router).toBe(true);
  });

  beforeEach(function() {
    $parent = $('<div id="content"><span></span></div>');
  });

  describe("page", function() {
    var router;

    beforeEach(function() {
      router = new Scoof.Router($parent);
    });

    it("clears the #content div of existing content", function() {
      router.page();
      expect($parent.find('span').length).toBe(0);
    });

    it("renders view passed in", function() {
      var view = new Scoof.View({parent: $parent});
      view.el = $("<div class='new-view'></div>")[0];

      router.page([view]);
      expect($parent.find('.new-view').length).toBe(1);
    });
  });

  describe("render", function() {
    var router;

    beforeEach(function() {
      router = new Scoof.Router($parent);
    });

    it("renders view passed in", function() {
      var view = new Scoof.View({parent: $parent});
      view.el = $("<div class='new-view'></div>")[0];

      router.page([view]);
      expect($parent.find('.new-view').length).toBe(1);
    });

    it('calls afterRender after rendering everything', function() {
      spyOn(Scoof.Router.prototype, 'afterRender');
      router.render();
      expect(router.afterRender).toHaveBeenCalled();
    });
  });

  describe("going to a route", function() {
    var router, RouterClass;

    beforeEach(function() {
      Backbone.history.start();

      RouterClass = Scoof.Router.extend({
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
