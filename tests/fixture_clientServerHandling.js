var mocha = require('mocha');
var assert = require('assert');
var nconf = require('nconf');
var testingKeys = nconf.env().file({
  file: __dirname + '/../testing_keys.json'
});
var util = require('util');
var merge = require('merge');

var postmark = require('../lib/postmark/index.js');

describe('client server handling', function() {
  this.timeout(10000);
  var _client = null;

  beforeEach(function() {
    _client = new postmark.Client(testingKeys.get('WRITE_TEST_SERVER_TOKEN'));
  });

  it("should retrieve current server", function(done) {
    _client.getServer(done);
  });

  it("should edit current server", function() {
    var newName = "node-js-base-test-server" + (new Date()).toISOString()
    _client.editServer({
      Name: newName
    }, function(err, updatedServer) {
      _client.getServer(function(err, server) {
        assert.equal(server.Name, updatedServer.Name);
        assert.equal(server.Name, newName);

      });
    });
  });
});