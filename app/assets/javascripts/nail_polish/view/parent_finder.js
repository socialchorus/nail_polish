NailPolish.View.ParentFinder = function (parent, selector, method) {
  this.parent = parent;
  this.selector = selector;
  this.method = method;
};

_.extend(NailPolish.View.ParentFinder.prototype, {
  perform: function () {
    if (this.parent) {
      // If it is a backbone view, use the $el for parent
      if (this.parent.$el) { this.parent = this.parent.$el; }

      if(this.selector) {
        //pretends it is jquery
        if (this.parentIsAttachable() && this.parentIsFindable()) {
          return this.findLocally()
        }
      } else {
        // is parent, no selector
        return this.parent;
      }
    } else {
      // no parent, but there is a selector
      return this.findGlobally();
    }
  },

  findLocally: function() {
    var found = this.parent.find(this.selector)
    if (found.length) { return found }
  },

  findGlobally: function() {
    if (!this.selector || !$(this.selector).length) { return; }

    return $(this.selector);
  },

  parentIsAttachable: function () {
    return !!(this.parent && this.parent[this.method]);
  },

  parentIsFindable: function () {
    return !!(this.parent && this.parent['find']);
  }
});
