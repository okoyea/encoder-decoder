define([], function () {
  var Encoder = function() {
    this.encode = function(val) {
      this.procedure = 'encode';
      this.val = Math.floor(val);

      this.translateRange();
      this.convertTo16Bit();
      this.clearMsbs();
      this.convertToHex();

      return this.hex;
    },

    this.convertTo16Bit = function() {
      var bytes = this.val.toString(2);

      this.bytes = this.addPadding(bytes, 16 - bytes.length, 'array');
    },

    this.convertToHex = function() {
      var hex = parseInt(this.bytes.join(''), 2).toString(16);

      if (hex.length === 4) {
        this.hex = hex.toUpperCase();
      } else {
        this.hex = this.addPadding(hex, 4 - hex.length).toUpperCase();
      }
    },

    this.clearMsbs = function() {
      this.bytes.shift();
      this.bytes.splice(8, 0, '0');
    }
  };

  return Encoder
});