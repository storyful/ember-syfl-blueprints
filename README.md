# ember-syfl-blueprints

This addon injects an `NS` attribute to each component (the name of the component),
and appends it to the `classNames`.

A custom component blueprint adds a `<COMPONENT-NAME>.sass`
and includes all `components/*.sass` files in a `_components.sass` file.

Compatibility
------------------------------------------------------------------------------

* Ember.js v3.16 or above
* Ember CLI v2.13 or above
* Node.js v10 or above


Installation
------------------------------------------------------------------------------

A blueprint to add icons in [`ember-syfl-ui`](https://github.com/storyful/ember-syfl-ui)


## Installation and Usage

### Installation

```sh
$ npm install ember-syfl-blueprints --save-dev
```

### Usage

For a component:
```sh
$ ember g component some-component
```

For an icon:
```sh
$ ember g ui-icon icon-name
```
```sh
$ ember g ui-icon icon-name --modifier=fas --font-name=checklist
```

For a Storyful icon:
```sh
$ ember g ui-icon icon-name --syfl-icon
```

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


License
------------------------------------------------------------------------------

This project is licensed under the [MIT License](LICENSE.md).
