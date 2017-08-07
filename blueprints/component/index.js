/* eslint-env node */
'use strict';

const path = require('path');
const fs = require('fs');

module.exports = {
  description : 'Generates a component. Name must contain a hyphen.',

  afterInstall() {
    let type = 'sass';
    let importStatement = '\n@import "'+this.dasherizedModuleName+'";\n';

    if (type) {
      let stylePath = path.join('app', 'styles');
      let file = path.join(stylePath, `app.${type}`);

      if (!fs.existsSync(stylePath)) {
        fs.mkdirSync(stylePath);
      }

      if (fs.existsSync(file)) {
        this.ui.writeLine(`Added import statement to ${file}`);
        return this.insertIntoFile(file, importStatement, {});
      } else {
        fs.writeFileSync(file, importStatement);
        this.ui.writeLine(`Created ${file}`);
      }
    }
  }
}
