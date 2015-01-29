var mocha = require('mocha');
var assert = require('assert');
var testingKeys = require('./testing_keys.json');
var util = require('util');
var merge = require('merge');

var postmark = require('../lib/postmark/index.js');

describe('client', function() {
  // allow some of the more intensive tests to take longer.
  this.timeout(30000);
  var _client = null;

  beforeEach(function() {
    _client = new postmark.Client(testingKeys.WRITE_TEST_SERVER_TOKEN);
  });

  it('should return message opens', function(done) {
    //var client = postmark(testingKeys.WRITE_TEST_SERVER_TOKEN);
    _client.getMessageOpens({
      count: 10
    }, done);

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
      To: testingKeys.WRITE_TEST_EMAIL_RECIPIENT_ADDRESS,
      From: testingKeys.WRITE_TEST_SENDER_EMAIL_ADDRESS,
      Subject: "Hello from the node.js client! " + new Date(),
      TextBody: "Testing 1.2.3..."
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
    _client.batch(emailBatch, done);
  });
});