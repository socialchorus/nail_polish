NailPolish.Widget.Menu = NailPolish.View.extend({
  parentSelector: '.menu-container',
  templateName: 'nail_polish/templates/menu',
  addListeners: {
    "click .menu-trigger": 'toggleMenu',
    "click .menu-item a": 'menuItemClick'
  },

  onMenuItemClick: function (e) {
    // hook in here
  },

  presenterClass: function() {
    return NailPolish.Presenter.Menu;
  },

  toggleMenu: function(e) {
    if (this.menuIsVisible()) {
      this.hideMenu();
    } else {
      this.hideAllMenus();
      this.showMenu(e);
    }
  },

  menuIsVisible: function() {
    return this.$('.menu-items').is(':visible');
  },

  showMenu: function(e) {
    this.$('.menu-trigger').addClass("selected");
    this.$('.menu-items').css("display", "block");
    this.onBodyClick = this.hideMenu.bind(this);
    $('body').on(NailPolish.Events.click, this.onBodyClick);
    e.stopPropagation();
    e.preventDefault();
  },

  hideMenu: function() {
    this.$('.menu-trigger').removeClass("selected");
    this.$('.menu-items').css("display", "none");
    this.removeBodyListener();
  },

  hideAllMenus: function() {
    $('.menu-trigger').removeClass("selected");
    $('.menu-items').css("display", "none");
  },

  removeBodyListener: function() {
    if(this.onBodyClick){
      $('body').off(NailPolish.Events.click, this.onBodyClick);
      this.onBodyClick = undefined;
    }
  },

  menuItemClick: function(e) {
    this.onMenuItemClick(e);
    this.hideMenu();
  }
});
