# ember-cli-syfl-blueprints

Ember and Ember-Data specific blueprints for Storyful projects.

## Installation and Usage

### Installation

* $ `yarn add github:storyful/ember-cli-syfl-blueprints --dev`

### Usage

* $ `ember g component some-component`

## Notes

#### Component

* Includes namespaced className and makes it available for the template.
* Uses recomended syntax for components
* Generates `.sass` file inside components folder
* Refreshes `_components.sass`
* Integration tests checks for class presence and if yield works

## Contributing

### Installation

* `git clone <repository-url>` this repository
* `cd ember-cli-syfl-blueprints`
* `npm install`

### Running

* `ember serve`
* Visit your app at [http://localhost:4200](http://localhost:4200).

### Running Tests

* `npm test` (Runs `ember try:each` to test your addon against multiple Ember versions)
* `ember test`
* `ember test --server`

For more information on using ember-cli, visit [https://ember-cli.com/](https://ember-cli.com/).
