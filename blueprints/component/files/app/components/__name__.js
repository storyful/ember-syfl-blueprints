import Ember from 'ember';

const {
  Component,
  String: { w }
} = Ember;

const NS = '<%= dasherizedModuleName %>';

export default Component.extend({

  NS,

  classNames: w(NS)

});
