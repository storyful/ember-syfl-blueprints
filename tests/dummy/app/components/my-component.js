import Component from '@glimmer/component';
import layout from '../components/my-component';

export default class MyComponent extends Component {
  layout = layout;

  classNames = ['has-custom-class'];
}
