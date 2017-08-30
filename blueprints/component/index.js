/* eslint-env node */
'use strict';

const path = require('path');
const fs = require('fs');

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

  afterInstall() {
    updateImportStatements.bind(this)()
  },

  afterUninstall(){
    updateImportStatements.bind(this)()
  }
}
