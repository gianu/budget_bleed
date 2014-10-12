var React = require('react');

var SECONDS_TO_MONTH_RATIO = (60 * 60 * 24 * 22); // 60 seconds, 60 minutes, 24 hours, 22 working days

var BudgetCount = React.createClass({
  getInitialState: function() {
      return { totalBudget: 0.0 };
  },

  _getBudgetPerSecond: function(slackers) {
    var budgetPerMonth = +slackers.monthlyNet;
    return budgetPerMonth / SECONDS_TO_MONTH_RATIO;
  },

  componentWillReceiveProps: function(nextProps) {
    var currentBudget = this.state.totalBudget + (this._getBudgetPerSecond(nextProps.slackers) * nextProps.secondsElapsed);
    this.setState({
      totalBudget: currentBudget
    });
  },

  render: function() {
    return (
      <h1 className="bleeder">You are "investing": $ {this.state.totalBudget.toFixed(2)} so far</h1>
    );
  }
});

module.exports = BudgetCount;
