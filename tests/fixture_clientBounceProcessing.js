var mocha = require('mocha');
var assert = require('assert');
var nconf = require('nconf');
var testingKeys = nconf.env().file({
  file: __dirname + '/../testing_keys.json'
});
var util = require('util');
var merge = require('merge');

var postmark = require('../lib/postmark/index.js');

describe('client bounce operations', function() {
  this.timeout(30000);
  var _client = null;

  beforeEach(function() {
    _client = new postmark.Client(testingKeys.get('READ_SELENIUM_TEST_SERVER_TOKEN'));
  });

  it('can get get bounce', function(done) {
    _client.getBounces({
      count: 1
    }, function(err, bounces) {
      _client.getBounce(bounces.Bounces[0].ID, done);
    });
  });

  it('can get bounces', function(done) {
    _client.getBounces({
      count: 10
    }, done);
  });

  it('can get bounce dump', function(done) {
    _client.getBounces({
      count: 1
    }, function(err, bounces) {
      _client.getBounceDump(bounces.Bounces[0].ID, done);
    });
  });

  it('can get bounce tags', function(done) {
    _client.getBounceTags(done);
  });

  // activateBounce cannot be directly tested from integration tests.
});