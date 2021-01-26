/* eslint-env node */
const fs = require('fs');
const yaml = require('js-yaml');

const ICON_FILE = './addon/config/icons.yaml';

module.exports = {
  init() {
    this._super.init && this._super.init.apply(this, arguments);

    try {
      this.iconsYML = fs.readFileSync(ICON_FILE);
      this.icons = yaml.load(this.iconsYML);
    } catch (e) {
      console.error(
        // eslint-disable-line no-console
        `The icon file cannot be found, are you sure you're in ember-syfl-ui?`
      );
      throw 'Exiting blueprint.';
    }
  },

  description: 'Adds an icon to the ui-icon mapping.',

  availableOptions: [
    {
      name: 'modifier',
      type: String,
      default: '',
    },
    {
      name: 'font-name',
      type: String,
      default: '',
    },
    {
      name: 'syfl-icon',
      type: Boolean,
      default: false,
    },
  ],

  _isInYml(searchString) {
    return this.iconsYML.toString().indexOf(searchString) >= 0;
  },

  checkIconExists(icon, isFontName) {
    if (isFontName) {
      return this._isInYml(`: ${icon}`) || this._isInYml(`name: ${icon}`);
    } else {
      return this._isInYml(`${icon}:`);
    }
  },

  createIconObj(options) {
    const newIconName = options.entity.name;
    const iconFontName = options.fontName || newIconName; // Defaults back to given name
    const modifier = options.modifier;
    const isSyflIcon = options.syflIcon;

    if (this.checkIconExists(newIconName)) {
      throw 'Icon mapping already exists, exiting.';
    }

    if (iconFontName && this.checkIconExists(iconFontName, true)) {
      throw 'Icon Font Name already mapped, exiting.';
    }

    const icon = { name: iconFontName };

    if (isSyflIcon) {
      icon['font-prefix'] = 'syfl-icon';
      icon['font'] = 'syfl-icon-font';
    }

    if (modifier) icon['modifier'] = modifier;

    return icon;
  },

  getSortedIcons() {
    // const jsonContent = yaml.load(this.icons);
    const icons = this.icons;
    let _output = {};

    // sort icons alphabetically
    Object.keys(icons)
      .sort()
      .forEach(function (key) {
        _output[key] = icons[key];
      });

    return _output;
  },

  beforeInstall(options) {
    const iconObj = this.createIconObj(options);
    const newIconName = options.entity.name;

    this.icons[newIconName] = iconObj;
    const sortedIcons = this.getSortedIcons();

    // overwrite file by adding alphabetically sorted icons
    fs.writeFileSync(ICON_FILE, yaml.safeDump(sortedIcons), 'utf8');

    this.ui.writeLine(
      `Updated icon file with new icon: ${options.entity.name}`
    );
  },
};
