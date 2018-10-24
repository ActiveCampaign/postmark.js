import * as postmark from '../../src/index';

import { expect } from 'chai';
import 'mocha';

const nconf = require('nconf');
const testingKeys = nconf.env().file({file: __dirname + '/../../testing_keys.json'});

describe('Client - Templates', function () {
    const serverToken: string = testingKeys.get('SERVER_TOKEN');
    let client: postmark.ServerClient = new postmark.ServerClient(serverToken);
    const templatePrefix: string = 'testing-template-node-js';
    
    function templateToCreate(): postmark.Models.TemplateOptions {
        return {
            Name: `${templatePrefix}-${Date.now()}`,
            TextBody: 'Text body',
            HtmlBody: 'Html body',
            Subject: 'Subject'
        };
    };

    async function cleanup() {
        const client: postmark.ServerClient = new postmark.ServerClient(serverToken);
        const templates: postmark.Models.Templates = await client.getTemplates();

        for (let i = 0; i < templates.Templates.length; i++) {
            let template: postmark.Models.Template = templates.Templates[i];
            if (template.Name.includes(templatePrefix)) { await client.deleteTemplate(template.TemplateId); };
        };
    };

    before(cleanup);
    after(cleanup);

    it('getTemplates', async () => {
        const result: postmark.Models.Templates = await client.getTemplates();
        expect(result.TotalCount).to.above(-1);
    });

    it('getTemplate', async () => {
        const template: postmark.Models.Template = await client.createTemplate(templateToCreate());
        const result: postmark.Models.Template = await client.getTemplate(template.TemplateId);
        expect(result.TemplateId).to.above(-1);
    });

    it("createTemplate", async () => {
        const result: postmark.Models.Template = await client.createTemplate(templateToCreate());
        expect(result.TemplateId).to.above(0);
    });

    it('editTemplate', async () => {
        const templateOptions: postmark.Models.TemplateOptions = templateToCreate();
        const updatedName: string = `${templateOptions.Name}-updated`
        const template: postmark.Models.Template = await client.createTemplate(templateOptions);
        const result: postmark.Models.Template = await client.editTemplate(template.TemplateId, { Name: updatedName});
        expect(result.Name).to.equal(updatedName);
    });

    it("deleteTemplate", async () => {
        const template: postmark.Models.Template = await client.createTemplate(templateToCreate());
        const result: postmark.Models.DefaultResponse = await client.deleteTemplate(template.TemplateId);
        expect(result.Message.length).to.above(0);
    });

    it("validateTemplate", async () => {
        const templateToValidate: postmark.Models.TemplateValidationOptions = {
            TestRenderModel: {
                Name: "joe!"
            },
            TextBody: "text body for template {{id}}!",
            HtmlBody: "{{content}}",
            Subject: "{{subject}}"
        };

        const templateValidation: postmark.Models.TemplateValidation = await client.validateTemplate(templateToValidate);
        expect(templateValidation.TextBody.ContentIsValid).to.eq(true);
    });

    describe('sending', () => {
        const fromAddress: string = testingKeys.get('SENDER_EMAIL_ADDRESS');
        const toAddress: string = testingKeys.get('EMAIL_RECIPIENT_ADDRESS');

        it("sendEmailWithTemplate", async () => {
            const template: postmark.Models.Template = await client.createTemplate(templateToCreate());

            let templateMessage: postmark.Models.TemplateMessage = {
                To: toAddress,
                From: fromAddress,
                TemplateId: template.TemplateId,
                TemplateModel: {}
            };

            const result: postmark.Models.DefaultResponse = await client.sendEmailWithTemplate(templateMessage);
            expect(result.Message).to.eq('OK');
        });
    });
});