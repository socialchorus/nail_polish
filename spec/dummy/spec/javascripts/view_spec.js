describe("NailPolish.View", function () {
  var view, ViewClass;

  beforeEach(function () {
    ViewClass = NailPolish.View.extend({
      className: 'view-class',
      templateName: 'view_class'
    });

    HoganTemplates['view_class'] = {
      render: function () {
        return "<div class='view-class-inner'>{{foo}}</div>";
      }
    };
  });

  it('is a Backbone.View', function () {
    var ViewClass = NailPolish.View.extend();
    view = new ViewClass();
    expect(view instanceof Backbone.View).toBe(true);
  });

  describe('initialization', function() {
    beforeEach(function() {
      ViewClass = NailPolish.View.extend();
    });

    it('will store the parent if given', function() {
      view = new ViewClass({parent: 'body'});
      expect(view.parent).toBe('body');
    });

    it('will store the attachmentMethod if given', function() {
      view = new ViewClass({attachmentMethod: 'prepend'});
      expect(view.attachmentMethod).toBe('prepend');
    });

    it('will store the parentSelector if given', function() {
      view = new ViewClass({parentSelector: '#foo'});
      expect(view.parentSelector).toBe('#foo');
    });

    it('will store the templateName if given',  function() {
      view = new ViewClass({templateName: 'template'});
      expect(view.templateName).toBe('template');
    });

    it('will put the presenterClass in a closure if given', function() {
      var PresenterClass = NailPolish.Presenter.extend();
      view = new ViewClass({presenterClass: PresenterClass});
      expect(view.presenterClass()).toBe(PresenterClass);
    })
  });

  describe("rendering", function () {
    beforeEach(function () {
      view = new ViewClass();
    });

    describe("rendering the template", function () {
      beforeEach(function () {
        view.render();
      });

      describe('when the template name is a function', function () {
        beforeEach(function(){
          view = new ViewClass({
            className: 'test-class',
            templateName: function(){ return 'something'}
            })

          HoganTemplates['something'] = {
            render: function () {
              return "<div class='test-class-inner'></div>";
            }
          };
        })

        it('renders via Backbone with the right class', function () {
          expect($(view.el).attr('class')).toBe('test-class');
        });


        it('renders the related Hogan template', function () {
          view.render();
          expect(view.$('.test-class-inner').length).toBe(1);
        });
      });

      describe('there is no template specified', function () {
        beforeEach(function () {
          HoganTemplates['view_class'] = undefined;
        });

        it('doesnt explode', function () {
          var thrown = true;
          try {
            view.render();
            thrown = false;
          } catch (e) {
          }

          expect(thrown).toBeFalsy();
        })
      });

      it('renders via Backbone with the right class', function () {
        expect($(view.el).attr('class')).toBe('view-class');
      });

      it('renders the related Hogan template', function () {
        expect(view.$('.view-class-inner').length).toBe(1);
      });

      it("fires off an event on window (so that the placeholder shim can do its job in IE)", function () {
        var spy = jasmine.createSpy();
        view.listenTo($(window), 'NPView::Rendered', spy);
        view.render();
        expect(spy).toHaveBeenCalled();
      });
    });

    describe('using the presenter', function () {
      beforeEach(function () {
        spyOn(view, 'presenter').and.returnValue({foo: 'bar'});
        spyOn(HoganTemplates['view_class'], 'render');
      });

      it('passes the presenter to HoganTemplates as the view model', function () {
        view.render();
        var mostRecentCall = HoganTemplates['view_class'].render.calls.mostRecent();
        expect(mostRecentCall.args[0]).toEqual({foo: 'bar'});
      });
    });

    describe('partials used', function () {
      var partials;

      beforeEach(function () {
        partials = {other_view: '<span class="other"></span>'};
        spyOn(view, 'partials').and.returnValue(partials);
        spyOn(HoganTemplates['view_class'], 'render');
      });

      it('passes the partials to HoganTemplates', function () {
        view.render();
        var mostRecentCall = HoganTemplates['view_class'].render.calls.mostRecent();
        expect(mostRecentCall.args[1]).toEqual(partials);
      });
    });

    describe("attaching to parent", function () {
      var $parent;

      beforeEach(function () {
        view.attachmentMethod = 'html';
        $parent = $('<div class="goo"><div class="huh"></div></div>')
        spyOn(NailPolish.View.ParentFinder.prototype, 'perform').and.returnValue($parent);
      });

      it('performs the parent finder', function () {
        view.render();
        expect(NailPolish.View.ParentFinder.prototype.perform).toHaveBeenCalled()
      });

      it('attaches (using the method) current DOM to the parent', function () {
        view.render();
        expect($parent.find('.huh').length).toBe(0);
        expect($parent.find('.view-class').length).toBe(1);
      });
    });

    describe("rendering subviews", function () {
      var SubView;
      beforeEach(function () {
        SubView = NailPolish.View.extend({
          render: jasmine.createSpy('render')
        });

        view.subviews = function () {
          return [
            new SubView({model: {n: 1}}),
            new SubView({model: {n: 2}, parent: 'body'}),
          ];
        };

        view.repository = {hello: 'world'};
      });

      it('passes it down the repository', function() {
        view.render();

        _.each(view._subviews, function (sub) {
          expect(sub.repository).toBe(view.repository);
        });
      });

      it("should call render on each of the subviews", function () {
        view.render();
        _.each(view.subviews(), function (sub) {
          expect(sub.render).toHaveBeenCalled();
        });
      });

      it('stores the subviews, for cleanup later', function() {
        view.render();
        expect(view._subviews.length).toBe(2);
      });

      it("should set itself on subviews as the parent", function () {
        view.render();
        var sub = view._subviews[0];
        expect(sub.parent).toBe(view);
      });

      it("should not set itself on subviews as the parent if a parent already exists", function () {
        view.render();
        var sub = view._subviews[1];
        expect(sub.parent).not.toBe(view);
      });
    });
  });

  describe('presenter', function () {
    var ViewClass, MyPresenter;

    beforeEach(function () {
      MyPresenter = Backbone.Model.extend();
      spyOn(MyPresenter.prototype, 'initialize');
      spyOn(MyPresenter.prototype, 'toJSON').and.returnValue('myJSON');

      ViewClass = NailPolish.View.extend({
        presenterClass: function () {
          return MyPresenter;
        }
      });
    });

    it('builds a presenter from the configured class, using the model', function () {
      var model = new Backbone.Model();
      view = new ViewClass({model: model});
      view.presenter();
      expect(MyPresenter.prototype.initialize.calls.mostRecent().args[0]).toEqual(model);
    });

    it('builds a presenter from the configured class, using the collection', function () {
      var collection = new Backbone.Collection();
      view = new ViewClass({collection: collection});
      view.presenter();
      expect(MyPresenter.prototype.initialize.calls.mostRecent().args[0]).toEqual(collection);
    });

    it('adds the repository to the presenter', function() {
      MyPresenter = function() {};
      MyPresenter.prototype.toJSON = function() {
        return this.repository;
      };

      view = new ViewClass();
      view.repository = {do: 'it'};

      expect(view.presenter()).toEqual(view.repository);
    });

    it('calls toJSON on the presenter and returns it', function () {
      view = new ViewClass();
      expect(view.presenter()).toEqual('myJSON');
    });
  });

  describe('remove', function() {
    var SubView, view;

    beforeEach(function () {
      SubView = NailPolish.View.extend({
        subviews: function() {
          return [
            new SubView({model: {n: 1}}),
            new SubView({model: {n: 2}, parent: 'body'}),
          ];
        }
      });

      spyOn(Backbone.View.prototype, 'remove');

      view = new SubView();
    });

    it('calls "super"', function() {
      view.remove();
      expect(Backbone.View.prototype.remove).toHaveBeenCalled();
    });

    it('calls remove on each of its subviews', function() {
      view._subviews = view.subviews();
      _.each(view._subviews, function(subview) {
        spyOn(subview, 'remove');
      });

      view.remove();

      _.each(view._subviews, function(subview) {
        expect(subview.remove).toHaveBeenCalled();
      });
    });
  });
});
