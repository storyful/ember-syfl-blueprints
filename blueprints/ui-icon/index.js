/* eslint-env node */
const fs = require('fs');
const ICON_FILE = './addon/config/icons.yaml';

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

  checkIconExists(icon, isFontName){
    const content = fs.readFileSync(ICON_FILE);

    if(isFontName){
      return content.toString().indexOf(`: ${icon}`) >= 0
        || content.toString().indexOf(`name: ${icon}`) >= 0;
    }
    else{
      return content.toString().indexOf(`${icon}:`) >= 0;
    }
    
  },

  beforeInstall(options) {
    const newIconName = options.entity.name;
    const iconFontName = options.fontName;
    const modifier = options.modifier;
    const isSyflIcon = options.syflIcon;

    if(this.checkIconExists(newIconName) ){
      console.log('Icon mapping already exists'); // eslint-disable-line no-console
      return;
    }

    if(iconFontName && this.checkIconExists(iconFontName, true)){
      console.log('Icon Font Name already mapped'); // eslint-disable-line no-console
      return;
    }

    let text = `\n${newIconName}:`;
    if(isSyflIcon){
      text = `${text}\n  name: ${newIconName}\n  font-prefix: syfl-icon\n  font: syfl-icon-font`;
    }
    else{
      text = `${text}\n  name: ${iconFontName}`;
      if(modifier){
        text = `${text}\n  modifier: ${modifier}`;
      }
    }

    fs.appendFileSync(ICON_FILE, text);

    console.log(`Updated icon file with new icon: ${newIconName}`); // eslint-disable-line no-console
  }
};
