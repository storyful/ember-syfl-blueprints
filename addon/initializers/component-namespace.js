import Ember from 'ember';

export function initialize(/* application */) {
  Ember.Component.reopen({
    init() {
      this._super(...arguments);

      try {
        let arr = this.toString().match(/@component:.+?:/);
        let className = arr[0].split(':')[1];
        let ns = Ember.get(this, 'NS');

        if(ns){
          className = ns;
        } else {
          // if it is nested it contains a '/'
          if (~className.lastIndexOf('/')) {
            className = className.substring(className.lastIndexOf('/') + 1, className.length);
          }

          Ember.set(this, 'NS', className);
        }

        let classNames = this.classNames.concat(className);
        Ember.set(this, 'classNames', classNames);

      } catch (err) {
        return;
      }
    }
  });
}

export default {
  name: 'component-namespace',
  initialize
};
