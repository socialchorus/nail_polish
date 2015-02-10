describe('NailPolish.App', function() {
  var app, NewApp, RouterClass;

  beforeEach(function() {
    RouterClass = NailPolish.Router;
    spyOn(Backbone.history, 'start');

    NewApp = NailPolish.App.extend({
      routerClass: function() {
        return RouterClass;
      }
    });
  });

  describe('initializing an app', function() {
    it('it calls init', function() {
      var parent, opts;
      spyOn(NewApp.prototype, 'init');
      app = new NewApp(parent, opts);
      expect(NewApp.prototype.init).toHaveBeenCalledWith(parent, opts);
    });
  });

  describe('bootstrapping data', function() {
    var $bootstrapData;

    beforeEach(function() {
      NewApp = NewApp.extend({
        bootstrapDataSelector: '#my-data'
      });

      app = new NewApp();

      $bootstrapData = $(
      "  <div id='my-data'>" +
      "    {\"program_id\":1,\"program\":{\"id\":1,\"name\":\"a name\"}}" +
      "  </div>"
      );

      $('body').append($bootstrapData);
    });

    afterEach(function() {
      $bootstrapData.remove();
    });

    it('should parse JSON from the DOM', function() {
      expect(app.bootstrap().program.name).toBe("a name");
    });
  });

  describe('initializing the router', function() {
    beforeEach(function() {
      app = new NewApp();
      app.start();
      app.route();
    });

    it("should create a router", function() {
      expect(app.router instanceof RouterClass).toBe(true);
    });

    it('should start history', function () {
      expect(Backbone.history.start).toHaveBeenCalled();
    });
  });

  describe('rendering views', function() {
    var subviewOne, subviewTwo, subviewThree;

    beforeEach(function() {
      subviewOne = new NailPolish.View();
      subviewTwo = new NailPolish.View();
      subviewThree = new NailPolish.View();

      spyOn(subviewOne, 'render');
      spyOn(subviewTwo, 'render');
      spyOn(subviewThree, 'render');

      NewApp = NewApp.extend({
        subviews: function() {
          return [
            subviewOne,
            subviewTwo,
            subviewThree
          ];
        }
      });

      app = new NewApp();

      app.render();
    });

    it('should call render for each subview', function() {
      expect(subviewOne.render).toHaveBeenCalled();
      expect(subviewTwo.render).toHaveBeenCalled();
      expect(subviewThree.render).toHaveBeenCalled();
    });
  });
});
