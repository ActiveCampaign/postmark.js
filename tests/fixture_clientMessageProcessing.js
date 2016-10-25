var mocha = require('mocha');
var assert = require('assert');
var nconf = require('nconf');
var testingKeys = nconf.env().file({
  file: __dirname + '/../testing_keys.json'
});
var util = require('util');
var merge = require('merge');

var postmark = require('../lib/postmark/index.js');

describe('client message processing', function() {
  this.timeout(30000);

  it('can search outbound message', function(done) {
    var client = new postmark.Client(testingKeys.get('READ_SELENIUM_TEST_SERVER_TOKEN'));
    client.getOutboundMessages({
      count: 1
    }, done);
  });

  it('can get outbound message details', function(done) {
    var client = new postmark.Client(testingKeys.get('READ_SELENIUM_TEST_SERVER_TOKEN'));
    client.getOutboundMessages({
      count: 1
    }, function(err, msgs) {
      client.getOutboundMessageDetails(msgs.Messages[0].MessageID, done);
    });
  });

  it('can search inbound messages', function(done) {
    var client = new postmark.Client(testingKeys.get('READ_SELENIUM_TEST_SERVER_TOKEN'));
    client.getInboundMessages({
      count: 1
    }, done);
  });

  it('can get inbound message details', function(done) {
    var client = new postmark.Client(testingKeys.get('READ_SELENIUM_TEST_SERVER_TOKEN'));
    client.getInboundMessages({
      count: 1
    }, function(err, msgs) {
      client.getInboundMessageDetails(msgs.InboundMessages[0].MessageID, done);
    });
  });

  // Integration tests cannot easily test "bypassBlockedInboundMessage"
});