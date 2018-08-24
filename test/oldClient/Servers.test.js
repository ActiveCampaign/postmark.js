"use strict";

var chai  = require('chai');
var expect = chai.expect;
var nconf = require('nconf');
var testingKeys = nconf.env().file({file: __dirname + '/../../testing_keys.json'});
var helpers = require('./helpers.js');

var postmark = require('../../lib/postmark/index.js');

describe('Client - Servers', function () {
    this.timeout(10000);
    var client = null;
    var adminClient = null;
    var accountToken = testingKeys.get('ACCOUNT_TOKEN');
    var serverToken = testingKeys.get('SERVER_TOKEN');
    var prefix = "node-js-base-test-server"

    function cleanup() {
        var rulePrefixTester = new RegExp(prefix);
        var c = new postmark.AdminClient(accountToken);

        c.listServers(function (err, resp) {
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

    beforeEach(function () {
        client = new postmark.Client(serverToken);
        adminClient = new postmark.AdminClient(accountToken);
    });

    it("getServer", function (done) {
        client.getServer(done);
    });

    xit("editServer", function () {
        var name = prefix;

        adminClient.createServer({
            Name: name
        }, function (err, server) {
            client.editServer(server.ID, {
                Color: 'red'
            }, done);
        });
    });
});