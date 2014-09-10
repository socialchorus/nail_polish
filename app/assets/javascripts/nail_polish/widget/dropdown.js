NailPolish.Widget.Dropdown = NailPolish.View.extend({
  templateName: 'nail_polish/templates/dropdown',

  events: {
    'click .dropdown-toggle': 'toggle',
    'click .menu-item': 'setSelected',
    'click .dropdown-menu': 'stopPropagation'
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
    this.$el.find(this.menuSelector).addClass(this.hiddenClass);
    this.removeBodyListener();
  },

  showMenu: function() {
    this.$el.find(this.menuSelector).removeClass(this.hiddenClass);
    $('body').on('click', this.hideMenu.bind(this));
  },

  removeBodyListener: function() {
    $('body').off('click', this.hideMenu.bind(this));
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

  stopPropagation: function(e) {
    e.stopPropagation();
  },

  afterSelect: function() {
    //overwrite me in subclass if you need to do stuffs
  },

  getSelectedValue: function() {
    return this.model.selected;
  }

});
