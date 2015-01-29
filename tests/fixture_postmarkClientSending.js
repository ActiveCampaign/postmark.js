var mocha = require('mocha');
var assert = require('assert');
var testingKeys = require('./testing_keys.json');
var util = require('util');
var merge = require('merge');

var postmark = require('../lib/postmark/index.js');

describe('client email sending', function() {
  // allow some of the more intensive tests to take longer.
  this.timeout(30000);
  var _client = null;

  beforeEach(function() {
    _client = new postmark.Client(testingKeys.WRITE_TEST_SERVER_TOKEN);
  });

  it('can send single email', function(done) {
    _client.send({
      To: testingKeys.WRITE_TEST_EMAIL_RECIPIENT_ADDRESS,
      From: testingKeys.WRITE_TEST_SENDER_EMAIL_ADDRESS,
      Subject: "Hello from the node.js client! " + new Date(),
      TextBody: "Testing 1.2.3..."
    }, done);
  });

  it('can send a batch of emails', function(done) {
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