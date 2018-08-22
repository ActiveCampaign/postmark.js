"use strict";

var expect = require('expect.js');
var nconf = require('nconf');
var testingKeys = nconf.env().file({file: __dirname + '/../../testing_keys.json'});

var postmark = require('../../lib/postmark/index.js');

describe('Client - Open Statistics', function () {
    this.timeout(30000);
    var client = null;
    var serverToken = testingKeys.get('SERVER_TOKEN');

    beforeEach(function () {
        client = new postmark.Client(serverToken);
    });

    it('getMessageOpens', function (done) {
        client.getMessageOpens({count: 5}, done);
    });

    it('getEmailOpenCounts', function (done) {
        client.getEmailOpenCounts(done);
    });

    it('getEmailPlatformUsage', function (done) {
        client.getEmailPlatformUsage(done);
    });

    it('getEmailClientUsage', function (done) {
        client.getEmailClientUsage(done);
    });

    it('getMessageOpens', function (done) {
        client.getMessageOpens({
            count: 1
        }, function (err, batch) {
            if (err) {
                done(err);
            } else {
                client.getMessageOpensForSingleMessage(batch.Opens[0].MessageID, { count: 1}, done);
            }
        });
    });

});