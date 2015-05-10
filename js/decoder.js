define([], function () {
  var Decoder = function () {
    this.decode = function(hi, lo) {
      this.procedure = 'decode';
      this.val = hi + lo;

      this.hex = parseInt(this.val, 16);
      this.convertToBinary();
      this.convertToInt();
      this.translateRange();

      return this.integer;
    },

    this.convertToBinary = function() {
      var bin = this.hex.toString(2);

      this.bin = this.addPadding(bin, 14 - bin.length, 'array');
    },

    this.convertToInt = function() {
      this.bin.splice(7, 1);
      this.integer = parseInt(this.bin.join(''), 2);
    }
  };

  return Decoder;
});