Scoof.GlobalPublisherAdder = function (args) {
  this.args = args;
};

_.extend(Scoof.GlobalPublisherAdder.prototype, {
  perform: function () {
    this.args.complete = this.wrapComplete(this.args.complete);
    return this.args;
  },

  wrapComplete: function (callback) {
    return function(xhr, status) {
      // call the original callback
      callback && callback(xhr, status);

      // extract the JSON data
      
      response = xhr.response || "{}"
      var data = JSON.parse(response);
      var publisher = Scoof.Events;

      // publish each event received
      _.each(data.events, function (value, key) {
        publisher.publish(key, value);
      });
    };
  }
});
