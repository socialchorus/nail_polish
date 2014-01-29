NailPolish.Widget.Menu = NailPolish.View.extend({
//  templateName: 'templates/menu',
//  parentSelector: '#header .menu-container',
//  attachmentMethod: "prepend",

  addListeners: {
    "click .menu-trigger": 'toggleMenu',
    "click .nav-item a": 'navigate' // see comment in navigate
  },

  toggleMenu: function(e) {

    // XXX FIXME drop-down-menu => menu?

    if (this.$('.drop-down-menu').css('display') == 'block') {
      this.hideMenu();
    } else {
      this.hideAllMenus();
      this.showMenu(e);
    }
  },

  showMenu: function(e) {
    e.stopPropagation();
    e.preventDefault();
    this.$('.menu-trigger').addClass("selected");
    this.$('.drop-down-menu').css("display", "block");
    this.onBodyClick = this.hideMenu.bind(this);
    $('body').on(NailPolish.Events.click, this.onBodyClick);
  },

  hideMenu: function() {
    this.$('.menu-trigger').removeClass("selected");
    this.$('.drop-down-menu').css("display", "none");
    this.removeBodyListener();
  },

  hideAllMenus: function() {
    $('.menu-trigger').removeClass("selected");
    $('.drop-down-menu').css("display", "none");
  },

  removeBodyListener: function() {
    if(this.onBodyClick){
      $('body').off(NailPolish.Events.click, this.onBodyClick);
      this.onBodyClick = undefined;
    }
  },

  // iphone has some issues going via the normal navigation in Backbone.js
  // both with js routes and with regular routes. We are sad :(
  navigate: function(e) {
    e.preventDefault();
    e.stopPropagation();
    var href = $(e.currentTarget).attr('href');
    var isJsRoute = href.match(/^#/);
    if (isJsRoute) {
      NailPolish.router.go(href);
    } else {
      NailPolish.Events.publish('redirect', href);
    }
    this.hideMenu();
  }
});
