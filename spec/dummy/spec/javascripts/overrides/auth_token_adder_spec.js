describe("NailPolish.AuthTokenAdder", function() {
  var args;

  var transformedArguments = function (args) {
    var adder = new NailPolish.AuthTokenAdder(args);
    adder.authenticityToken = 'authToken';
    return adder.perform();
  };

  describe("GET requests", function() {
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
    beforeEach(function() {
      args = {
        url: '/my_resource',
        type: 'DELETE'
      };
    });

    it("adds the auth token to the url", function() {
      var url = transformedArguments(args).url;
      expect(url).toMatch(/\?authenticity_token=/)
    });
  });

  describe("other requests", function() {
    var data;
    describe("no data", function() {
      beforeEach(function() {
        args = {
          url: '/my_resource',
          type: 'PATCH'
        };
      });

      it("adds the auth token as the only data", function() {
        data = transformedArguments(args).data;
        expect(_.isString(data)).toBe(true);
        expect(JSON.parse(data).authenticity_token).toBe('authToken');
      });
    });

    describe("string data", function() {
      beforeEach(function() {
        args = {
          url: '/my_resource',
          type: 'PATCH',
          data: JSON.stringify({goo:'far'})
        };

        data = JSON.parse(transformedArguments(args).data);
      });

      it("maintains existing data", function() {
        expect(data.goo).toEqual('far');
      });

      it("adds the auth token", function() {
        expect(data.authenticity_token).toBe('authToken');
      });
    });

    describe("object data", function() {
      beforeEach(function() {
        args = {
          url: '/my_resource',
          type: 'PATCH',
          data: {goo:'far'}
        };

        data = JSON.parse(transformedArguments(args).data);
      });

      it("maintains existing data", function() {
        expect(data.goo).toEqual('far');
      });

      it("adds the auth token", function() {
        expect(data.authenticity_token).toBe('authToken');
      });
    });
  });
});
