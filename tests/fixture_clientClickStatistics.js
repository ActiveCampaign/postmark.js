var mocha = require('mocha');
var assert = require('assert');
var nconf = require('nconf');
var testingKeys = nconf.env().file({
  file: __dirname + '/../testing_keys.json'
});
var util = require('util');
var merge = require('merge');

var postmark = require('../lib/postmark/index.js');

describe('client click stats operations', function() {
  // allow some of the more intensive tests to take longer.
  this.timeout(30000);
  var _client = null;

  beforeEach(function() {
    _client = new postmark.Client(testingKeys.get('READ_LINK_TRACKING_TEST_SERVER_TOKEN'));
  });

  it('can get click counts', function(done) {
    _client.getClickCounts(done);
  });

  it('can get bounce counts', function(done) {
    _client.getMessageOpens(done);
  });

  it('can get browser usage', function(done) {
    _client.getBrowserUsage(done);
  });

  it('can get browser platforms', function(done) {
    _client.getBrowserPlatforms(done);
  });

  it('can get click location', function(done) {
    _client.getClickLocation(done);
  });

});