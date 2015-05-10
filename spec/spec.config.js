require.config({
  paths: {
    'factory'   : '../js/factory',
    'decoder'   : '../js/decoder',
    'encoder'   : '../js/encoder',
    'validator' : '../js/validator'
  }
});

define(function(require) {
  require([
    'encoder.js',
    'decoder.js',
    'converter.js',
    'validator.js'
  ], function(require) {
    mocha.run();
  });
});