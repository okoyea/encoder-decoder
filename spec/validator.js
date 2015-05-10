define(function(require) {
  var Validator = require('validator');
  var validator = new Validator();

  describe('validateInput', function() {

    it('should detect when input is empty', function() {
      var authHash = validator.validateInput('', 'encode');

      expect(authHash['error']).to.equal('Please enter a value');
    });

    it('should detect when input is not a number', function() {
      var authHash = validator.validateInput('asdf', 'encode');

      expect(authHash['error']).to.equal('Input is not a number');
    });

    it('should detect when input is out of range', function() {
      var authHash = validator.validateInput('10000', 'encode');

      expect(authHash['error']).to.equal('Input is out of range');
    });

    it('should detect when integer input is valid', function() {
      var authHash = validator.validateInput('1234', 'decode');

      expect(authHash['valid']).to.equal(true);
    });

    it('should detect when hex input is more than 4 digits', function() {
      var authHash = validator.validateInput('5f5f5', 'decode');

      expect(authHash['error']).to.equal('Input is not valid or out of range');
    });

    it('should detect when hex input is not in range', function() {
      var authHash = validator.validateInput('9g9g', 'decode');

      expect(authHash['error']).to.equal('Input is not valid or out of range');
    });

    it('should detect when hex input is valid', function() {
      var authHash = validator.validateInput('5f5f', 'decode');

      expect(authHash['valid']).to.equal(true);
    });
  });
});