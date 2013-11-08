NailPolish.View.Modal = NailPolish.View.extend({
  templateName: 'modals/base',
  parentSelector: "#overlay-container",

  render: function() {
    NailPolish.View.prototype.render.call(this);
    var pageHeight = $('body').css('height');
    $('#overlay').css('height', pageHeight);
  }
});