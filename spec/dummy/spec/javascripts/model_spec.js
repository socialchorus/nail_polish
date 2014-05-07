describe("NailPolish.Model", function() {
  describe("#save", function() {
    var model, deferred;

    beforeEach(function() {
      model = new NailPolish.Model({});
      // Simulates jQuery Deferred
      deferred = {
        callbacks: {},
        done: function(cb) { this.callbacks['done'] = cb; return deferred; },
        fail: function(cb) { this.callbacks['fail'] = cb; return deferred; },
        triggerCallback: function(callbackName) { this.callbacks[callbackName].call() }
      };
      model.sync = function() { return deferred; };
    });

    it("triggers save:success event on success", function() {
      spyOn(model, 'trigger');
      model.save();
      deferred.triggerCallback('done');
      expect(model.trigger).toHaveBeenCalledWith("save:success", model);
    });

    it("triggers save:failure event on failure", function() {
      spyOn(model, 'trigger');
      model.save();
      deferred.triggerCallback('fail');
      expect(model.trigger).toHaveBeenCalledWith("save:failure", model);
    });

    it("returns whatever vanilla Backbone.Model.save would return", function() {
      expect(model.save()).toBe(deferred);
    });
  });
});

