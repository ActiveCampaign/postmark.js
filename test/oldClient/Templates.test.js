"use strict";

var expect = require('expect.js');
var nconf = require('nconf');
var testingKeys = nconf.env().file({file: __dirname + '/../../testing_keys.json'});

var postmark = require('../../lib/postmark/index.js');
var helpers = require('./helpers.js');

describe('Client - Templates', function() {
    this.retries(2);
    this.timeout(10000);
    var client = null;
    var serverToken = testingKeys.get('SERVER_TOKEN');
    var fromAddress = testingKeys.get('SENDER_EMAIL_ADDRESS');
    var toAddress = testingKeys.get('EMAIL_RECIPIENT_ADDRESS');

    beforeEach(function() {
        client = new postmark.Client(serverToken);
        cleanup();
    });

    function cleanup() {
        var c = new postmark.Client(serverToken);
        c.getTemplates({ offset : 0, count : 100 }, function(err, results) {
            while (results.Templates.length > 0) {
                var t = results.Templates.pop();
                if (/testing-template-node-js/.test(t.Name)) {
                    c.deleteTemplate(t.TemplateId, helpers.report);
                }
            }
        });
    }

    after(cleanup);

    it('getTemplates', function(done) {
        client.getTemplates(done);
    });

    it('getTemplate', function(done) {
        client.createTemplate({
            name: "testing-template-node-js" + Date(),
            textBody: "text body for template {{id}}!",
            htmlBody: "{{content}}",
            subject: "{{subject}}"
        }, function(err, template) {
            client.getTemplate(template.TemplateId, done);
        });
    });

    it('editTemplate', function(done) {
        client.createTemplate({
            name: "testing-template-node-js" + Date(),
            textBody: "text body for template {{id}}!",
            htmlBody: "{{content}}",
            subject: "{{subject}}"
        }, function(error, newTemplate) {
            client.editTemplate(newTemplate.TemplateId, {
                name: "testing-template-node-js" + Date(),
                textBody: "text body for template {{id}}!",
                htmlBody: "{{content}}",
                subject: "{{subject}}"
            }, done);
        });
    });

    it('createTemplate', function(done) {
        client.createTemplate({
            name: "testing-template-node-js" + Date(),
            textBody: "text body for template {{id}}!",
            htmlBody: "{{content}}",
            subject: "{{subject}}"
        }, done);
    });

    it('deleteTemplate', function(done) {
        client.createTemplate({
            name: "testing-template-node-js" + Date(),
            textBody: "text body for template {{id}}!",
            htmlBody: "{{content}}",
            subject: "{{subject}}"
        }, function(err, template) {
            client.deleteTemplate(template.TemplateId, done);
        });
    });

    it('sendEmailWithTemplate', function(done) {
        client.createTemplate({
            name: "testing-template-node-js" + Date(),
            textBody: "text body for template {{id}}!",
            htmlBody: "{{content}}",
            subject: "{{subject}}"
        }, function(error, t) {
            client.sendEmailWithTemplate({
                To: toAddress,
                From: fromAddress,
                TemplateId: t.TemplateId,
                TemplateModel: {
                  subject: "Hello from the node.js client! " + new Date(),
                  content: "Testing templated email"
                }
            }, done);
        });
    });

    it('validateTemplate', function(done) {
        client.validateTemplate({
            testRenderModel: {
                Name: "joe!"
            },
            textBody: "text body for template {{id}}!",
            htmlBody: "{{content}}",
            subject: "{{subject}}"
        }, done);
    })

});
