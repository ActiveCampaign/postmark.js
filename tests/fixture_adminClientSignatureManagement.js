var mocha = require('mocha');
var assert = require('assert');
var nconf = require('nconf');
var testingKeys = nconf.env().file({
  file: __dirname + '/../testing_keys.json'
});
var util = require('util');
var merge = require('merge');

var postmark = require('../lib/postmark/index.js');

describe('admin client signature management', function() {
  this.timeout(4000);
  var prefix = "node-js-tests";

  var _client = null;
  var _email = null

  beforeEach(function() {

    _email = testingKeys.get('WRITE_TEST_SENDER_SIGNATURE_PROTOTYPE')
      .replace(/\[TOKEN]/i, prefix + new Date().valueOf());
    _client = new postmark.AdminClient(testingKeys.get('WRITE_ACCOUNT_TOKEN'));
  });

  after(function() {
    var rulePrefixTester = new RegExp(prefix);
    var c = new postmark.AdminClient(testingKeys.get('WRITE_ACCOUNT_TOKEN'));
    c.listSenderSignatures(function(err, resp) {
      if (!err) {
        for (var i = 0; i < resp.SenderSignatures.length; i++) {
          var signature = resp.SenderSignatures[i];
          if (rulePrefixTester.test(signature.Name)) {
            c.deleteSenderSignature(signature.ID);
          }
        }
      }
    });
  });

  it("can list signatures", function(done) {
    _client.listSenderSignatures(done);
  });

  it("can get a signature", function(done) {
    _client.createSenderSignature({
      Name: _email,
      FromEmail: _email
    }, function(err, signature) {
      _client.getSenderSignature(signature.ID, done);
    });
  });

  it("can create a signature", function(done) {
    _client.createSenderSignature({
      Name: _email,
      FromEmail: _email
    }, done);
  });

  it("can edit a signature", function(done) {
    _client.createSenderSignature({
      Name: _email,
      FromEmail: _email
    }, function(err, signature) {
      _client.editSenderSignature(signature.ID, {
        Name: _email + "-updated"
      }, done);
    });
  });

  it("can delete a signature", function(done) {
    _client.createSenderSignature({
      Name: _email,
      FromEmail: _email
    }, function(err, signature) {
      _client.deleteSenderSignature(signature.ID, done);
    });
  });

  it("can resend confirmation for signature", function(done) {
    _client.createSenderSignature({
      Name: _email,
      FromEmail: _email
    }, function(err, signature) {
      _client.resendSenderSignatureConfirmation(signature.ID, done);
    });
  });

  it("can verify SPF for signature", function(done) {
    _client.createSenderSignature({
      Name: _email,
      FromEmail: _email
    }, function(err, signature) {
      _client.verifySenderSignatureSPF(signature.ID, done);
    });
  });

  // testing cannot easily verify DKIM requests.
  // requestNewDKIMForSenderSignature

});