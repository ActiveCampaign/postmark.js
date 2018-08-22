"use strict";

var expect = require('expect.js');
var nconf = require('nconf');
var testingKeys = nconf.env().file({file: __dirname + '/../../testing_keys.json'});

var postmark = require('../../lib/postmark/index.js');
var helpers = require('./helpers.js');

describe("Client - Sender Signatures", function () {
    this.retries(4);
    this.timeout(10000);
    var prefix = "node-js-tests";

    var client = null;
    var email = null;
    var accountToken = testingKeys.get('ACCOUNT_TOKEN')

    beforeEach(function () {
        email = testingKeys.get('SENDER_SIGNATURE_PROTOTYPE').replace(/\[TOKEN]/i, prefix + new Date().valueOf());
        client = new postmark.AdminClient(accountToken);
    });

    function cleanup() {
        var rulePrefixTester = new RegExp(prefix);
        var c = new postmark.AdminClient(accountToken);
        c.listSenderSignatures(function (err, resp) {
            if (!err) {
                c.listDomains(function (err, resp) {
                    if (!err) {
                        var tester = new RegExp(email.split('@')[1]);
                        for (var i = 0; i < resp.Domains.length; i++) {
                            var domain = resp.Domains[i];
                            if (tester.test(domain.Name)) {
                                c.deleteDomain(domain.ID, helpers.report);
                            }
                        }
                    }
                });
            }
        });
    }

    before(cleanup);
    after(cleanup);

    it("listSenderSignatures", function (done) {
        client.listSenderSignatures(done);
    });

    it("createSenderSignature", function (done) {
        var emailTest = testingKeys.get('SENDER_SIGNATURE_PROTOTYPE').replace(/\[TOKEN]/i, 'create' + new Date().valueOf());

        client.createSenderSignature({
            Name: emailTest,
            FromEmail: emailTest
        }, function (err, signature) {
            expect(signature).not.to.eql(undefined);
            client.getSenderSignature(signature.ID, done);
        });
    });

    it("editSenderSignature", function (done) {
        client.createSenderSignature({
            Name: email,
            FromEmail: email
        }, function (err, signature) {
            expect(signature).not.to.eql(undefined);
            client.editSenderSignature(signature.ID, {
                Name: email + "-updated"
            }, done);
        });
    });

    it("deleteSenderSignature", function (done) {
        client.createSenderSignature({
            Name: email,
            FromEmail: email
        }, function (err, signature) {
            expect(signature).not.to.eql(undefined);
            client.deleteSenderSignature(signature.ID, done);
        });
    });

    it("resendSenderSignatureConfirmation", function (done) {
        client.createSenderSignature({
            Name: email,
            FromEmail: email
        }, function (err, signature) {
            expect(signature).not.to.eql(undefined);
            client.resendSenderSignatureConfirmation(signature.ID, done);
        });
    });

    it("verifySenderSignatureSPF", function (done) {
        client.createSenderSignature({
            Name: email,
            FromEmail: email
        }, function (err, signature) {
            expect(signature).not.to.eql(undefined);
            client.verifySenderSignatureSPF(signature.ID, done);
        });
    });
});