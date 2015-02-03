Function.prototype.bind = function(context) {
  args = [this].concat(_.toArray(arguments))
  return _.bind.apply(this, args);
};
