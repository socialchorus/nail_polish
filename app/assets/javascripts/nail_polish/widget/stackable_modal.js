NailPolish.Widget.StackableModal = NailPolish.Widget.Modal.extend({
  parentSelector: "#stackable-overlay-container",
  attachmentMethod: "append",
  baseModalTemplateName: "nail_polish/templates/stackable_modal",
  overlaySelector: ".overlay",

  render: function() {
    NailPolish.Widget.Modal.prototype.render.apply(this);
    NailPolish.Widget.StackableModal.stackedModalsCount += 1;
  },

  close: function (e) {
    NailPolish.Widget.StackableModal.stackedModalsCount -= 1;
    NailPolish.Widget.Modal.prototype.close.apply(this);
  },

  unfreezeBody: function() {
    if (NailPolish.Widget.StackableModal.stackedModalsCount === 0) {
      NailPolish.Widget.Modal.prototype.unfreezeBody.apply(this);
    }
  }
});

NailPolish.Widget.StackableModal.stackedModalsCount = 0;
