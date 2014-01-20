NailPolish.Models.Dropdown = Backbone.Model.extend({
  initialize: function(){
    this.set({"options": this.options }, {silent: true})
  },

  selected: function(){
    return this.get('selected_key') || _.keys(this.get('options'))[0];
  }
});