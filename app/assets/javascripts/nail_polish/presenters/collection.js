NailPolish.Presenter.Collection = NailPolish.Presenter.extend({
  presentedToJSON: function () {
    var json;
    if (this.presented && this.presented.toJSON) {
      json = this.presented.toJSON();
    }
    var returnValue = {};
    returnValue[this.name] = (json || this.presented);
    return returnValue;
  }
})