var React = require('react');
var Table = require('react-bootstrap').Table;
var SlackerItem = require('./slacker_item.react');
var _ = require('lodash');

var SlackerList = React.createClass({
  propTypes: {
    onRemove: React.PropTypes.func.isRequired
  },

  render: function() {
    var slackers = [];
    var that = this;
    _.forEach(this.props.slackers, function(item) {
      slackers.push(<SlackerItem onRemove={that.props.onRemove} name={item.name} salary={item.monthlyNetSalary} index={item.id} key={item.id} /> );
    });

    return (
      <div>
        <Table>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Monthly Net Salary</th>
              <th>Remove?</th>
            </tr>
          </thead>
          <tbody>
            {slackers}
          </tbody>
        </Table>
        </div>
    );
  }
});

module.exports = SlackerList;
