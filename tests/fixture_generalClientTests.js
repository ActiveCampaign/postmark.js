var mocha = require('mocha');
var assert = require('assert');
var nconf = require('nconf');
var testingKeys = nconf.env().file({
    file: __dirname + '/../testing_keys.json'
});
var util = require('util');
var merge = require('merge');

var postmark = require('../lib/postmark/index.js');

describe('general client functionality', function() {
    // allow some of the more intensive tests to take longer.
    this.timeout(30000);
    var _client = null;

    beforeEach(function() {
        _client = new postmark.Client(testingKeys.get('WRITE_TEST_SERVER_TOKEN'));
    });

    it('properly handles "legacy" options', function() {
        var client = postmark(testingKeys.get('WRITE_TEST_SERVER_TOKEN'), {
            testOption: 'asdf',
            ssl: false
        });

        assert.notEqual(client, null);
        assert.equal(testingKeys.get('WRITE_TEST_SERVER_TOKEN'), client.options.apiKey);
        assert.equal(client.options.testOption, 'asdf');
        assert.equal(client.options.ssl, false, "ssl should have been set to 'false'");
    });

    it('constructor assigns options.', function() {
        assert.equal(_client.options.ssl, true, "ssl should default to 'true'");
        assert.equal(_client.options.apiKey, testingKeys.get('WRITE_TEST_SERVER_TOKEN'));
    });
});

describe('integration test assertion', function() {
    it('should fail if a non-200 response comes back.', function(done) {
        // (almost) all of the tests in this project
        // work on the premise that if we send "good",
        // data to the server, and we get back a status
        // of 200, this means the API call worked.
        // 
        // The clients should also provide a status message
        // as an error in callbacks if we get anything BUT
        // a status code of 200, so (almost) all of the tests 
        // in this project simply pass those parameters back to "done",
        // 
        // Since "done" doesn't care about the second argument, this works
        // and "done" throws on any error. But, let's go ahead
        // and assert that here.

        var client = postmark(testingKeys.get('READ_SELENIUM_TEST_SERVER_TOKEN'))

        client.getBounces({
            count: "invalid count"
        }, function(err, result) {

            assert.equal(null, result);
            assert.equal(err.status, 422);
            assert.equal(err.message, 'Parameter \'count\' should be integer value');
            done();
        });
    });
});