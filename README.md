# ember-syfl-blueprints

Ember and Ember-Data specific blueprints for Storyful projects.

## Installation and Usage

### Installation

* $ `yarn add github:storyful/ember-syfl-blueprints --dev`

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
* `cd ember-syfl-blueprints`
* `npm install`

### Running

* `npm run lint:hbs`
* `npm run lint:js`
* `npm run lint:js -- --fix`

### Running tests

* `ember test` – Runs the test suite on the current Ember version
* `ember test --server` – Runs the test suite in "watch mode"
* `ember try:each` – Runs the test suite against multiple Ember versions

For more information on using ember-cli, visit [https://ember-cli.com/](https://ember-cli.com/).

License
------------------------------------------------------------------------------

This project is licensed under the [MIT License](LICENSE.md).
