var _ = require('lodash');

var Validator = (function() {
  var FLOAT_REGEXP = /^\d*(\.\d+)?$/;

  return {
    validNumber: function(number) {
      var parsedNumber = number;
      if(_.isString(number)) {
        if (number.length === 0 ) return false;
        parsedNumber = number.trim();
      }

      if(!FLOAT_REGEXP.test(parsedNumber) || parseFloat(parsedNumber) <= 0) {
        return false;
      }

      return true;
    },

    validName: function(name) {
      if(_.isNull(name)) return false;

      if(name.length === 0) return false;

      return true;
    }
  };
})();

module.exports = Validator;
