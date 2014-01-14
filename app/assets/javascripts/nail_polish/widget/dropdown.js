NailPolish.Widget.Dropdown = NailPolish.View.extend({
  templateName: 'templates/dropdown',

  events: {
    'click .dropdown-toggle': 'toggle',
    'click .menu-item': 'setSelected'
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
    this.model.selected = $target.attr("data-option");
    this.render();
  }
});
