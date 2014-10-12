var React = require('react');

var SlackerItem = React.createClass({
  propTypes: {
    index: React.PropTypes.number.isRequired,
    name: React.PropTypes.string.isRequired,
    salary: React.PropTypes.number.isRequired,
    onRemove: React.PropTypes.func.isRequired
  },
  _onRemove: function() {
    this.props.onRemove(this.props.index);
  },

  render: function() {
    return (
      <tr>
        <td>{this.props.index}</td>
        <td>{this.props.name}</td>
        <td>{this.props.salary}</td>
        <td><a href="#" className="slackerList-item__remove" onClick={this._onRemove}>X</a></td>
      </tr>
    );
  }
});

module.exports = SlackerItem;
