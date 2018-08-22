"use strict";

var expect = require('expect.js');
var nconf = require('nconf');
var testingKeys = nconf.env().file({file: __dirname + '/../testing_keys.json'});

var postmark = require('../lib/postmark/index.js');
var helpers = require('./helpers.js');

describe('Client - Triggers', function () {
    this.timeout(10000);
    var prefix = "node-js-tests";
    var client = null;
    var serverToken = testingKeys.get('SERVER_TOKEN');

    beforeEach(function () {
        client = new postmark.Client(serverToken);
    });

    after(function () {
        var rulePrefixTester = new RegExp(prefix);
        var c = new postmark.Client(serverToken);
        c.getInboundRuleTriggers(function (err, trigs) {
            if (!err) {
                for (var i = 0; i < trigs.InboundRules.length; i++) {
                    var trigger = trigs.InboundRules[i];
                    if (rulePrefixTester.test(trigger.Rule)) {
                        c.deleteInboundRuleTrigger(trigger.ID, helpers.report);
                    }
                }
            }
        });

        c.getTagTriggers(function (err, trigs) {
            if (!err) {
                for (var i = 0; i < trigs.Tags.length; i++) {
                    var trigger = trigs.Tags[i];
                    if (rulePrefixTester.test(trigger.MatchName)) {
                        c.deleteTagTrigger(trigger.ID, helpers.report);
                    }
                }
            }
        });
    });

    it('createTagTrigger', function (done) {
        client.createTagTrigger({
            MatchName: prefix + "-" + new Date().valueOf(),
            TrackOpens: true
        }, done);
    });

    it('editTagTrigger', function (done) {
        var name = prefix + "-" + new Date().valueOf();
        client.createTagTrigger({
            MatchName: name,
            TrackOpens: true
        }, function (err, trigger) {
            client.editTagTrigger(trigger.ID, {
                MatchName: name + "-updated",
                TrackOpens: false
            }, done);
        });

    });

    it('deleteTagTrigger', function (done) {
        var name = prefix + "-" + new Date().valueOf();
        client.createTagTrigger({
            MatchName: name,
            TrackOpens: true
        }, function (err, trigger) {
            client.deleteTagTrigger(trigger.ID, done);
        });
    });

    it('getTagTrigger', function (done) {
        var name = prefix + "-" + new Date().valueOf();
        client.createTagTrigger({
            MatchName: name,
            TrackOpens: true
        }, function (err, trigger) {
            client.getTagTrigger(trigger.ID, done);
        });
    });

    it('getTagTriggers', function (done) {
        client.getTagTriggers({
            count: 1
        }, done);
    });

    it('getInboundRuleTriggers', function (done) {
        client.getInboundRuleTriggers({
            count: 1
        }, done);
    });

    it('createInboundRuleTrigger', function (done) {
        client.createInboundRuleTrigger({
            Rule: name = prefix + "-" + new Date().valueOf() + "@example.com"
        }, done);
    });

    it('deleteInboundRuleTrigger', function (done) {
        client.createInboundRuleTrigger({
            Rule: name = prefix + "-" + new Date().valueOf() + "@example.com"
        }, function (err, trigger) {
            client.deleteInboundRuleTrigger(trigger.ID, done);
        });
    });
});