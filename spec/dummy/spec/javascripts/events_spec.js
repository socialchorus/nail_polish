describe("NailPolish.Events", function() {
  describe("publish", function() {
    it("triggers an event on the publisher", function() {
      spyOn(NailPolish.Events.publisher, 'trigger');
      var args = {};
      var event = 'publication:yo';

      NailPolish.Events.publish(event, args);

      expect(NailPolish.Events.publisher.trigger).toHaveBeenCalledWith(
        event, args
      );
    });
  });

  describe("subscribe", function() {
    it("calls the callback when the event is triggered", function() {
      var sentMessage;
      var context = {
        foo: function(message) {
          sentMessage = message;
        }
      };

      NailPolish.Events.subscribe('flash', function(message) { this.foo(message) }, context);

      NailPolish.Events.publish('flash', 'do it again some more!');
      expect(sentMessage).toBe('do it again some more!');
    });
  });

  describe('unsubscribe', function() {
    it('stops listening to that event', function() {
      var sentMessage;
      var context = {
        foo: function(message) {
          sentMessage = message;
        }
      };

      var handler = function(message) { this.foo(message) };

      NailPolish.Events.subscribe('flash', handler, context);
      NailPolish.Events.unsubscribe('flash', handler, context);
      NailPolish.Events.publish('flash', 'do it again some more!');

      expect(sentMessage).toBe(undefined);
    });
  });

  describe("isWindowsTouch", function(){
    it("should return true for a Windows device", function() {
      navigator.__defineGetter__('userAgent', function(){
        return '("Mozilla/5.0 (Windows NT 6.2; WOW64) Chrome(29.0.1547)")'; // customized user agent
      });
      expect(NailPolish.Events.isWindowsTouch()).toEqual(true);
      navigator.__defineGetter__('userAgent', function(){
        return ''; // decustomize for other tests
      });
    })
  });
});
