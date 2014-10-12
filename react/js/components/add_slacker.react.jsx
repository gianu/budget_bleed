var React = require('react/addons');
var ButtonToolbar = require('react-bootstrap').ButtonToolbar;
var Button = require('react-bootstrap').Button;
var Alert = require('react-bootstrap').Alert;
var Validator = require('../utils/validator');

var ENTER_KEY_CODE = 13;

var AddSlacker = React.createClass({
  mixins: [React.addons.LinkedStateMixin],

  getInitialState: function() {
    return {
      name: '',
      monthlyNetSalary: '',
      invalidName: false,
      invalidSalary: false,
      errorText: ''
    };
  },

  _validate: function() {
    if (!Validator.validName(this.state.name)) {
      this.setState({
        invalidName: true,
        errorText: 'Name must not be empty'
      });

      return false;
    }

    if (!Validator.validNumber(this.state.monthlyNetSalary)) {
      this.setState({
        invalidSalary: true,
        errorText: 'Salary must be a positive number'
      });

      return false;
    }

    return true;
  },

  _saveRegister: function() {
    if(!this._validate()) return false;

    this.props.onSlackerAdded(this.state.name, +this.state.monthlyNetSalary);
    this.setState({
      name: '',
      monthlyNetSalary: ''
    });

    this.refs.name.getDOMNode().focus();
  },

  _onKeyDown: function(event) {
    this.setState({
      invalidSalary: false,
      invalidName: false,
      errorText: ''
    });

    if (event.keyCode == ENTER_KEY_CODE) {
      this._saveRegister();
    }
  },

  render: function() {
    var cx = React.addons.classSet;
    var alert = <noscript />;

    var nameClasses = cx({
      'slackerForm__name-input': true,
      'slackerForm__invalidInputField': this.state.invalidName
    });

    var salaryClasses = cx({
      'slackerForm__salary-input': true,
      'slackerForm__invalidInputField': this.state.invalidSalary
    });

    if (this.state.invalidSalary ||
        this.state.invalidName) {
      alert = <Alert bsStyle="danger"><strong>{this.state.errorText}</strong></Alert>
    }

    return (
      <div>
        {alert}
        <h3>Add a Slacker</h3>
        <div className="slackerForm">
          <div className="slackerForm__name">
            <label htmlFor="name" className="slackerForm__name-label">Name</label>
            <input name="name" ref="name" type="text" placeholder="Insert name of the slacker here"
                   valueLink={this.linkState('name')} className={nameClasses}
                   onKeyDown={this._onKeyDown} autoFocus={true}/>
          </div>

          <div className="slackerForm__salary">
            <label htmlFor="monthlyNetSalary" className="slackerForm__salary-label">Salary</label>
            <input name="monthlyNetSalary" ref="monthlyNetSalary" type="text"
                   placeholder="Insert monthly net salary of the slacker" valueLink={this.linkState('monthlyNetSalary')}
                   className={salaryClasses} onKeyDown={this._onKeyDown} />
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
