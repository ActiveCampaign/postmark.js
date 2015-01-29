// createTagTrigger
// editTagTrigger
// deleteTagTrigger
// getTagTrigger
// getTagTriggers
// createInboundRuleTrigger
// deleteInboundRuleTrigger
// getInboundRuleTriggers

var mocha = require('mocha');
var assert = require('assert');
var testingKeys = require('./testing_keys.json');
var util = require('util');
var merge = require('merge');

var postmark = require('../lib/postmark/index.js');

describe('client trigger handling', function() {
  this.timeout(30000);
  var _client = null;

  beforeEach(function() {
    _client = new postmark.Client(testingKeys.WRITE_TEST_SERVER_TOKEN);
  });

});