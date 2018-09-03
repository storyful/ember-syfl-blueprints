import Component from '@ember/component';

/**
 * This initializer reopens components and injects an NS variable which is
 * the component's name. It also adds this value to the component's classNames.
 */

export function initialize( /* application */ ) {

  Component.reopen({

    init() {

      this._super(...arguments);

      try {

        // Gets the name of the component
        const componentPath = this.toString().match(/@component:.+?:/);

        // Get a potential explicitly set NS value
        const NS = this.get('NS');

        let className = componentPath ? componentPath[0].split(':')[1] : null;

        // If NS is explicitly set, assign it's value to classNames
        if (NS) { className = NS; }
        else {

          const cn = className;

          // If the component is nested...
          if (~cn.lastIndexOf('/')) {
            // ... it contains a '/', so we need to split it
            className = cn.substring(cn.lastIndexOf('/') + 1, cn.length);
          }

          // Set the NS value to the component
          this.set('NS', className);
        }

        // Add NS to the components' `classNames`
        const classNames = this.classNames.concat(className);
        this.set('classNames', classNames);

      } catch (err) { return; }

    }

  });
  
}

export default {
  name: 'component-namespace',
  initialize
};
