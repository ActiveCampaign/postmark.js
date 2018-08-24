"use strict";

var chai  = require('chai');
var expect = chai.expect;
var nconf = require('nconf');
var testingKeys = nconf.env().file({file: __dirname + '/../../testing_keys.json'});

var postmark = require('../../lib/postmark/index.js');
var helpers = require('./helpers.js');

describe('Client - Domains', function () {
    this.timeout(10000);
    var prefix = 'node-js-test-domain';

    var client = null;
    var domainName = null;
    var returnPath = null;
    var accountToken = testingKeys.get('ACCOUNT_TOKEN');

    function cleanup() {
        var rulePrefixTester = new RegExp(prefix);
        var c = new postmark.AdminClient(accountToken);
        c.listDomains(function (err, resp) {
            if (!err) {
                for (var i = 0; i < resp.Domains.length; i++) {
                    var domain = resp.Domains[i];
                    if (rulePrefixTester.test(domain.Name)) {
                        c.deleteDomain(domain.ID, helpers.report);
                    }
                }
            }
        });
    };

    beforeEach(function () {
        client = new postmark.AdminClient(accountToken);

        domainName = prefix + '-' + testingKeys.get('DOMAIN_NAME');
        returnPath = 'return.' + domainName;
    });

    before(cleanup);
    after(cleanup);

    it("createDomain", function (done) {
        client.createDomain({
            Name: domainName,
            ReturnPathDomain: returnPath
        }, done);
    });

    it("listDomains", function (done) {
        client.listDomains(done);
    });

    it("getDomain", function (done) {
        client.createDomain({
            Name: 'get-test-' + domainName
        }, function (err, domain) {
            if (err) {
                done(err);
            } else {
                client.getDomain(domain.ID, done);
            }
        });
    });

    it("editDomain", function (done) {
        var editTestDomain = 'edit-test-' + domainName
        client.createDomain({
            Name: editTestDomain,
            ReturnPathDomain: 'return.' + editTestDomain
        }, function (err, domain) {
            client.editDomain(domain.ID, {
                ReturnPathDomain: "updated-return." + editTestDomain
            }, done);
        });
    });

    it("deleteDomain", function (done) {
        client.createDomain({
            Name: 'delete-test-' + domainName
        }, function (err, domain) {
            client.deleteDomain(domain.ID, done);
        });
    });

    it("verifyDomainSPF", function (done) {
        client.createDomain({
            Name: 'spf-test-' + domainName
        }, function (err, domain) {
            client.verifyDomainSPF(domain.ID, done);
        });
    });

    it("verifyDomainDKIM", function (done) {
        client.createDomain({
            Name: 'dkim-test-' + domainName
        }, function (err, domain) {
            client.verifyDomainDKIM(domain.ID, done);
        });
    });

    it("verifyDomainReturnPath", function (done) {
        client.createDomain({
            Name: 'returnpath-test-' + domainName
        }, function (err, domain) {
            client.verifyDomainReturnPath(domain.ID, done);
        });
    });
});