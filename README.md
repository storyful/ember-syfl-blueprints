# ember-syfl-blueprints

This addon injects an `NS` attribute to each component (the name of the component),
and appends it to the `classNames`.

It also contains a component blueprint that adds a `<COMPONENT-NAME>.sass`
and includes all `components/*.sass` files in a `_components.sass` file.

## Installation and Usage

### Installation

* $ `npm install ember-syfl-blueprints --save-dev`

### Usage

* $ `ember g component some-component`

## Notes

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

### Updating code

If you'd like to add changes, please send a PR with your changes and make sure
at least one other person reviews it!

For more information on using ember-cli, visit [https://ember-cli.com/](https://ember-cli.com/).

License
------------------------------------------------------------------------------

This project is licensed under the [MIT License](LICENSE.md).
