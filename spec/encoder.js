define(function(require) {
  var Factory = require('factory');
  var factory = new Factory();
  var encoder = factory.createConverter('encode');

  describe('encode', function() {
    it('should encode integer input', function() {
      expect(encoder.encode(1234)).to.equal('4952');
    });
  });

  describe('convertTo16Bit', function() {
    it('should convert input into an array containing a 16-bit integer', function() {
      encoder.val = 1000;
      encoder.convertTo16Bit();
      expect(encoder.bytes.length).to.equal(16);
    });
  });

  describe('clearMsbs', function() {
    it('should clear the most significant bits', function() {
      encoder.bytes = ["0", "0", "0", "0", "0", "0", "1", "1", "1", "1", "1", "0", "1", "0", "0", "0"];
      encoder.clearMsbs();

      expect(encoder.bytes[0]).to.equal('0');
      expect(encoder.bytes[8]).to.equal('0');
    });
  });

  describe('convertToHex', function() {
    it('should convert an integer into a 4 digit hex', function() {
      encoder.bytes = ["0", "0", "0", "0", "0", "1", "1", "1", "0", "1", "1", "0", "1", "0", "0", "0"];
      encoder.convertToHex();

      expect(encoder.hex).to.equal('0768');
      expect(encoder.hex.length).to.equal(4);
    });
  });
});