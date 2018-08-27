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
    var serverToken = testingKeys.get('SERVER_TOKEN');

    beforeEach(function () {
        client = new postmark.Client(serverToken);
    });

    it("getServer", function (done) {
        client.getServer(done());
    });

    it("editServer", function (done) {
        client.editServer({Color: 'red'}, done);
    });
});