/* eslint-env node */
module.exports = {

  description: 'Adds an icon to the ui-icon mapping.',

  availableOptions: [
    {
      name: 'modifier',
      type: String,
      default: ''
    },
    {
      name: 'font-name',
      type: String,
      default: ''
    },
    {
      name: 'syfl-icon',
      type: Boolean,
      default: false
    }
  ],

  beforeInstall(options) {
    const newIconName = options.entity.name;
    const iconFontName = options.fontName;
    const modifier = options.modifier;
    const isSyflIcon = options.syflIcon;

  }
};
