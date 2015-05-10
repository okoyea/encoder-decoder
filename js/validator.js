define([], function () {
  var Validator = function() {
    this.validateInput = function(val, procedure) {
      var valid = true;
      var error = null;
      var valLength = val.length;

      if (val === '') {
        error = 'Please enter a value'
      }

      if (val < -8192 || val > 8191) {
        error = 'Input is out of range';
      }

      if (isNaN(val) && procedure === 'encode') {
        error = 'Input is not a number';
      }

      if (error === null && procedure === 'decode') {
        valid = /^[0-9A-Fa-f]+$/.test(val);

        if (!valid || valLength > 4 || valLength < 4) {
          error = 'Input is not valid or out of range';
        }
      }

      // if we have any errors at this point, input is invalid
      if (error !== null) {
        valid = false;
      }

      return { valid: valid, error: error };
    }
  };

  return Validator
});
