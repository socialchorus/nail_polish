NailPolish.Widget.Dropdown = NailPolish.View.extend({
  templateName: 'nail_polish/templates/dropdown',

  events: {
    'click .dropdown-toggle': 'toggle',
    'click .menu-item': 'setSelected'
  },

  hiddenClass: 'hidden',

  init: function(){
    this.className      = this.model.get('name') + '-drop-down';
    this.menuSelector   = '.' + this.model.get('name') + '-dropdown-menu';
  },

  presenterClass: function () {
    return NailPolish.Presenter.Dropdown;
  },

  toggle: function(e) {
    if (this.menuIsVisible()) {
      this.hideMenu.bind(this)();
    } else {
      this.showMenu();
      e.stopPropagation();
    }
  },

  menuIsVisible: function() {
    return this.$(this.menuSelector).is(':visible');
  },

  hideMenu: function() {
    $(this.menuSelector).addClass(this.hiddenClass);
    this.removeBodyListener();
  },

  showMenu: function() {
    $(this.menuSelector).removeClass(this.hiddenClass);
    $('body').on(NailPolish.Events.click, this.hideMenu.bind(this));
  },

  removeBodyListener: function() {
    $('body').off(NailPolish.Events.click, this.hideMenu.bind(this));
  },

  renderTemplate: function () {
    // switch declared template into a partial for consistent usage
    var template = HoganTemplates[this.templateName];
    var rendered = template.render(this.presenter());
    this.$el.html(rendered);
  },

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
