define(function(require) {
  var Factory = require('factory');
  var factory = new Factory();
  var decoder = factory.createConverter('decode');
  var encoder = factory.createConverter('encode');

  describe('addPadding', function() {
    it('should add padding the input is too short', function() {
      var input = ["0", "1", "1", "1", "1", "1", "0", "0", "0", "1", "1", "1", "1"];
      var result = decoder.addPadding(input, 14 - input.length, 'array');

      expect(result.length).to.equal(14);
    });

    it('should not add padding the input is the right length', function() {
      var input = '1234';
      var result = decoder.addPadding(input, 4 - input.length, 'array');

      expect(result.length).to.equal(4);
    });
  });

  describe('translateRange', function() {
    it('should add 8192 when the procedure is encode', function() {
      encoder.val = 1000;
      encoder.translateRange();

      expect(encoder.val).to.equal(9192);
    });

    it('should subtract 8192 when the procedure is decode', function() {
      decoder.integer = 1000;
      decoder.translateRange();

      expect(decoder.integer).to.equal(-7192);
    });
  });
});