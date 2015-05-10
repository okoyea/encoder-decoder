require.config({
    paths: {
      'jquery': '../bower_components/jquery/dist/jquery.min'
    },
    shim: {
      'jquery': {
          exports: '$'
      }
    }
});

require(['factory','encoder','decoder','validator','jquery'], function(Factory, Encoder, Decoder, Validator, $){
  $('form#getInput').submit(function(event) {

    var factory = new Factory();
    var validator = new Validator();
    var result;

    var procedure =  $("input:radio[name=procedure]:checked").val();
    var val = $("input#converterInput").val();

    var authHash = validator.validateInput(val, procedure);
    var converter = factory.createConverter(procedure);

    if (authHash['valid']) {
      if (procedure ==='encode') {
        result = converter.encode(val);
      } else {
        hi = val.substr(0, 2)
        lo = val.substr(2, 4)
        result = converter.decode(hi,lo);

        // very important - second check to see if result integer is in range
        authHash = validator.validateInput(result);
      }

      $('#result').text(authHash['error'] ? authHash['error'] : result);
      $('#resultBox').show();
    } else {
      $('#result').text(authHash['error']);
      $('#resultBox').show();
    }

    event.preventDefault();
  });
});