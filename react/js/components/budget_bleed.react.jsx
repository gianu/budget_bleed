var React = require('react');
var Grid = require('react-bootstrap').Grid;
var Row = require('react-bootstrap').Row;
var Col = require('react-bootstrap').Col;
var Timer = require('./timer.react');
var _ = require('lodash');
var BudgetCount = require('./budget_count.react');
var SlackerList = require('./slacker_list.react');
var AddSlacker = require('./add_slacker.react');

var BudgetBleed = React.createClass({
  getInitialState: function() {
      return {
        secondsElapsed: 0,
        slackers: {
          list: [ {id: 1, name: 'Sergio Rafael Gianazza', monthlyNetSalary: 1000.00},
                   {id: 2, name: 'Leonardo Garcia Crespo', monthlyNetSalary: 1500.00}],
          monthlyNet: 2500.0,
          lastIndex: 2
        }
      };
  },

  tick: function() {
    this.setState({ secondsElapsed: this.state.secondsElapsed + 1 });
  },

  _toggleTimer: function() {
    if (this.interval) {
      clearInterval(this.interval);
      this.setState({ secondsElapsed: 0 });
      delete this.interval;
    } else {
      this.interval = setInterval(this.tick, 1000);
    }
  },

  _onSlackerAdded: function(name, salary) {
    var nameList = this.state.slackers.list;
    var newLastIndex = this.state.slackers.lastIndex + 1;
    nameList.push( { id: newLastIndex, name: name, monthlyNetSalary: salary });
    var newMonthlyNet = this.state.slackers.monthlyNet + +salary;
    this.setState({ slackers: {
      list: nameList,
      monthlyNet: newMonthlyNet,
      lastIndex: newLastIndex
      }
    });
  },

  _onSlackerRemoved: function(index) {
    var nameList = this.state.slackers.list;
    var removed = _.find(nameList, {id: index});
    var newMonthlyNet = this.state.slackers.monthlyNet - +removed.monthlyNetSalary;
    this.setState({
      slackers: {
        list: _.reject(nameList, { id: index }),
        monthlyNet: newMonthlyNet,
        lastIndex: this.state.slackers.lastIndex
      }
    });
  },

  render: function() {
    return (
      <Grid className="budgetBleederContainer">
        <Row>
          <Col xs={10} md={10}>
            <Timer onTimerToggled={this._toggleTimer} secondsElapsed={this.state.secondsElapsed} />
            <BudgetCount slackers={this.state.slackers} secondsElapsed={this.state.secondsElapsed}/>
          </Col>
        </Row>

        <Row>
          <Col xs={8} md={8}>
            <SlackerList slackers={this.state.slackers.list} onRemove={this._onSlackerRemoved}/>
          </Col>
          <Col xs={4} md={4}>
            <AddSlacker onSlackerAdded={this._onSlackerAdded} />
          </Col>
        </Row>
      </Grid>
    );
  }
});

module.exports.start = function(mountPoint) {
  React.renderComponent(
    <BudgetBleed />,
    mountPoint
  );
};
