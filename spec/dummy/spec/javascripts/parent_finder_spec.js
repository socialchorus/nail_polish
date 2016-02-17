describe("NailPolish.View.ParentFinder", function() {
  var selector, attachmentMethod, parent, finder;

  beforeEach(function() {
    selector = '.find-me';
    attachmentMethod = 'append';
  });

  describe('when parent is undefined', function() {
    it("and selector is undefined it returns undefined", function() {
      finder = new NailPolish.View.ParentFinder(undefined, undefined, attachmentMethod);
      expect(finder.perform()).toBeUndefined();
    });

    describe('but their is a selector', function() {
      beforeEach(function() {
        finder = new NailPolish.View.ParentFinder(undefined, '#foo', attachmentMethod);
      });

      it('and the selector is globally available on the page', function() {
        $('body').append($('<div id="foo">bar</div>'));

        $parent = $('#foo');

        expect(finder.perform()).toEqual($parent);

        $parent.remove();
      });

      it('and the selector is not available globally', function() {
        expect(finder.perform()).toBeUndefined();
      });
    });
  });

  describe("when the parent responds to attachment method (a jqueryish thing)", function() {
    describe("but there is no selector", function() {
      beforeEach(function() {
        parent = {
          append: function () {}
        };

        finder = new NailPolish.View.ParentFinder(parent, undefined, attachmentMethod);
      });

      it("returns the parent", function() {
        expect(finder.perform()).toBe(parent);
      });
    });

    describe("and there is a selector", function() {
      describe("but the parent does not respond to find", function() {
        beforeEach(function() {
          parent = {
            append: function () {}
          };

          finder = new NailPolish.View.ParentFinder(parent, '#foo', attachmentMethod);
        });

        it("returns the undefined", function() {
          expect(finder.perform()).toBeUndefined();
        });
      });

      describe("and the selector can be found inside the parent", function() {
        beforeEach(function() {
          parent = $('<div class="foo"><span class="find-me"></span></div>');

          finder = new NailPolish.View.ParentFinder(parent, selector, attachmentMethod);
        });

        it("returns the element", function() {
          expect(finder.perform().hasClass('find-me')).toBe(true);
        });
      });

      describe('and the selector is the same as the parent\'s selector', function() {
        beforeEach(function() {
          parent = $('<div class="find-me"></div>');

          finder = new NailPolish.View.ParentFinder(parent, selector, attachmentMethod);
        });

        it('returns the parent', function() {
          expect(finder.perform().hasClass('find-me')).toBe(true);
        });
      });

      describe("but the selector cannot be found", function() {
        beforeEach(function() {
          parent = $('<div class="foo"></div>');
          finder = new NailPolish.View.ParentFinder(parent, selector, attachmentMethod);
        });

        it("returns the undefined", function() {
          expect(finder.perform()).toBe(undefined);
        });
      });
    });
  });

  describe('when the parent has a $el', function() {
    var parent;
    beforeEach(function() {
      parent = {
        $el: $('<div class="parent"><div class="find-me"></div></div>')
      }
    });

    describe('when there is a selector', function () {
      describe('can be found', function() {
        beforeEach(function() {
          finder = new NailPolish.View.ParentFinder(parent, selector, attachmentMethod);
        });

        it('returns the selector\'s DOM', function () {
          expect(finder.perform().hasClass('find-me')).toBeTruthy();
        })
      });

      describe('cannot be found', function() {
        beforeEach(function() {
          finder = new NailPolish.View.ParentFinder(parent, '.something-else', attachmentMethod);
        });

        it('will return undefined', function() {
          expect(finder.perform()).toBeUndefined();
        });
      });
    });

    describe('when there is no selector', function() {
      it('returns the $el', function() {
        finder = new NailPolish.View.ParentFinder(parent, undefined, attachmentMethod);
        expect(finder.perform()).toBe(parent.$el);
      });
    });
  });
});
