var mocha = require('mocha');
var assert = require('assert');
var nconf = require('nconf');
var testingKeys = nconf.env().file({
  file: __dirname + '/../testing_keys.json'
});
var util = require('util');
var merge = require('merge');

var postmark = require('../lib/postmark/index.js');

describe('admin client server management', function() {
  this.timeout(4000);
  var prefix = "node-js-tests";

  var _client = null;

  beforeEach(function() {
    _client = new postmark.AdminClient(testingKeys.get('WRITE_ACCOUNT_TOKEN'));
  });

  after(function() {
    var rulePrefixTester = new RegExp(prefix);
    var c = new postmark.AdminClient(testingKeys.get('WRITE_ACCOUNT_TOKEN'));
    c.listServers(function(err, resp) {
      if (!err) {
        for (var i = 0; i < resp.Servers.length; i++) {
          var server = resp.Servers[i];
          if (rulePrefixTester.test(server.Name)) {
            c.deleteServer(server.ID);
          }
        }
      }
    });
  });

  it("can get a server", function(done) {
    _client.listServers(function(err, servers) {
      _client.getServer(servers.Servers[0].ID, done);
    });
  });

  it("can create a server", function(done) {
    var name = prefix + '-' + new Date().valueOf();
    _client.createServer({
      Name: name
    }, done);
  });

  it("can edit a server", function(done) {
    var name = prefix + '-' + new Date().valueOf();
    _client.createServer({
      Name: name
    }, function(err, server) {
      _client.editServer(server.ID, {
        Name: name + "-updated"
      }, done);
    });
  });

  it("can delete a server", function(done) {
    var name = prefix + '-' + new Date().valueOf();
    _client.createServer({
      Name: name
    }, function(err, server) {
      _client.deleteServer(server.ID, done);
    });
  });

  it("can list servers", function(done) {
    _client.listServers({
      count: 1
    }, done);
  });
});