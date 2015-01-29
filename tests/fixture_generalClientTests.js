var mocha = require('mocha');
var assert = require('assert');
var testingKeys = require('./testing_keys.json');
var util = require('util');
var merge = require('merge');

var postmark = require('../lib/postmark/index.js');

describe('general client functionality', function() {
  // allow some of the more intensive tests to take longer.
  this.timeout(30000);
  var _client = null;

  beforeEach(function() {
    _client = new postmark.Client(testingKeys.WRITE_TEST_SERVER_TOKEN);
  });

  it('properly handles "legacy" options', function() {
    var client = postmark(testingKeys.WRITE_TEST_SERVER_TOKEN, {
      testOption: 'asdf',
      ssl: false
    });

    assert.notEqual(client, null);
    assert.equal(testingKeys.WRITE_TEST_SERVER_TOKEN, client.options.apiKey);
    assert.equal(client.options.testOption, 'asdf');
    assert.equal(client.options.ssl, false, "ssl should have been set to 'false'");
  });

  it('constructor assigns options.', function() {
    assert.equal(_client.options.ssl, true, "ssl should default to 'true'");
    assert.equal(_client.options.apiKey, testingKeys.WRITE_TEST_SERVER_TOKEN);
  });
});