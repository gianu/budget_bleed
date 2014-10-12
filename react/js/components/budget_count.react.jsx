var React = require('react');
var ButtonToolbar = require('react-bootstrap').ButtonToolbar;
var Button = require('react-bootstrap').Button;

var SECONDS_TO_MONTH_RATIO = (60 * 60 * 24 * 22); // 60 seconds, 60 minutes, 24 hours, 22 working days

var BudgetCount = React.createClass({
  getInitialState: function() {
      return { totalBudget: 0.0 };
  },

  _getBudgetPerSecond: function(slackers) {
    var budgetPerMonth = +slackers.monthlyNet;
    return budgetPerMonth / SECONDS_TO_MONTH_RATIO;
  },

  _clearBudget: function() {
    this.setState({
      totalBudget: 0.0
    });
  },

  componentWillReceiveProps: function(nextProps) {
    var currentBudget = this.state.totalBudget + (this._getBudgetPerSecond(nextProps.slackers) * nextProps.secondsElapsed);
    this.setState({
      totalBudget: currentBudget
    });
  },

  _getClearButton: function() {
    if(this.props.secondsElapsed > 0) {
      return <Button bsStyle="danger" bsSize="large" disabled>Clear</Button>;
    } else {
      return <Button bsStyle="danger" bsSize="large" onClick={this._clearBudget}>Clear</Button>;
    }
  },

  render: function() {
    var button = this._getClearButton();
    return (
      <div className="budgetBleeder">
        <div className="budgetBleeder__budget">
          <h1>You are "investing": $ {this.state.totalBudget.toFixed(2)} so far</h1>
        </div>
        <div className="budgetBleeder__clear">
          <ButtonToolbar>
            {button}
          </ButtonToolbar>
        </div>
      </div>
    );
  }
});

module.exports = BudgetCount;
