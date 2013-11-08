describe("NailPolish", function() {
  describe("add", function() {
    var app;
    beforeEach(function() {
      NailPolish._apps = []; // clear the app state
      NailPolish.subscriptions = {
        redirect: jasmine.createSpy('redirect callback'),
        flash: jasmine.createSpy('flash callback')
      };

      spyOn(Backbone.history, 'start');
      spyOn(NailPolish.Events, 'subscribe');

      app = {my: 'app'};
    });

    it("will add an app to the array", function() {
      NailPolish.add(app);
      expect(_.include(NailPolish.apps(), app)).toBe(true);
    });

    it("will not add the app if it is already there", function() {
      NailPolish.add(app);
      NailPolish.add(app);
      expect(NailPolish.apps().length).toBe(1);
    });

    describe('starting services', function () {
      it("will start services if this is the first app", function() {
        NailPolish.add(app);
        expect(Backbone.history.start).toHaveBeenCalled();
        var subscriptions = NailPolish.Events.subscribe.calls
        expect(subscriptions.argsFor(0)[0]).toBe('redirect');
        expect(subscriptions.argsFor(1)[0]).toBe('flash');
      });
    });
  });
});
