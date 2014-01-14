NailPolish.Presenter.Dropdown = NailPolish.Presenter.extend({
  include: ["selected_value", "selectable_items", "selected_key"],

  selected_value: function(){
    selected_option = this.presented.options[this.presented.selected]
    return selected_option || _.values(this.presented.options)[0];
  },

  selected_key: function() {
    return this.presented.selected || _.keys(this.presented.options)[0];
  },

  selectable_items: function(){
    returnValue = [];

    _.each(this.presented.options, function(value, key){
      returnValue.push({key: key, value: value});
    });

    return returnValue;
  }
});