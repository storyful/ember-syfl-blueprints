import Component from '@glimmer/component';
<%= importTemplate %>
export default class <%= className %> extends Component {
  <%= contents %>

  NS = '<%= namespace %>';
};

