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

  describe('storing history', function() {
    var router, RouterClass;

    beforeEach(function() {
      Backbone.history.start();

      RouterClass = NailPolish.Router.extend({
        routes: {
          'actions': 'actions',
          'foo': 'foo',
          'bar': 'bar'
        },

        actions: jasmine.createSpy('router#action'),
        foo: jasmine.createSpy('router#foo'),
        bar: jasmine.createSpy('router#bar')
      });
    });

    afterEach(function() {
      Backbone.history.stop();
    });

    it('starts life with an empty history array', function() {
      router = new RouterClass();
      expect(router.history).toEqual([]);
    });

    it('adds history as it routes', function() {
      router = new RouterClass();

      router.go('actions');
      router.go('foo');
      router.go('bar');
      router.go('actions');

      expect(router.history).toEqual(['actions', 'foo', 'bar', 'actions']);
    });

    it('goReplacingLastHistory replaces the last entry with the current path', function() {
      router = new RouterClass();
              
      router.history = ['actions', 'foo'];
      router.goReplacingLastHistory('bar');

      expect(router.history).toEqual(['actions', 'bar']);
    });

    describe("back", function() {
      beforeEach(function() {
        router = new RouterClass();
        router.history = ['bar', 'actions', 'actions/42/share'];
      });

      it("should remove the current path from history", function() {
        router.history = ['bar', 'actions', 'actions/42/share'];
        router.back();
        expect(router.history).toEqual(['bar', 'actions']);
      });

      it('should navigate to the previous place in history', function() {
        spyOn(router, 'navigate').and.callThrough();
        router.back();
        expect(router.navigate).toHaveBeenCalledWith('actions', {trigger: true, replace: true});
      });
    });
  });
});
