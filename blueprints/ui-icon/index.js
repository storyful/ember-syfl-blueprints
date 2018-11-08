/* eslint-env node */
const fs = require('fs'),
    yaml = require('js-yaml');

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

  createIconString(options){
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

    let iconString = `\n${newIconName}:`;
    if(isSyflIcon){
      iconString = `${iconString}\n  name: ${newIconName}\n  font-prefix: syfl-icon\n  font: syfl-icon-font`;
    }
    else{
      iconString = `${iconString}\n  name: ${iconFontName}`;
      if(modifier){
        iconString = `${iconString}\n  modifier: ${modifier}`;
      }
    }

    return iconString;
  },

  sortIcons(){
    const jsonContent = yaml.load(fs.readFileSync(ICON_FILE, {encoding: 'utf-8'}));
    let sortedJsonContent = {};

    // sort icons alphabetically
    Object.keys(jsonContent).sort().forEach(function(key) {
      sortedJsonContent[key] = jsonContent[key];
    });

    return sortedJsonContent;
  },

  beforeInstall(options) {
    const newIconName = options.entity.name;
    const iconString = this.createIconString(options);
    // add new icon to yaml file
    fs.appendFileSync(ICON_FILE, iconString);
    
    const sortedIcons = this.sortIcons();
    // overwrite file by adding alphabetically sorted icons 
    fs.writeFileSync(ICON_FILE, yaml.safeDump(sortedIcons), 'utf8');

    console.log(`Updated icon file with new icon: ${newIconName}`); // eslint-disable-line no-console

  }
};
