var React = require('react');
var Grid = require('react-bootstrap').Grid;
var Row = require('react-bootstrap').Row;
var Col = require('react-bootstrap').Col;
var ButtonToolbar = require('react-bootstrap').ButtonToolbar;
var Button = require('react-bootstrap').Button;
var juration = require('juration');

var Timer = React.createClass({
  getInitialState: function() {
      return {
        buttonName: 'Start!'
      }
  },

  _toggleTimer: function() {
      this.props.onTimerToggled();
      if (this.state.buttonName === "Start!") {
        this.setState({buttonName: "Stop!"});
      } else {
        this.setState({buttonName: "Start!"});
      }
  },

  _getTimeElapsed: function() {
    if (this.props.secondsElapsed && this.props.secondsElapsed > 0) {
      return juration.stringify(this.props.secondsElapsed, { format: 'short'});
    } else {
      return '0 secs';
    }
  },
  render: function() {
    return (
      <Grid>
        <Row>
          <Col md={8} xs={8}>
            <h2>{this._getTimeElapsed()}</h2>
          </Col>
          <Col md={2} xs={2}>
            <ButtonToolbar>
              <Button bsStyle="primary" bsSize="large" onClick={this._toggleTimer}>{this.state.buttonName}</Button>
            </ButtonToolbar>
          </Col>
        </Row>
      </Grid>
    );
  }
});

module.exports = Timer;
