describe("NailPolish.Presenter", function() {
  var presenter;

  describe("default behavior", function() {
    describe("when not initialized with an object to present", function() {
      beforeEach(function() {
        presenter = new NailPolish.Presenter();
      });

      it("toJSON returns an empty object", function() {
        expect(presenter.toJSON()).toEqual({});
      });
    });

    describe("when initialized with something that converts to json", function() {
      var json;

      beforeEach(function() {
        json = { can: 'be jsoned'};
        presented = {
          toJSON: function () {
            return json;
          }
        };

        presenter = new NailPolish.Presenter(presented);
      });

      it("return the json", function() {
        expect(presenter.toJSON()).toBe(json);
      });
    });

    describe("when initialized with a plain old json object", function() {
      var json;
      beforeEach(function() {
        json = {plain: 'old'};
      });

      it("returns the object", function() {
        presenter = new NailPolish.Presenter(json);
        expect(presenter.toJSON()).toBe(json);
      });
    });
  });

  describe('extendability', function () {
    beforeEach(function() {
      spyOn(NailPolish.Presenter.prototype, 'init');
      spyOn(NailPolish.Presenter.prototype, 'initialize');
    });

    it('calls initialize on initialize', function() {
      new NailPolish.Presenter();
      expect(NailPolish.Presenter.prototype.init).toHaveBeenCalled();
    });

    it('calls init on initialize', function() {
      new NailPolish.Presenter();
      expect(NailPolish.Presenter.prototype.initialize).toHaveBeenCalled();
    });
  });

  describe("added properties", function() {
    var PresenterClass, presenter, model, json;

    beforeEach(function() {
      PresenterClass = NailPolish.Presenter.extend({
        include: ['nail_polish', 'scoff'],

        nail_polish: function() {
          return 'SocialCoder OO FrontEnd';
        },

        scoff: true
      });
    });

    describe("new attributes", function() {
      beforeEach(function() {
        model = {};
        presenter = new PresenterClass(model);
        json = presenter.toJSON();
      });

      it("adds things that are attributes", function() {
        expect(json.scoff).toBe(true);
      });

      it("adds things that are functions", function() {
        expect(json.nail_polish).toBe('SocialCoder OO FrontEnd');
      });
    });

    describe("overriden attributes", function() {
      beforeEach(function() {
        model = {scoff: 'not so much'};
        presenter = new PresenterClass(model);
        json = presenter.toJSON();
      });

      it("uses the included calculated values over the model values", function() {
        expect(json.scoff).toBe(true);
      });
    });
  });
});
