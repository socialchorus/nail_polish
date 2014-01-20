NailPolish.Widget.Dropdown = NailPolish.View.extend({
  templateName: 'templates/dropdown',

  events: {
    'click .dropdown-toggle': 'toggle',
    'click .menu-item': 'setSelected'
  },

  init: function(){
    this.className      = this.model.get('name') + '-drop-down';
    this.menuSelector   = '.' + this.model.get('name') + '-dropdown-menu';
  },

  presenterClass: function () {
    return NailPolish.Presenter.Dropdown;
  },

  toggle: function() {
    $(this.menuSelector).toggleClass(this.hiddenClass);
  },

  renderTemplate: function () {
    // switch declared template into a partial for consistent usage
    var template = HoganTemplates[this.templateName];
    var rendered = template.render(this.presenter());
    this.$el.html(rendered);
  },

  hiddenClass: 'hidden',

  setSelected: function(e){
    var $target = $(e.target);
    this.model.set('selected_key', $target.attr("data-option"));
    this.render();
    this.afterSelect();
  },

  afterSelect: function() {
    //overwrite me in subclass if you need to do stuffs
  },

  getSelectedValue: function() {
    return this.model.selected;
  }

});
