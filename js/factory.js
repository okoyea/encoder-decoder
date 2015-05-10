define(['encoder', 'decoder'], function (Encoder, Decoder) {
  var Factory = function() {
    this.createConverter = function(type) {
      var converter;

      if (type === 'encode') {
        converter = new Encoder();
      } else {
        converter = new Decoder();
      }

      converter.procedure = type;

      converter.translateRange = function() {
        if (this.procedure === 'encode') {
          this.val += 8192;
        } else {
          this.integer -= 8192;
        }
      }

      converter.addPadding = function(input, length, type) {
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

      return converter;
    }
  };

  return Factory
});