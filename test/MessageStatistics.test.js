"use strict";

var expect = require('expect.js');
var nconf = require('nconf');
var testingKeys = nconf.env().file({file: __dirname + '/../testing_keys.json'});

var postmark = require('../lib/postmark/index.js');

describe('Client - Message Statistics', function () {
    this.timeout(30000);
    var client = null;
    var serverToken = testingKeys.get('SERVER_TOKEN');

    beforeEach(function () {
        client = new postmark.Client(serverToken);
    });

    it('getDeliveryStatistics', function (done) {
        client.getDeliveryStatistics(done);
    });

    it('getSentCounts', function (done) {
        client.getSentCounts(done);
    });

    it('getBounceCounts', function (done) {
        client.getBounceCounts(done);
    });

    it('getSpamComplaints', function (done) {
        client.getSpamComplaints(done);
    });

    it('getTrackedEmailCounts', function (done) {
        client.getTrackedEmailCounts(done);
    });

    it('getBounceCounts', function (done) {
        client.getBounceCounts(done);
    });

    it('getOutboundOverview', function (done) {
        var now = new Date();
        var yesterday = new Date(now.valueOf() - (24 * 3600 * 1000));
        var toDate = '' + now.getFullYear() + '-' + (now.getMonth() + 1) + '-' + now.getDate();
        var fromDate = '' + yesterday.getFullYear() + '-' + (yesterday.getMonth() + 1) + '-' + yesterday.getDate();

        client.getOutboundOverview({fromdate: fromDate, todate: toDate}, done);
    });
});