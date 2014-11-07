NailPolish.Mixins.Fetch = {
  fetch: function() {
    this.trigger('fetch:start');
    this.constructor.__super__.fetch.call(this, {success: this.fetchComplete.bind(this)});
  },

  fetchComplete: function() {
    this._fetched = true;
    this.trigger('fetch:complete');
  },

  fetched: function() {
    return this._fetched;
  }
};
