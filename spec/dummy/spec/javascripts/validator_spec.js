describe("NailPolish.Validator", function() {
  var validate;

  beforeEach(function() {
    validate = new NailPolish.Validator();
  });

  describe("#validate", function() {
    it("returns undefined if there are no rules", function() {
      expect(validate.validate({})).toBeUndefined();
    });

    it("returns undefined if there are no attributes to validate", function() {
      validate.
        attribute("allYourCircuits").
        addRule("don't make Bender happy anymore", function(allYourCircuits) {
          return false;
        });

      expect(validate.validate({})).toBeUndefined();
    });

    it("returns undefined if no rules matched", function() {
      validate.
        attribute("allYourCircuits").
        addRule("don't make Bender happy anymore", function(allYourCircuits) {
          return allYourCircuits == "rust and dust";
        });

      expect(validate.validate({ "allYourCircuits": "pure decency" })).toBeUndefined();
    });

    it("returns errors object if there were any errors", function() {
      validate.
        attribute("sms").
        addRule("is offensive!", function(sms) {
          return sms.match(/^[^a-z]+$/);
        });

      expect(validate.validate({ "sms": "GTFO!!!" })).toEqual({ "sms": ["is offensive!"] });
    });

    it("can return multiple errors per attribute", function() {
      validate.
        attribute("number").
        addRule("is ridiculously small", function(n) { return n < 999; }).
        addRule("is way too even", function(n) { return n % 2 == 0; });

      expect(validate.validate({ "number": 42 })).
        toEqual({ "number": ["is ridiculously small", "is way too even"] });
    });

    it("can return errors for many attributes", function() {
      validate.
        attribute("number").
        addRule("is way too even", function(n) { return n % 2 == 0; });

      validate.
        attribute("username").
        addRule("suits only robots", function(u) { return u == "Bender"; });

      expect(validate.validate({
        "number": 42,
        "username": "Bender"
      })).
      toEqual({
        "number": ["is way too even"],
        "username": ["suits only robots"]
      });
    });

    it("passes attribute value and name to validating functions", function() {
      var passedAttrValues = [];
      var passedAttrNames = [];

      validate.
        attribute("username", "email").
        addRule("is already in use", function(attrValue, attrName) {
          passedAttrValues.push(attrValue);
          passedAttrNames.push(attrName);
        });
      validate.validate({ "username": "theUsername", "email": "the@email.com" });

      expect(passedAttrValues).toEqual(["theUsername", "the@email.com"]);
      expect(passedAttrNames).toEqual(["username", "email"]);
    });
  });

  describe("#attribute", function() {
    it("can be called twice with the same attribute name without overwriting rules", function() {
      validate.
        attribute("beard").
        addRule("is way too short", validate.is.tooShort(10));

      validate.
        attribute("beard").
        addRule("has odd color", validate.is.notMatching(/(red|brown|black)/));

      expect(validate.validate({ "beard": "green" })).toEqual({
        "beard": ["is way too short", "has odd color"]
      });
    });

    it("accepts multiple attribute names", function() {
      validate.
        attribute("beard", "hair").
        addRule("is way too short", validate.is.tooShort(10));

      validate.
        attribute("beard").
        addRule("has odd color", validate.is.notMatching(/(red|brown|black)/));

      expect(validate.validate({ "beard": "green", "hair": "short" })).toEqual({
        "hair": ["is way too short"],
        "beard": ["is way too short", "has odd color"]
      });
    });
  });

  describe("built-in validations", function() {
    describe("required", function() {
      beforeEach(function() {
        validate.
          attribute("username").
          addRule("is required", validate.is.required());
      });

      it("validates value is defined", function() {
        expect(validate.validate({ "username": undefined })["username"]).toEqual(["is required"]);
      });

      it("validates value is not null", function() {
        expect(validate.validate({ "username": null })["username"]).toEqual(["is required"]);
      });

      it("validates value is not an empty string", function() {
        expect(validate.validate({ "username": "" })["username"]).toEqual(["is required"]);
      });

      it("allows non-empty values", function() {
        expect(validate.validate({ "username": "Batman" })).toBeUndefined();
      })
    });

    describe("tooShort", function() {
      beforeEach(function() {
        validate.
          attribute("password").
          addRule("is way too short", validate.is.tooShort(4));
      });

      it("validates the length of the value is not less than the specified value", function() {
        expect(validate.validate({ "password": "abc" })["password"]).toEqual(["is way too short"]);
      });

      it("allows values long enough", function() {
        expect(validate.validate({ "password": "abcd" })).toBeUndefined();
      });

      it("ignores values which don't have length", function() {
        expect(validate.validate({ "password": undefined })).toBeUndefined();
        expect(validate.validate({ "password": null })).toBeUndefined();
        expect(validate.validate({ "password": /das_regexp/ })).toBeUndefined();
      });

      it("ignores empty strings", function() {
        expect(validate.validate({ "password": "" })).
          toBeUndefined();
      });
    });

    describe("tooLong", function() {
      beforeEach(function() {
        validate.
          attribute("password").
          addRule("is unbearably long", validate.is.tooLong(4));
      });

      it("validates the length of the value is not greater than the specified value", function() {
        expect(validate.validate({ "password": "abcde" })["password"]).
          toEqual(["is unbearably long"]);
      });

      it("allows values short enough", function() {
        expect(validate.validate({ "password": "abcd" })).toBeUndefined();
      });

      it("ignores values which don't have length", function() {
        expect(validate.validate({ "password": undefined })).toBeUndefined();
        expect(validate.validate({ "password": null })).toBeUndefined();
        expect(validate.validate({ "password": /das_regexp/ })).toBeUndefined();
      });

      it("ignores empty strings", function() {
        expect(validate.validate({ "password": "" })).
          toBeUndefined();
      });
    });

    describe("notMatching", function() {
      beforeEach(function() {
        validate.
          attribute("shortkey").
          addRule("is rubbish", validate.is.notMatching(/^\d[a-zA-Z]+[a-z-A-Z0-9]*$/));
      });

      it("validates the value matches supplied regexp", function() {
        expect(validate.validate({ "shortkey": "hell yeah!!1" })["shortkey"]).
          toEqual(["is rubbish"]);
      });

      it("casts non-string values to string", function() {
        expect(validate.validate({ "shortkey": 0 })["shortkey"]).
          toEqual(["is rubbish"]);
      });

      it("ignores null values", function() {
        expect(validate.validate({ "shortkey": null })).
          toBeUndefined();
      });

      it("ignores undefined values", function() {
        expect(validate.validate({ "shortkey": undefined })).
          toBeUndefined();
      });

      it("ignores empty strings", function() {
        expect(validate.validate({ "shortkey": "" })).
          toBeUndefined();
      });
    });
  });
});
