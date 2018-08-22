"use strict";

var expect = require('expect.js');
var nconf = require('nconf');
var testingKeys = nconf.env().file({file: __dirname + '/../testing_keys.json'});

var postmark = require('../lib/postmark/index.js');
var helpers = require('./helpers.js');

describe("Client - Sender Signatures", function () {
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
                for (var i = 0; i < resp.SenderSignatures.length; i++) {
                    var signature = resp.SenderSignatures[i];
                    if (rulePrefixTester.test(signature.Name)) {
                        c.deleteSenderSignature(signature.ID, helpers.report);
                    }
                }

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

    after(cleanup);
    before(cleanup);

    it("listSenderSignatures", function (done) {
        client.listSenderSignatures(done);
    });

    it("createSenderSignature", function (done) {
        var emailTest = testingKeys.get('SENDER_SIGNATURE_PROTOTYPE').replace(/\[TOKEN]/i, 'create' + new Date().valueOf());

        client.createSenderSignature({
            Name: emailTest,
            FromEmail: emailTest
        }, function (err, signature) {
            if (!err) {
                client.getSenderSignature(signature.ID, done);
            } else {
                done(err);
            }
        });
    });

    it("listSenderSignatures", function (done) {
        client.createSenderSignature({
            Name: email,
            FromEmail: email
        }, done);
    });

    it("editSenderSignature", function (done) {
        client.createSenderSignature({
            Name: email,
            FromEmail: email
        }, function (err, signature) {
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
            client.deleteSenderSignature(signature.ID, done);
        });
    });

    it("resendSenderSignatureConfirmation", function (done) {
        client.createSenderSignature({
            Name: email,
            FromEmail: email
        }, function (err, signature) {
            client.resendSenderSignatureConfirmation(signature.ID, done);
        });
    });

    it("verifySenderSignatureSPF", function (done) {
        client.createSenderSignature({
            Name: email,
            FromEmail: email
        }, function (err, signature) {
            client.verifySenderSignatureSPF(signature.ID, done);
        });
    });
});