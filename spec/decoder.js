define(function(require) {
  var Factory = require('factory');
  var factory = new Factory();
  var decoder = factory.createConverter('decode');

  describe('decode', function() {
    it('should decode hex input', function() {
      expect(decoder.decode('5d4f')).to.equal(3791);
    });
  });

  describe('convertToBinary', function() {
    it('should convert a 4 digit hex into an array containing 14-bit binary', function() {
      decoder.hex = 7967;
      decoder.convertToBinary();

      expect(decoder.bin.length).to.equal(14);
    });
  });

  describe('convertToInt', function() {
    it('should convert a binary array into an integer', function() {
      decoder.bin = ["0", "1", "1", "1", "1", "1", "0", "0", "0", "1", "1", "1", "1", "1"];
      decoder.convertToInt();

      expect(decoder.integer).to.equal(3999);
    });
  });
});