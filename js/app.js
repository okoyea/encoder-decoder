$(document).ready(function() {
  $('form#getInput').submit(function(event) {
    var converter = new Converter();
    var procedure =  $("input:radio[name=procedure]:checked").val();
    var val = $("input#converterInput").val();
    var authHash = converter.validateInput(val, procedure);
    var result;

    if (authHash['valid']) {
      if (procedure ==='encode') {
        result = converter.encode(val);
      } else {
        hi = val.substr(0, 2)
        lo = val.substr(2, 4)
        result = converter.decode(hi,lo);

        // very important - second check to see if result integer is in range
        authHash = converter.validateInput(result);
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