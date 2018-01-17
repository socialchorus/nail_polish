describe("NailPolish.AuthTokenAdder", function() {
  var args;

  var transformedArguments = function (args) {
    var adder = new NailPolish.AuthTokenAdder(args);
    adder.authenticityToken = 'authToken';
    return adder.perform();
  };

  describe("GET", function() {
    beforeEach(function() {
      args = {
        url: '/foo?search=some-term',
        type: 'GET'
      };
    });

    it("leaves everything as is", function() {
      expect(transformedArguments(args)).toEqual(args);
    });
  });

  describe("DELETE", function() {
    var data;
    beforeEach(function() {
      args = {
        url: '/my_resource',
        type: 'DELETE'
      };
    });

    it("adds the auth token to request headers", function() {
      data = transformedArguments(args);
      expect(Object.keys(data)).toContain('headers');
      expect(Object.keys(data.headers)).toContain('X-CSRF-Token');
    });
  });

  describe("POST", function() {
    var data;
    beforeEach(function() {
      args = {
        url: '/my_resource',
        type: 'POST'
      };
    });

    it("adds the auth token to request headers", function() {
      data = transformedArguments(args);
      expect(Object.keys(data)).toContain('headers');
      expect(Object.keys(data.headers)).toContain('X-CSRF-Token');
    });
  });

  describe("PUT", function() {
    var data;
    beforeEach(function() {
      args = {
        url: '/my_resource',
        type: 'PUT'
      };
    });

    it("adds the auth token to request headers", function() {
      data = transformedArguments(args);
      expect(Object.keys(data)).toContain('headers');
      expect(Object.keys(data.headers)).toContain('X-CSRF-Token');
    });
  });

  describe("PATCH", function() {
    var data;
    beforeEach(function() {
      args = {
        url: '/my_resource',
        type: 'PATCH'
      };
    });

    it("adds the auth token to request headers", function() {
      data = transformedArguments(args);
      expect(Object.keys(data)).toContain('headers');
      expect(Object.keys(data.headers)).toContain('X-CSRF-Token');
    });
  });
});
