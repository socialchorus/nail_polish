describe("NailPolish.Widget.Dropdown", function(){
  var dropdownView, options, opts;

  beforeEach(function() {
    HoganTemplates['dropdown'] = Hogan.compile(
      '<div class="dropdown-toggle">' +
        '<div id="search-channel" class="title">'+
          '{{selected_value}}' +
        '</div>' +
        '<span class="caret"></span>' +
      '</div>'+
      '<ul class="dropdown-menu hidden">' +
        '{{#selectable_items}}'+
          '<li class="menu-item" data-option={{key}}>{{value}}</li>' +
        '{{/selectable_items}}' +
      '</ul>'
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

    model = new DummyDropdown();
    dropdownView = new View({model: model});
    dropdownView.render();
  })

  afterEach(function(){
    $('#jasmine_content').html("")
  });

  describe('#toggle', function() {
    it('should toggle the hide/show class', function() {
      spyOn($.fn, "toggleClass").and.callThrough();
      dropdownView.toggle();
      expect($.fn.toggleClass).toHaveBeenCalled();
    });
  });

  describe('clicking a menu-itemnu item', function() {
    it('should set the selected value to the selected item', function() {
      dropdownView.$('.menu-item')[1].click();
      expect(dropdownView.model.selected()).toBe("option2")
    });
  });
});

