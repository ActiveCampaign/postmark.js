var mocha = require('mocha');
var assert = require('assert');
var nconf = require('nconf');
var testingKeys = nconf.env().file({
    file: __dirname + '/testing_keys.json'
});
var util = require('util');
var merge = require('merge');

var postmark = require('../lib/postmark/index.js');

describe('client template handling', function() {
    this.timeout(10000);
    var _client = null;

    beforeEach(function() {
        _client = new postmark.Client(testingKeys.get('WRITE_TEST_SERVER_TOKEN'));
    });

    // it('should retrieve a list of templates.', function(done) {
    //     done();
    // });

    // it('should get a single template.', function(done) {
    //     done();
    // });

    // it('should get a update a template.', function(done) {
    //     done();
    // });

    // it('should get a create a template.', function(done) {
    //     done();
    // });

    // it('should get a delete a template.', function(done) {
    //     done();
    // });

    // it('send an email using a template.', function(done) {
    //     done();
    // });
});