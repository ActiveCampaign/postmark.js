"use strict";

var expect = require('expect.js');
var nconf = require('nconf');
var testingKeys = nconf.env().file({file: __dirname + '/../testing_keys.json'});
var helpers = require('./helpers.js');

var postmark = require('../lib/postmark/index.js');

describe('Client - Server', function() {
  this.timeout(10000);
  var prefix = "node-js-tests";
  var client = null;
  var accountToken = testingKeys.get('ACCOUNT_TOKEN')

  beforeEach(function() {
    client = new postmark.AdminClient(accountToken);
  });

  function cleanup() {
    var rulePrefixTester = new RegExp(prefix);
    var c = new postmark.AdminClient(accountToken);
    c.listServers(function(err, resp) {
      if (!err) {
        for (var i = 0; i < resp.Servers.length; i++) {
          var server = resp.Servers[i];
          if (rulePrefixTester.test(server.Name)) {
            c.deleteServer(server.ID, helpers.report);
          }
        }
      }
    });
  };

  before(cleanup);  
  after(cleanup);

  it("listServers", function(done) {
    client.listServers(function(err, servers) {
      client.getServer(servers.Servers[0].ID, done);
    });
  });

  it("createServer", function(done) {
    var name = prefix + '-' + new Date().valueOf();
    client.createServer({
      Name: name
    }, done);
  });

  it("editServer", function(done) {
    var name = prefix + '-' + new Date().valueOf();
    client.createServer({
      Name: name
    }, function(err, server) {
      client.editServer(server.ID, {
        Name: name + "-updated"
      }, done);
    });
  });

  it("deleteServer", function(done) {
    var name = prefix + '-' + new Date().valueOf();
    client.createServer({
      Name: name
    }, function(err, server) {
      client.deleteServer(server.ID, done);
    });
  });
});