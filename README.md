# NailPolish: SocialChorus/SocialChorus OO Frontend

NailPolish is the frontend framework SocialChorus created to encapsulate our modified version of OOCS and our Backbone conventions across our customer-facing applications.

NailPolish extends Backbone.js. So, if you’re not familiar with Backbone, you might want to start here: http://backbonetutorials.com.

## Setting Up a NailPolish Application

Each app that uses NailPolish needs 4 files to start up:
* namespace
* init/initialize
* app
* router

### Namespace

Namespace sets the naming for the app.

```
MyApp = {
  Collections: {
    Blogs: { }
  },
  Views: {
    Admin: {
      New: {
        Modal: {}
      }
    },
  },
  Presenters: {},
  Mixins: {},
  Models: {
    Admin: {},
  Blog: {}
  }
}
```

This allows you to write:

```MyApp.Models.Admin```

without throwing the error:

```Cannot read property ‘Admin’ of undefined.```

### Init/Initialize

This is where you set the app that you’re using, start it up, and subscribe to events. If you look at the NailPolish `events`, you can see that it gives you the ability to `subscribe`, unsubscribe and publish events.

```
 MyApp.initialize = function() {
   this.app = new MyApp.App($('.app-content'));
   this.app.start();

  NailPolish.Events.subscribe('someEvent', function(message) {
    var someEvent = new Something.Views.SomeEvent({model: message});
    someEvent.render();
    someEvent.show();
  });
};
```

### App

The App extends the NailPolish App. It sets many things, including bootstrap (and the repository), the routerClass, subviews, and anything that needs to be initialized.

```
MyApp.App = NailPolish.App.extend({
  init: function() {},

  bootstrap: function () {
    var someBootstrappedData = this.someBootstrapData(this.someBootstrapDataSelector);

    var repository = {
      blogs: new MyApp.Collections.Blogs(someBootstrappedData.blogs),
      admin: new MyApp.Model.Admin(someBootstrappedData.admin)
    };
    return repository;
  },

  subviews: function() {
    return [
      new Subview.someCall()
    ];
  },

  routerClass: function() {
    return MyApp.Router;
  }
});
```

### Router

Sets the Backbone routes:

```
MyApp.Router = NailPolish.Router.extend({
  init: function() {
    this.$el = $('.app-content');
  },

  routes: {
    "admins-dashboard" : "goToAdminsDashboard"
  },

  goToAdminsDashboard: function() {

  }
});
```

## Views, Models, and Presenters

NailPolish views and models inherit from Backbone. Backbone views handle templates and events. Backbone models handle the data. Here are some really great tutorials on Backbone: TODO.

To create a new view, extend the NailPolish view like so:

```App.Views.Something = NailPolish.View.extend({})```

and add these several items:

```
templateName: "some/template",
parentSelector: ".this-parent",
className: "this-class",

addListeners {
  'click .button' : 'renderSomething'
}
```

The parentSelector tells the view where to append the template to, and the className wraps around the template.

The presenter class is a common design pattern that NailPolish adds on top of the Backbone suite. NailPolish has implemented the pattern and presenters can be created by extending the NailPolish presenter class. The presenter class lies between the view and the model. It handles the logic and acts as a serializer for the data. Presenter classes can be set in the views like so:

```
presenterClass: function() {
    return MyApp.Presenters.Something;
},
```

The original NailPolish Presenter is created like this:

```
NailPolish.Presenter = function(presented) {
  this.presented = presented || {};
  this.initialize();
  this.init();
};
```

The way to get the “presented” data from the presenter is to call:

```this.presented.get(‘attribute’)```

## OOCSS

Our app works off of Object-oriented CSS. To read further about OOCSS style, please research stubbornella: http://oocss.org/. One of the key elements is keeping a grid style (http://oocss.org/grids_docs.html) for your CSS and making it reusable and DRY, just like your code.

NailPolish is meant to be implemented from mobile first to desktop last, building the mobile version and then building on top of the mobile version to the tablet, then to the desktop.

One of the first folders you’ll want to explore is the app/assets/stylesheets/nailpolish/ folder. This is where all of our scss is located. This lists the styles for the base (mobile), tablet, tablet_and_desktop (when combined), and finally desktop.

### Colors

These are all set in variable names, allowing them to be reused throughout your app:

```$neutral-superlight-color: #eee;```

Variables

Some examples of useful variables to use:

```
$em: 18px;
$spacing: 10px;
$line-height: 1.6;
$border-radius-size: 5px;
$page-width: 940px;
```

### Grid

Some important examples of styles in grid.scss:

```
.unit{float:left;}
.unit-right{float:right;}

.size1of1{width:100%;}
.size1of2{width:50%;}

.last-unit{float:none;width:auto;_position:relative;_left:-3px;_margin-right:-3px;}

.s-row {
  width: 100%;
  @include line;
}

.inner {
  padding: $spacing;
  @include line;
}

.spacer {
  width: $spacing;
  height: $spacing;
}
```

Rows and units are both part of the grid system for OOCSS (http://oocss.org/grids_docs.html). Rows (or s-rows, for small rows) take up the whole width of the given container. Units float left, unit-rights float right, and either of these classes can have .sizenofn added to them in order to specify a width. Last units take up the whole rest of the allotted container.

Inners add padding. Spacers will give you space between elements when they’re needed.

## JavaScript

Another part of NailPolish you may want to explore is under app/assets/javascripts/nail_polish. This includes the base app to inherit from, the events, models, presenter, views, router, and the validator. The validator handles validations for the models and can be used in the following manner inside a model:

```
validate: function(attrs) {
  var validate = new NailPolish.Validator();
  validate.
    attribute("identifier").
    addRule("Don’t yak shave", validate.is.notYakShaving()).
    addRule("Harder Better Faster Stronger", validate.is.harderbetterfasterstronger())

  return validate.validate(attrs);
}
```

In this case, if your identifier was indeed yak shaving or not harder better faster stronger, then calling:

```model.isValid()```

will return a falsey value.

## TODO
* Hogan compilation for performance
* template in page render to prevent large resources
* widgets
  * Dropdown menu
  * back button
  * modal
  * form view
  * model view
  * collection view
* generators
  - view
  - template
  - presenter
  - specs for presenter and view
* js models
* simplified CSS

## Development
The current jasmine gem does not play well with engines.
To modify and test javascript, go into the spec/dummy directory and then
run `rake jasmine` or `rake jasmine:ci`.
