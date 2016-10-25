var mocha = require('mocha');
var assert = require('assert');
var nconf = require('nconf');
var testingKeys = nconf.env().file({
    file: __dirname + '/../testing_keys.json'
});
var util = require('util');
var merge = require('merge');

var postmark = require('../lib/postmark/index.js');

describe('client tag handling', function() {
    this.timeout(5000);
    var prefix = "node-js-tests";

    var _client = null;

    beforeEach(function() {
        _client = new postmark.Client(testingKeys.get('WRITE_TEST_SERVER_TOKEN'));
    });

    after(function() {
        var rulePrefixTester = new RegExp(prefix);
        var c = new postmark.Client(testingKeys.get('WRITE_TEST_SERVER_TOKEN'));
        c.getInboundRuleTriggers(function(err, trigs) {
            if (!err) {
                for (var i = 0; i < trigs.InboundRules.length; i++) {
                    var trigger = trigs.InboundRules[i];
                    if (rulePrefixTester.test(trigger.Rule)) {
                        c.deleteInboundRuleTrigger(trigger.ID);
                    }
                }
            }
        });

        c.getTagTriggers(function(err, trigs) {
            if (!err) {
                for (var i = 0; i < trigs.Tags.length; i++) {
                    var trigger = trigs.Tags[i];
                    if (rulePrefixTester.test(trigger.MatchName)) {
                        c.deleteTagTrigger(trigger.ID);
                    }
                }
            }
        });
    });

    it('can create a tag trigger', function(done) {
        _client.createTagTrigger({
            MatchName: prefix + "-" + new Date().valueOf(),
            TrackOpens: true
        }, done);
    });

    it('can edit a tag trigger', function(done) {
        var name = prefix + "-" + new Date().valueOf();
        _client.createTagTrigger({
            MatchName: name,
            TrackOpens: true
        }, function(err, trigger) {
            _client.editTagTrigger(trigger.ID, {
                MatchName: name + "-updated",
                TrackOpens: false
            }, done);
        });

    });

    it('can can delete a tag trigger', function(done) {
        var name = prefix + "-" + new Date().valueOf();
        _client.createTagTrigger({
            MatchName: name,
            TrackOpens: true
        }, function(err, trigger) {
            _client.deleteTagTrigger(trigger.ID, done);
        });
    });

    it('can get a tag trigger', function(done) {
        var name = prefix + "-" + new Date().valueOf();
        _client.createTagTrigger({
            MatchName: name,
            TrackOpens: true
        }, function(err, trigger) {
            _client.getTagTrigger(trigger.ID, done);
        });
    });

    it('can get tag triggers', function(done) {
        _client.getTagTriggers({
            count: 1
        }, done);
    });

    it('can get inbound rule triggers', function(done) {
        _client.getInboundRuleTriggers({
            count: 1
        }, done);
    });

    it('can create inbound rule triggers', function(done) {
        _client.createInboundRuleTrigger({
            Rule: name = prefix + "-" + new Date().valueOf() + "@example.com"
        }, done);
    });

    it('can delete inbound rule triggers', function(done) {
        _client.createInboundRuleTrigger({
            Rule: name = prefix + "-" + new Date().valueOf() + "@example.com"
        }, function(err, trigger) {
            _client.deleteInboundRuleTrigger(trigger.ID, done);
        });
    });

});