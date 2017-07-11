var mocha = require('mocha');
var assert = require('assert');
var nconf = require('nconf');
var testingKeys = nconf.env().file({
  file: __dirname + '/../testing_keys.json'
});
var util = require('util');
var merge = require('merge');

var postmark = require('../lib/postmark/index.js');

describe('client open stats', function() {
  // allow some of the more intensive tests to take longer.
  this.timeout(30000);
  var _client = null;

  beforeEach(function() {
        _client = new postmark.Client(testingKeys.get('READ_SELENIUM_OPEN_TRACKING_TOKEN'));
  });

  it('can get message opens', function(done) {
    _client.getMessageOpens({
      count: 5
    }, done);
  });

  it('can get email open counts', function(done) {
    _client.getEmailOpenCounts(done);
  });

  it('can get email platform usage', function(done) {
    _client.getEmailPlatformUsage(done);
  });

  it('can get email client usage', function(done) {
    _client.getEmailClientUsage(done);
  });

  it('can get message opens for single message', function (done) {
    _client.getMessageOpens({
      count: 1
    }, function (err, batch) {
      if (err) {
        done(err);
      } else {
        _client.getMessageOpensForSingleMessage(batch.Opens[0].MessageID, {
          count: 1
        },
          done);
      }
    });
  });

});