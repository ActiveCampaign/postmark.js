var mocha = require('mocha');
var assert = require('assert');
var nconf = require('nconf');
var testingKeys = nconf.env().file({
    file: __dirname + '/../testing_keys.json'
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

    after(function() {
        _client.getTemplates(function(err, results) {

            while (results.Templates.length > 0) {
                var t = results.Templates.pop();
                if (/testing-template-node-js/.test(t.Name)) {
                    _client.deleteTemplate(t.TemplateId);
                }
            }
        });
    });

    it('should retrieve a list of templates.', function(done) {
        _client.getTemplates(done);
    });

    it('should get a single template.', function(done) {
        _client.createTemplate({
            name: "testing-template-node-js" + Date(),
            textBody: "text body for template {{id}}!",
            htmlBody: "{{content}}",
            subject: "{{subject}}"
        }, function(err, template) {
            _client.getTemplate(template.TemplateId, done);
        });
    });

    it('should a update a template.', function(done) {
        _client.createTemplate({
            name: "testing-template-node-js" + Date(),
            textBody: "text body for template {{id}}!",
            htmlBody: "{{content}}",
            subject: "{{subject}}"
        }, function(error, newTemplate) {
            _client.editTemplate(newTemplate.TemplateId, {
                name: "testing-template-node-js" + Date(),
                textBody: "text body for template {{id}}!",
                htmlBody: "{{content}}",
                subject: "{{subject}}"
            }, done);
        });
    });

    it('should a create a template.', function(done) {
        _client.createTemplate({
            name: "testing-template-node-js" + Date(),
            textBody: "text body for template {{id}}!",
            htmlBody: "{{content}}",
            subject: "{{subject}}"
        }, done);
    });

    it('should a delete a template.', function(done) {
        _client.createTemplate({
            name: "testing-template-node-js" + Date(),
            textBody: "text body for template {{id}}!",
            htmlBody: "{{content}}",
            subject: "{{subject}}"
        }, function(err, template) {
            _client.deleteTemplate(template.TemplateId, done);
        });
    });

    it('send an email using a template.', function(done) {
        _client.createTemplate({
            name: "testing-template-node-js" + Date(),
            textBody: "text body for template {{id}}!",
            htmlBody: "{{content}}",
            subject: "{{subject}}"
        }, function(error, t) {
            _client.sendEmailWithTemplate({
                To: testingKeys.get('WRITE_TEST_EMAIL_RECIPIENT_ADDRESS'),
                From: testingKeys.get('WRITE_TEST_SENDER_EMAIL_ADDRESS'),
                TemplateId: t.TemplateId,
                TemplateModel: {
                  subject: "Hello from the node.js client! " + new Date(),
                  content: "Testing templated email"
                }
            }, done);
        });
    });

    it('should validate template', function(done) {
        _client.validateTemplate({
            testRenderModel: {
                Name: "joe!"
            },
            textBody: "text body for template {{id}}!",
            htmlBody: "{{content}}",
            subject: "{{subject}}"
        }, done);
    })

});
