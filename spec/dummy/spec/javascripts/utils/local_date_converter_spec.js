describe('NailPolish.LocalDateConverter', function() {
  var converter, utcString, utcHour;

  beforeEach(function() {
    utcString = '2014-06-10T12:14:27';
    utcHour = utcString.match(/\d+/g)[3];
    converter = new NailPolish.LocalDateConverter(utcString);
  });

  describe('perform', function() {
    it('should return the UTC date converted to the local date', function() {
      var localHour = utcHour - ((new Date(utcString)).getTimezoneOffset()) / 60;
      expect(converter.perform()).toEqual(new Date('6/10/2014 ' + localHour + ':14:27'));
    });
  });
});
