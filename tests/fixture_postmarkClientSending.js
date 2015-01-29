var mocha = require('mocha');
var assert = require('assert');
var testingKeys = require('./testing_keys.json');
var util = require('util');

var postmark = require('../lib/postmark/index.js');

describe('client', function() {
  var _client = null;

  beforeEach(function() {
    _client = new postmark.Client(testingKeys.WRITE_TEST_SERVER_TOKEN);
  });

  describe('"legacy" initialization support', function() {
    it('properly handles options.', function() {
      var client = postmark(testingKeys.WRITE_TEST_SERVER_TOKEN, {
        testOption: 'asdf'
      });
      assert.notEqual(client, null);
      assert.equal(testingKeys.WRITE_TEST_SERVER_TOKEN, client.options.apiKey);
      assert.equal(client.options.testOption, 'asdf');
    });
  });

  it('should assign apiKey to options', function() {
    assert.equal(_client.options.ssl, true);
    assert.equal(_client.options.apiKey, testingKeys.WRITE_TEST_SERVER_TOKEN);
  });

  it('should send a single email', function(done) {
    _client.send({
      to: testingKeys.WRITE_TEST_EMAIL_RECIPIENT_ADDRESS,
      from: testingKeys.WRITE_TEST_SENDER_EMAIL_ADDRESS,
      subject: "Hello from the node.js client! " + new Date(),
      textBody: "Testing 1.2.3..."
    }, done);
  });

  it('should send a batch of emails', function(done) {
    var emailBatch = [];

    for (var i = 0; i < 5; i++) {
      emailBatch.push({
        to: testingKeys.WRITE_TEST_EMAIL_RECIPIENT_ADDRESS,
        from: testingKeys.WRITE_TEST_SENDER_EMAIL_ADDRESS,
        subject: "Hello from the node.js client! " + new Date(),
        textBody: "Testing batch email: " + i
      });
    }
    _client.batch([emailBatch], done);
  });
});