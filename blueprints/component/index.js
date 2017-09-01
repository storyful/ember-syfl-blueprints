/* eslint-env node */
'use strict';

const path  = require('path');
const fs    = require('fs');

function updateImportStatements(){
  let importStatements = [];
  let type = 'sass';

  if (type) {
    let stylePath = path.join('app', 'styles');
    let file = path.join(stylePath, `_components.${type}`);

    let componentsPath = path.join('app', 'styles', 'components');

    if (!fs.existsSync(stylePath)) {
      fs.mkdirSync(stylePath);
    }

    this.ui.writeLine(`updating ${file}`);

    fs.readdir(componentsPath, (err, files) => {
      importStatements = files.map(file => `@import "components/${file.split('.')[0]}"\n`);
      fs.writeFile(file, importStatements.join(''));
    });
  }
}

module.exports = {
  description : 'Generates a component. Name must contain a hyphen.',

  fileMapTokens: function() {
    return {
      __path__: function(options) {
        if (options.pod) {
          return path.join(options.podPath, options.locals.path, options.dasherizedModuleName);
        }
        return 'components';
      },
      __templatepath__: function(options) {
        if (options.pod) {
          return path.join(options.podPath, options.locals.path, options.dasherizedModuleName);
        }
        return 'templates/components';
      },
      __templatename__: function(options) {
        if (options.pod) {
          return 'template';
        }
        return options.dasherizedModuleName;
      }
    };
  },

  afterInstall() {
    updateImportStatements.bind(this)()
  },

  afterUninstall(){
    updateImportStatements.bind(this)()
  }
}
