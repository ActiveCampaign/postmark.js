import * as postmark from '../../../src/index'
import {
    Template, TemplateMessage,
    TemplateOptions,
    Templates,
    TemplateValidation,
    TemplateValidationOptions
} from "../../../src/client/models";
import DefaultResponse from "../../../src/client/models/client/PostmarkResponse";

import {expect} from 'chai';
import 'mocha';

const nconf = require('nconf');
const testingKeys = nconf.env().file({file: __dirname + '/../../../testing_keys.json'});

describe('Client - Templates', function () {
    this.timeout(5000);
    this.retries(2);

    let client: postmark.ServerClient;
    const serverToken: string = testingKeys.get('SERVER_TOKEN');
    const templatePrefix: string = 'testing-template-node-js';
    
    function defaultTemplateToCreate(name:string) {
        let template: TemplateOptions = {
            Name: name,
            TextBody: 'Text body',
            HtmlBody: 'Html body',
            Subject: 'Subject'
        };

        return template;
    };
    
    function templateToTest(name:string) {
        return `${name}-${templatePrefix}}`;
    };
    
    async function cleanup() {
        const client = new postmark.ServerClient(serverToken);
        const templates:Templates = await client.getTemplates();

        for (let i = 0; i < templates.Templates.length; i++) {
            let template:Template = templates.Templates[i];
            if (template.Name.includes(templatePrefix)) { await client.deleteTemplate(template.TemplateId); };
        };
    };

    beforeEach(function () {
        client = new postmark.ServerClient(serverToken);
    });

    before(cleanup);
    after(cleanup);

    it('getTemplates', async () => {
        const result: Templates = await client.getTemplates();
        expect(result.TotalCount).to.above(-1);
    });

    it('getTemplate', async () => {
        const name: string = templateToTest('get-template-test');
        const template: Template = await client.createTemplate(defaultTemplateToCreate(name));
        const result: Template = await client.getTemplate(template.TemplateId);
        expect(result.TemplateId).to.above(-1);
    });

    it("createTemplate", async () => {
        const name: string = templateToTest('create-test');
        const result: Template = await client.createTemplate(defaultTemplateToCreate(name));
        expect(result.TemplateId).to.above(0);
    });

    it('editTemplate', async () => {
        const name: string = templateToTest('edit-template-test');
        const updatedName: string = templateToTest('edit-update-template-test');
        const subject = 'test edit';
        const template: Template = await client.createTemplate(defaultTemplateToCreate(name));
        const result: Template = await client.editTemplate(template.TemplateId, { Name: updatedName, Subject: subject});
        expect(result.Name).to.equal(updatedName);
    });

    it("deleteTemplate", async () => {
        const name: string = templateToTest('delete-test');
        const template: Template = await client.createTemplate(defaultTemplateToCreate(name));
        const result: DefaultResponse = await client.deleteTemplate(template.TemplateId);
        expect(result.Message.length).to.above(0);
    });

    it("validateTemplate", async () => {
        const templateToValidate: TemplateValidationOptions = {
            TestRenderModel: {
                Name: "joe!"
            },
            TextBody: "text body for template {{id}}!",
            HtmlBody: "{{content}}",
            Subject: "{{subject}}"
        }

        const templateValidation: TemplateValidation = await client.validateTemplate(templateToValidate);
        expect(templateValidation.TextBody.ContentIsValid).to.eq(true);
    });

    describe('sending', () => {
        const fromAddress: string = testingKeys.get('SENDER_EMAIL_ADDRESS');
        const toAddress: string = testingKeys.get('EMAIL_RECIPIENT_ADDRESS');

        it("sendEmailWithTemplate", async () => {
            const name: string = templateToTest('send-test');
            const template: Template = await client.createTemplate(defaultTemplateToCreate(name));

            let templateMessage:TemplateMessage = {
                To: toAddress,
                From: fromAddress,
                TemplateId: template.TemplateId,
                TemplateModel: {}
            };

            const result: DefaultResponse = await client.sendEmailWithTemplate(templateMessage);
            expect(result.Message).to.eq('OK');
        });
    });
});