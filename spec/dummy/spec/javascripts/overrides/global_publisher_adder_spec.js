describe("NailPolish.GlobalPublisherAdder", function() {
  var xhr, transformed;

  beforeEach(function() {
    xhr = {
      response: JSON.stringify({
        events: {
          redirect: '/sign_in',
          flash: 'Please sign in'
        }
      })
    };
  });

  describe("when there is no complete attribute in the args", function() {
    beforeEach(function() {
      var args = {};
      transformed = (new NailPolish.GlobalPublisherAdder(args)).perform();
    });

    it("adds a complete attribute", function() {
      expect(_.isFunction(transformed.complete)).toBe(true);
    });

    it("the complete callback publishes the right events", function() {
      var redirectSpy = jasmine.createSpy('event redirect');
      var flashSpy = jasmine.createSpy('event flash');

      NailPolish.Events.subscribe('redirect', redirectSpy);
      NailPolish.Events.subscribe('flash', flashSpy);

      transformed.complete(xhr);

      expect(redirectSpy).toHaveBeenCalledWith('/sign_in');
      expect(flashSpy).toHaveBeenCalledWith('Please sign in');
    });
  });

  describe("when there is already a complete callback", function() {
    var originalComplete;
    beforeEach(function() {
      originalComplete = jasmine.createSpy('complete callback');
      var args = {
        complete: originalComplete
      };
      transformed = (new NailPolish.GlobalPublisherAdder(args)).perform();
    });

    it("calls the original callback", function() {
      transformed.complete(xhr, 'success');
      expect(originalComplete).toHaveBeenCalledWith(xhr, 'success');
    });

    it("the complete callback publishes the right events", function() {
      var redirectSpy = jasmine.createSpy('event redirect');
      var flashSpy = jasmine.createSpy('event flash');

      NailPolish.Events.subscribe('redirect', redirectSpy);
      NailPolish.Events.subscribe('flash', flashSpy);

      transformed.complete(xhr);

      expect(redirectSpy).toHaveBeenCalledWith('/sign_in');
      expect(flashSpy).toHaveBeenCalledWith('Please sign in');
    });
  });
});
