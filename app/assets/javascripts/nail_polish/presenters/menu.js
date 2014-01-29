NailPolish.Presenter.DropdownMenu = NailPolish.Presenter.extend({
  include: ["selected_value", "selectable_items"],

  init: function() {
    this.options = this.presented.get('options');
  },

  selected_value: function(){
    return this.options[this.presented.selected()];
  },

  selectable_items: function(){
    returnValue = [];

    _.each(this.options, function(value, key){
      returnValue.push({key: key, value: value});
    });

    return returnValue;
  }
});