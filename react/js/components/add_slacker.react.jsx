var React = require('react/addons');
var ButtonToolbar = require('react-bootstrap').ButtonToolbar;
var Button = require('react-bootstrap').Button;
var Input = require('react-bootstrap').Input;

var ENTER_KEY_CODE = 13;

var AddSlacker = React.createClass({
  mixins: [React.addons.LinkedStateMixin],

  getInitialState: function() {
    return {
      name: '',
      monthlyNetSalary: ''
    };
  },

  _saveRegister: function() {
    this.props.onSlackerAdded(this.state.name, +this.state.monthlyNetSalary);
    this.setState({
      name: '',
      monthlyNetSalary: ''
    });

    this.refs.name.getDOMNode().focus();
  },

  _onKeyDown: function(event) {
    if (event.keyCode == ENTER_KEY_CODE) {
      this._saveRegister();
    }
  },

  componentDidMount: function() {
    this.refs.name.getDOMNode().focus();
  },

  render: function() {
    return (
      <div>
        <h3>Add a Slacker</h3>
        <div className="slackerForm">
          <div className="slackerForm__name">
            <label htmlFor="name" className="slackerForm__name-label">Name</label>
            <input name="name" ref="name" type="text" placeholder="Insert name of the slacker here"
                   valueLink={this.linkState('name')} className="slackerForm__name-input"
                   onKeyDown={this._onKeyDown}/>
          </div>

          <div className="slackerForm__salary">
            <label htmlFor="monthlyNetSalary" className="slackerForm__salary-label">Salary</label>
            <input name="monthlyNetSalary" ref="monthlyNetSalary" type="text"
                   placeholder="Insert monthly net salary of the slacker" valueLink={this.linkState('monthlyNetSalary')}
                   className="slackerForm__salary-input" onKeyDown={this._onKeyDown} />
          </div>

          <div className="slackerForm__submit">
            <ButtonToolbar>
              <Button bsStyle="primary" onClick={this._saveRegister}>Save</Button>
            </ButtonToolbar>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = AddSlacker;
