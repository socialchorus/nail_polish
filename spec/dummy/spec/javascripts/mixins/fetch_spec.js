describe("NailPolish.Mixins.Fetch", function () {
  var model;

  beforeEach(function() {
    model = new (Backbone.Model.extend(NailPolish.Mixins.Fetch))();
    model.url = '/foo';
  });

  describe("fetch", function () {
    it("triggers fetch:start", function () {
      spyOn(model, 'trigger');
      model.fetch();
      expect(model.trigger).toHaveBeenCalledWith('fetch:start');
    });

    it("calls the original object's fetch with fetchComplete on success", function () {
      spyOn(Backbone.Model.prototype, 'fetch');
      model.fetch();
      expect(Backbone.Model.prototype.fetch).toHaveBeenCalled();

      spyOn(model, 'fetchComplete');
      model.fetch();
      Backbone.Model.prototype.fetch.calls.mostRecent().args[0].success();
      expect(model.fetchComplete).toHaveBeenCalled();
    });
  });

  describe("fetchComplete", function () {
    it("marks the object as fetched", function () {
      model.fetchComplete();
      expect(model.fetched()).toEqual(true);
    });

    it("triggers a fetch:complete", function () {
      spyOn(model, 'trigger');
      model.fetchComplete();
      expect(model.trigger).toHaveBeenCalledWith('fetch:complete');
    });
  });

  describe("fetched", function() {
    it("tells you if the object fetch has completed", function () {
      expect(model.fetched()).toBeFalsy();
      model.fetchComplete();
      expect(model.fetched()).toEqual(true);
    });
  });
});
