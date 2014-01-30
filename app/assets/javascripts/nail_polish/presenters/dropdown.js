NailPolish.Presenter.Dropdown = NailPolish.Presenter.extend({
  include: ["selected_value", "selectable_items"],

  init: function() {
    this.options = this.presented.get('options');
  },

  selected_value: function(){
    return this.options[this.presented.selected()];
  },

  selectable_items: function(){
    return _.map(this.options, function(value, key){
      return {key: key, value: value};
    });
  }
});