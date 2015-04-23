function Converter() {

  this.encode = function(val) {
  // encodes the input by converting it into a 4-character hex string
    this.procedure = 'encode';
    this.val = Math.floor(val);

    this.translateRange();
    this.convertTo16Bit();
    this.clearMsbs();
    this.convertToHex();

    return this.hex;
  },

  this.decode = function(hi, lo) {
  // decodes the input by converting it into an integer
    this.procedure = 'decode';
    this.val = hi + lo;

    this.hex = parseInt(this.val, 16);
    this.convertToBinary();
    this.convertToInt();
    this.translateRange();

    return this.integer;
  },

  this.validateInput = function(val, procedure) {
    var valid = true;
    var error = null;
    var valLength = val.length;

    if (val === '') {
      error = 'Please enter a value'
    }

    if (isNaN(val) && procedure === 'encode') {
      error = 'Input is not a number';
    } else if (val < -8192 || val > 8191) {
      error = 'Input is out of range';
    } else if (val > -8192 && val < 8191 && val.length > 4) {
      error = 'Input is invalid';
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
  },

  this.translateRange = function() {
    if (this.procedure === 'encode') {
      this.val += 8192;
    } else {
      this.integer -= 8192;
    }
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

  this.convertToBinary = function() {
    var bin = this.hex.toString(2);

    this.bin = this.addPadding(bin, 14 - bin.length, 'array');
  },

  this.convertToInt = function() {
    this.bin.splice(7, 1);
    this.integer = parseInt(this.bin.join(''), 2);
  },

  this.clearMsbs = function() {
    this.bytes.shift();
    this.bytes.splice(8, 0, '0');
  },

  this.addPadding = function(input, length, type) {
    if (input instanceof Array) {
      type = type || 'arr';
    } else {
      input = input.split('');
      type = type || 'str';
    }

    if (length) {
      var i = 0;
      while (i < length) {
        input.unshift('0');
        i++;
      }
    }

    return type !== 'str' ? input : input.join('');
  }
};
