describe("NailPolish.Widget.Dropdown", function(){
  var dropdownView, options, opts, triggerEvent;

  beforeEach(function() {
    HoganTemplates['dropdown'] = Hogan.compile(
      '<body>' +
        '<div class="dropdown-toggle">' +
          '<div id="search-channel" class="title">'+
            '{{selected_value}}' +
          '</div>' +
          '<span class="caret"></span>' +
        '</div>'+
        '<ul class="dummy-dropdown-menu hidden">' +
          '{{#selectable_items}}'+
            '<li class="menu-item" data-option={{key}}>{{value}}</li>' +
          '{{/selectable_items}}' +
        '</ul>' +
      '</body>'
    );

    options = {"option1": "Option 1", 'option2': "Option 2"};

    View = NailPolish.Widget.Dropdown.extend({
      templateName: 'dropdown',
      selectedOption: '#search-channel',
      menuSelector: '.dropdown-menu',
      hiddenClass: 'hidden',
      parentSelector: '#jasmine_content'
    });

    DummyDropdown = NailPolish.Models.Dropdown.extend({options: options});

    model = new DummyDropdown({ name: 'dummy' });
    dropdownView = new View({model: model});
    triggerEvent = jasmine.createSpyObj('event', [ 'stopPropagation' ]);
    dropdownView.render();
  })

  afterEach(function(){
    $('#jasmine_content').html("")
  });

  describe('#toggle', function() {
    describe('the menu is hidden', function() {
      it('should show the menu', function() {
        spyOn($.fn, "is").and.returnValue(false);
        dropdownView.toggle(triggerEvent);
        expect($('.dummy-dropdown-menu').hasClass('hidden')).toBeFalsy();
      });
    });

    describe('the menu is visible', function() {
      it('should hide the menu', function() {
        spyOn($.fn, "is").and.returnValue(true);
        $('.dummy-dropdown-menu').removeClass('hidden');
        dropdownView.toggle(triggerEvent);
        expect($('.dummy-dropdown-menu').hasClass('hidden')).toBeTruthy();
      });
    });
  });

  describe('clicking a menu-item', function() {
    it('should set the selected value to the selected item', function() {
      dropdownView.$('.menu-item')[1].click();
      expect(dropdownView.model.selected()).toBe("option2")
    });

    it('should close the menu', function() {
      dropdownView.$('.menu-item')[1].click();
      expect($('.dummy-dropdown-menu').hasClass('hidden')).toBeTruthy();
    });
  });

  describe('click outside of the menu when the menu is open', function() {
    it('should close the menu', function() {
      spyOn($.fn, "is").and.returnValue(true);
      dropdownView.showMenu();
      $('body').trigger('click');
      expect($('.dummy-dropdown-menu').hasClass('hidden')).toBeTruthy();
    });
  });
});

