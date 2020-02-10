import Component from '@ember/component';
import layout from '../components/my-component';

export default class MyComponent extends Component {
  layout = layout;

  classNames = ['has-custom-class'];
}
