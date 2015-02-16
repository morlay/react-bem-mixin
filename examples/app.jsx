var ReactBemMixin = require('react-bem-mixin');

var TodoList = React.createClass({
  mixins: [ReactBemMixin],
  render: function () {
    var createItem = (function (itemText) {
      return <li className={this.$emx('item')}>{itemText}</li>;
    }).bind(this);
    return <ul className={this.$emx([{
      block: this.props.parentBlock,
      elem: this.$$block
    }])}>{this.props.items.map(createItem)}</ul>;
  }
});

var TodoApp = React.createClass({
  mixins: [ReactBemMixin],
  getInitialState: function () {
    return {
      items: [],
      text: ''
    };
  },
  onChange: function (e) {
    this.setState({
      text: e.target.value
    });
  },
  handleSubmit: function (e) {
    e.preventDefault();
    var nextItems = this.state.items.concat([this.state.text]);
    var nextText = '';
    this.setState({items: nextItems, text: nextText});
  },
  render: function () {
    return (
      <div className={this.$$block}>
        <h3 className={this.$emx('title')}>
          TODO
        </h3>
        <TodoList
          parentBlock={this.$$block}
          items={this.state.items} />
        <form
          className={this.$bemx('form', [{
            block: this.$$block,
            elem: 'form'
          }])} onSubmit={this.handleSubmit}>
          <input
            className={this.$bemx('form', 'input')}
            onChange={this.onChange}
            value={this.state.text} />
          <button
            className={this.$bemx('form', 'btn')}>
            {'Add #' + (this.state.items.length + 1)}
          </button>
        </form>
      </div>
    );
  }
});

React.render(<TodoApp />, document.body);
