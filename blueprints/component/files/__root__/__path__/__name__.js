import Ember from 'ember';

const { Component } = Ember;

const NS = '<%= dasherizedModuleName %>';

export default Component.extend({

  NS,

  classNames: [NS]

});
