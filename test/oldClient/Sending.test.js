"use strict";

var chai  = require('chai');
var expect = chai.expect;
var nconf = require('nconf');
var testingKeys = nconf.env().file({file: __dirname + '/../../testing_keys.json'});

var postmark = require('../../lib/postmark/index.js');

describe('Client - Email Sending', function() {
  this.timeout(30000);
  var client = null;
  var testTemplateAlias = 'postmark-js-batch-testing template';
  var serverToken = testingKeys.get('SERVER_TOKEN');
  var fromAddress = testingKeys.get('SENDER_EMAIL_ADDRESS');
  var toAddress = testingKeys.get('EMAIL_RECIPIENT_ADDRESS');

  beforeEach(function() {
    client = new postmark.Client(serverToken);
    client.deleteTemplate(testTemplateAlias);
  });

  it('send', function(done) {
    client.send({
      To: toAddress,
      From: fromAddress ,
      Subject: "Hello from the node.js client! " + new Date(),
      TextBody: "Testing 1.2.3..."
    }, done);
  });

  it('sendEmail', function(done) {
    client.sendEmail({
      To: toAddress,
      From: fromAddress,
      Subject: "Hello from the node.js client! " + new Date(),
      TextBody: "Testing 1.2.3..."
    }, done);
  });

  it('batch', function(done) {
    var emailBatch = [];

    for (var i = 0; i < 3; i++) {
      emailBatch.push({
        to: toAddress,
        from: fromAddress,
        subject: "Hello from the node.js client! " + new Date(),
        textBody: "Testing batch email: " + i
      });
    }
    client.batch(emailBatch, done);
  });

  it('sendEmailBatch', function(done) {
    var emailBatch = [];

    for (var i = 0; i < 3; i++) {
      emailBatch.push({
        to: toAddress,
        from: fromAddress,
        subject: "Hello from the node.js client! " + new Date(),
        textBody: "Testing batch email: " + i
      });
    }
    client.sendEmailBatch(emailBatch, done);
  });

  it('sendEmailBatchWithTemplates', function(done) {
    var emailBatch = [];
    //create a template, and then send with it.
    client.createTemplate({
      subject: 'postmark-js-batch-testing template',
      textBody: 'postmark-js-batch-testing template',
      name: testTemplateAlias,
      alias: testTemplateAlias
    }, function(){
        for (var i = 0; i < 3; i++) {
          emailBatch.push({
            to: toAddress,
            from: fromAddress,
            templateAlias: 'postmark-js-batch-testing'
          });
        }
        client.sendEmailBatchWithTemplates(emailBatch, done);
      });
    });  
});