"use strict";

var expect = require('expect.js');
var nconf = require('nconf');
var testingKeys = nconf.env().file({file: __dirname + '/../../testing_keys.json'});

var postmark = require('../../lib/postmark/index.js');

describe('Client - Click Statistics', function() {
  this.timeout(30000);
  var client = null;
  var serverToken = testingKeys.get('SERVER_TOKEN');

  beforeEach(function() {
    client = new postmark.Client(serverToken);
  });

  it('getClickCounts', function(done) {
    client.getClickCounts(done);
  });

  it('getBrowserUsage', function(done) {
    client.getBrowserUsage(done);
  });

  it('getBrowserPlatforms', function(done) {
    client.getBrowserPlatforms(done);
  });

  it('getClickLocation', function(done) {
    client.getClickLocation(done);
  });
});