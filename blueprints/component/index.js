/* eslint-env node */

'use strict';

/* eslint-disable */
const fs   = require('fs');
const path = require('path');
const stringUtil = require('ember-cli-string-utils');
const pathUtil = require('ember-cli-path-utils');
const validComponentName = require('ember-cli-valid-component-name');
const getPathOption = require('ember-cli-get-component-path-option');
const normalizeEntityName = require('ember-cli-normalize-entity-name');
const isModuleUnificationProject = require('../module-unification').isModuleUnificationProject;
/* eslint-enable */

function updateImportStatements(){
  let importStatements = [];
  let component_name = this.options.entity.name;
  let type = 'sass';
  const nested = component_name.indexOf('/') >= 0;
  let nestedFile = null, nestedComponentsPath = null, folder = null;

  if (type) {
    let stylePath = path.join('app', 'styles');
    let componentsPath = path.join('app', 'styles', 'components');
    let file =  path.join(stylePath, `_components.${type}`);
    
    if(nested){
      folder = component_name.split('/')[0];
      nestedFile = path.join(componentsPath, `_${folder}.${type}`);
      nestedComponentsPath = path.join(componentsPath, folder);
    }

    if (!fs.existsSync(stylePath)) {
      this.ui.writeLine(`creating styles folder`);
      fs.mkdirSync(stylePath);
    }
    if (!fs.existsSync(componentsPath)){
      this.ui.writeLine(`creating components folder`);
      fs.mkdirSync(componentsPath);
    }

    if(nested){
      if (!fs.existsSync(nestedComponentsPath)){
        this.ui.writeLine(`creating nested components folder`);
        fs.mkdirSync(nestedComponentsPath);
      }

      this.ui.writeLine(`\n 🖌️  -- updating ${nestedFile}\n`);

      fs.readdir(nestedComponentsPath, (err, files) => {
        importStatements = files.map(file => `@import "components/${folder}/${file.split('.')[0]}"\n`);
        const importStatementSorted = importStatements.sort().join('');
        fs.writeFileSync(nestedFile, importStatementSorted);
      });
    }

    this.ui.writeLine(`\n 🖌️  -- updating ${file}\n`);

    fs.readdir(componentsPath, (err, files) => {
      importStatements = files.map(file => {
        if(file.indexOf('.') >= 0){
          return `@import "components/${file.split('.')[0]}"\n`;
        }
      });
      const importStatementSorted = importStatements.sort().join('');

      fs.writeFileSync(file, importStatementSorted);
    });
  }
}

module.exports = {
  description: 'Generates a component (and associated style files). Name must contain a hyphen.',

  availableOptions: [
    {
      name: 'path',
      type: String,
      default: 'components',
      aliases: [{ 'no-path': '' }],
    },
  ],

  filesPath: function() {
    let filesDirectory = 'files';

    if (isModuleUnificationProject(this.project)) {
      filesDirectory = 'module-unification-files';
    }

    return path.join(this.path, filesDirectory);
  },

  fileMapTokens: function() {
    if (isModuleUnificationProject(this.project)) {
      return {
        __root__(options) {
          if (options.inRepoAddon) {
            return path.join('packages', options.inRepoAddon, 'src');
          }
          if (options.inDummy) {
            return path.join('tests', 'dummy', 'src');
          }
          return 'src';
        },
        __path__(options) {
          return path.join('ui', 'components', options.dasherizedModuleName);
        },
      };
    } else {
      return {
        __path__: function(options) {
          if (options.pod) {
            return path.join(options.podPath, options.locals.path, options.dasherizedModuleName);
          } else {
            return 'components';
          }
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
        },
      };
    }
  },

  normalizeEntityName: function(entityName) {
    entityName = normalizeEntityName(entityName);

    return validComponentName(entityName);
  },

  locals: function(options) {
    let templatePath = '';
    let importTemplate = '';
    let contents = '';

    // if we're in an addon, build import statement
    if (options.project.isEmberCLIAddon() || (options.inRepoAddon && !options.inDummy)) {
      if (options.pod) {
        templatePath = './template';
      } else {
        templatePath =
          pathUtil.getRelativeParentPath(options.entity.name) +
          'templates/components/' +
          stringUtil.dasherize(options.entity.name);
      }
      importTemplate = "import layout from '" + templatePath + "';\n";
      contents = '\n  layout';
    }

    return {
      importTemplate: importTemplate,
      contents: contents,
      path: getPathOption(options),
    };
  },

  afterInstall() {
    updateImportStatements.bind(this)()
  },

  afterUninstall(){
    updateImportStatements.bind(this)()
  }
};
