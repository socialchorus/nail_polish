describe("NailPolish.Widget.Dropdown", function(){
  var dropdown, options, opts;

  beforeEach(function() {
    HoganTemplates['dropdown'] = Hogan.compile(
      '<div class="dropdown-toggle">' +
        '<div id="search-channel" class="title">'+
          '{{selected_value}}' +
        '</div>' +
        '<span class="caret"></span>' +
      '</div>'+
      '<ul class="dropdown-menu l-hidden">' +
        '{{#selectable_items}}'+
          '<li class="menu-item" data-option={{key}}>{{value}}</li>' +
        '{{/selectable_items}}' +
      '</ul>'
    );

    options = {"option1": "Option 1", 'option2': "Option 2"};

    var View = NailPolish.Widget.Dropdown.extend({
      model: {options: options, selected: ""},
      selectable: options,
      templateName: 'dropdown',
      selectedOption: '#search-channel',
      menuSelector: '.dropdown-menu',
      hiddenClass: 'l-hidden',
      parentSelector: '#jasmine_content'
    });

    dropdown = new View();
    dropdown.render();
  })

  afterEach(function(){
    $('#jasmine_content').html("")
  });

  describe('#toggle', function() {
    it('should toggle the hide/show class', function() {
      spyOn($.fn, "toggleClass").and.callThrough();
      dropdown.toggle();
      expect($.fn.toggleClass).toHaveBeenCalled();
    });
  });

  describe('clicking a menu item', function() {
    it('should set the selected value to the selected item', function() {
      dropdown.$('.menu-item')[0].click();
      expect(dropdown.model.selected).toBe("option2")
    });
  });
});

