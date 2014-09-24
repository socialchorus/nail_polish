describe("NailPolish.Widget.StackableModal", function() {
  afterEach(function() {
    NailPolish.Widget.StackableModal.stackedModalsCount = 0;
  });

  it("unfreezes the body after the last rendered modal is closed", function() {
    spyOn(NailPolish.Widget.Modal.prototype, 'render');
    spyOn(NailPolish.Widget.Modal.prototype, 'unfreezeBody');

    var modalOne = new NailPolish.Widget.StackableModal();
    var modalTwo = new NailPolish.Widget.StackableModal();
    var modalThree = new NailPolish.Widget.StackableModal();
    modalOne.render();
    modalTwo.render();
    modalThree.render();

    modalOne.close();
    expect(NailPolish.Widget.Modal.prototype.unfreezeBody).not.toHaveBeenCalled();

    modalTwo.close();
    expect(NailPolish.Widget.Modal.prototype.unfreezeBody).not.toHaveBeenCalled();

    modalThree.close();
    expect(NailPolish.Widget.Modal.prototype.unfreezeBody).toHaveBeenCalled();
  });
});
