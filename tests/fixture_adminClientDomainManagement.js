var mocha = require('mocha');
var assert = require('assert');
var nconf = require('nconf');
var testingKeys = nconf.env().file({
  file: __dirname + '/../testing_keys.json'
});
var util = require('util');
var merge = require('merge');

var postmark = require('../lib/postmark/index.js');

describe('admin client domain management', function() {
  this.timeout(4000);
  var prefix = 'node-js-test-domain';

  var _client = null;
  var _domainName = null;
  var _returnPath = null;

  beforeEach(function() {
    _client = new postmark.AdminClient(testingKeys.get('WRITE_ACCOUNT_TOKEN'));

    _domainName = prefix + '-' + testingKeys.get('WRITE_TEST_DOMAIN_NAME');
    _returnPath = 'return.' + _domainName;
  });

  after(function() {
    var rulePrefixTester = new RegExp(prefix);
    var c = new postmark.AdminClient(testingKeys.get('WRITE_ACCOUNT_TOKEN'));
    c.listDomains(function(err, resp) {
      if (!err) {
        for (var i = 0; i < resp.Domains.length; i++) {
          var domain = resp.Domains[i];
          if (rulePrefixTester.test(domain.Name)) {
            c.deleteDomain(domain.ID);
          }
        }
      }
    });
  });

  it("can create a domain", function(done) {
    _client.createDomain({
      Name: _domainName,
      ReturnPathDomain: _returnPath
    }, done);
  });

  it("can list domains", function(done) {
    _client.listDomains(done);
  });

  it("can get a domain", function(done) {
    _client.createDomain({
      Name: 'get-test-' + _domainName
    }, function(err, domain) {
      _client.getDomain(domain.ID, done);
    });
  });
  
  it("can edit a domain", function(done) {
    editTestDomain = 'edit-test-' + _domainName
    _client.createDomain({
      Name: editTestDomain,
      ReturnPathDomain: 'return.' + editTestDomain
    }, function(err, domain) {
      _client.editDomain(domain.ID, {
        ReturnPathDomain: "updated-return." + editTestDomain
      }, done);
    });
  });

  it("can delete a domain", function(done) {
    _client.createDomain({
      Name: 'delete-test-' + _domainName
    }, function(err, domain) {
      _client.deleteDomain(domain.ID, done);
    });
  });

  it("can verify SPF for domain", function(done) {
    _client.createDomain({
      Name: 'spf-test-' + _domainName
    }, function(err, domain) {
      _client.verifyDomainSPF(domain.ID, done);
    });
  });

  // testing cannot easily verify DKIM requests.
  // rotateDKIMForDomain
});
