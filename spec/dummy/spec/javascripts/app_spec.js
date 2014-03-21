describe('NailPolish.App', function() {
  var app, NewApp;

  beforeEach(function() {
    spyOn(Backbone.history, 'start');
  });

  describe('bootstrapping data', function() {
    var $bootstrapData;

    beforeEach(function() {
      NewApp = NailPolish.App.extend({
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
    var RouterClass;

    beforeEach(function() {
      RouterClass = NailPolish.Router.extend();

      NewApp = NailPolish.App.extend({
        routerClass: function() {
          return RouterClass;
        }
      });

      app = new NewApp();

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
    var subViewOne, subViewTwo, subViewThree;
    
    beforeEach(function() {
      subViewOne = new NailPolish.View();
      subViewTwo = new NailPolish.View();
      subViewThree = new NailPolish.View();

      spyOn(subViewOne, 'render');
      spyOn(subViewTwo, 'render');
      spyOn(subViewThree, 'render');

      NewApp = NailPolish.App.extend({
        subViews: function() {
          return [
            subViewOne,
            subViewTwo,
            subViewThree
          ];
        }
      });

      app = new NewApp();

      app.render();
    });

    it('should call render for each subview', function() {
      expect(subViewOne.render).toHaveBeenCalled();
      expect(subViewTwo.render).toHaveBeenCalled();
      expect(subViewThree.render).toHaveBeenCalled();
    });
  });
});