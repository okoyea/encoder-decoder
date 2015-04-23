var converter = new Converter();

describe('encode', function() {
  it('should encode integer input', function() {
    expect(converter.encode(1234)).to.equal('4952');
  });
});


describe('decode', function() {
  it('should decode hex input', function() {
    expect(converter.decode('5d4f')).to.equal(3791);
  });
});


describe('translateRange', function() {
  it('should add 8192 when the procedure is encode', function() {
    converter.procedure = 'encode';
    converter.val = 1000;
    converter.translateRange();

    expect(converter.val).to.equal(9192);
  });

  it('should subtract 8192 when the procedure is decode', function() {
    converter.procedure = 'decode';
    converter.integer = 1000;
    converter.translateRange();

    expect(converter.integer).to.equal(-7192);
  });
});

describe('convertTo16Bit', function() {
  it('should convert input into an array containing a 16-bit integer', function() {
    converter.val = 1000;
    converter.convertTo16Bit();
    expect(converter.bytes.length).to.equal(16);
  });
});

describe('clearMsbs', function() {
  it('should clear the most significant bits', function() {
    converter.bytes = ["0", "0", "0", "0", "0", "0", "1", "1", "1", "1", "1", "0", "1", "0", "0", "0"];
    converter.clearMsbs();

    expect(converter.bytes[0]).to.equal('0');
    expect(converter.bytes[8]).to.equal('0');
  });
});

describe('convertToHex', function() {
  it('should convert an integer into a 4 digit hex', function() {
    converter.bytes = ["0", "0", "0", "0", "0", "1", "1", "1", "0", "1", "1", "0", "1", "0", "0", "0"];
    converter.convertToHex();

    expect(converter.hex).to.equal('0768');
    expect(converter.hex.length).to.equal(4);
  });
});

describe('convertToBinary', function() {
  it('should convert a 4 digit hex into an array containing 14-bit binary', function() {
    converter.hex = 7967;
    converter.convertToBinary();

    expect(converter.bin.length).to.equal(14);
  });
});

describe('convertToInt', function() {
  it('should convert a binary array into an integer', function() {
    converter.bin = ["0", "1", "1", "1", "1", "1", "0", "0", "0", "1", "1", "1", "1", "1"];
    converter.convertToInt();

    expect(converter.integer).to.equal(3999);
  });
});

describe('addPadding', function() {
  it('should add padding the input is too short', function() {
    var input = ["0", "1", "1", "1", "1", "1", "0", "0", "0", "1", "1", "1", "1"];
    var result = converter.addPadding(input, 14 - input.length, 'array');

    expect(result.length).to.equal(14);
  });

  it('should not add padding the input is the right length', function() {
    var input = '1234';
    var result = converter.addPadding(input, 4 - input.length, 'array');

    expect(result.length).to.equal(4);
  });
});


describe('validateInput', function() {

  it('should detect when input is empty', function() {
    var authHash = converter.validateInput('', 'encode');

    expect(authHash['error']).to.equal('Please enter a value');
  });

  it('should detect when input is not a number', function() {
    var authHash = converter.validateInput('asdf', 'encode');

    expect(authHash['error']).to.equal('Input is not a number');
  });

  it('should detect when input is out of range', function() {
    var authHash = converter.validateInput('10000', 'encode');

    expect(authHash['error']).to.equal('Input is out of range');
  });

  it('should detect when integer input is valid', function() {
    var authHash = converter.validateInput('1234', 'decode');

    expect(authHash['valid']).to.equal(true);
  });

  it('should detect when hex input is more than 4 digits', function() {
    var authHash = converter.validateInput('5f5f5', 'decode');

    expect(authHash['error']).to.equal('Input is not valid or out of range');
  });

  it('should detect when hex input is not in range', function() {
    var authHash = converter.validateInput('9f9f', 'decode');

    expect(authHash['error']).to.equal('Input is not valid or out of range');
  });

  it('should detect when hex input is valid', function() {
    var authHash = converter.validateInput('5f5f', 'decode');

    expect(authHash['valid']).to.equal(true);
  });

});


