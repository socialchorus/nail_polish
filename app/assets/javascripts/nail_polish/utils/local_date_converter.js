// Most browsers can parse the UTC date string
// directly, but not IE8 (of course).
//
// So, here's a LocalDateConverter.

NailPolish.LocalDateConverter = function(utcString) {
  this.initialize(utcString);
};

_.extend(NailPolish.LocalDateConverter.prototype, {
  initialize: function(utcString) {
    this.utcString = utcString.toString();
  },

  perform: function() {
    var localDate = new Date(this.convertToUtcInteger());
    return localDate;
  },

  //private
  
  convertToUtcInteger: function() {
    var dateAry = this.utcString.match(/\d+/g);
    dateAry[1] -= 1; // Why oh why does Javascript make us change the month?
    return Date.UTC.apply(this, dateAry);
  }
});
