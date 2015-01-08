$:.push File.expand_path("../lib", __FILE__)

# Maintain your gem's version:
require "nail_polish/version"

# Describe your gem and declare its dependencies:
Gem::Specification.new do |s|
  s.name        = "nail_polish"
  s.version     = NailPolish::VERSION
  s.authors     = ["Kane Baccigalupi", "Marc Balderama", "Deepti Anand"]
  s.email       = ["developers@socialchorus.com"]
  s.homepage    = "http://github.com/socialchorus/nail_polish"
  s.summary     = "NailPolish is a Backbone/OOCSS engine for your Rails 4 app"
  s.description = "NailPolish is a Backbone/OOCSS engine for your Rails 4 app"

  s.files = Dir["{app,config,db,lib}/**/*", "MIT-LICENSE", "Rakefile", "README.rdoc"]

  s.add_dependency "rails", "~> 4.0.0"
  s.add_dependency 'mustache'
  s.add_dependency 'hogan_assets' # for client side packaging of mustache templates
  s.add_dependency 'compass-rails'
end
