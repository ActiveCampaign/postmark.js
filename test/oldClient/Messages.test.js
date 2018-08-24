"use strict";

var chai  = require('chai');
var expect = chai.expect;
var nconf = require('nconf');
var testingKeys = nconf.env().file({file: __dirname + '/../../testing_keys.json'});

var postmark = require('../../lib/postmark/index.js');

describe('Client - Outbound Messages', function () {
    this.timeout(30000);
    var client = null;
    var serverToken = testingKeys.get('SERVER_TOKEN');

    beforeEach(function () {
        client = new postmark.Client(serverToken);
    });

    it('getOutboundMessages', function (done) {
        client.getOutboundMessages({
            count: 1
        }, done);
    });

    it('getOutboundMessageDetails', function (done) {
        client.getOutboundMessages({
            count: 1
        }, function (err, msgs) {
            client.getOutboundMessageDetails(msgs.Messages[0].MessageID, done);
        });
    });

    it('getInboundMessages', function (done) {
        client.getInboundMessages({
            count: 1
        }, done);
    });

    it('getInboundMessageDetails', function (done) {
        client.getInboundMessages({
            count: 1
        }, function (err, msgs) {
            client.getInboundMessageDetails(msgs.InboundMessages[0].MessageID, done);
        });
    });
});