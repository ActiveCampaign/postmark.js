import * as postmark from '../../src/index';

import { expect } from 'chai';
import 'mocha';
import { CreateTemplateRequest } from '../../src/client/models';

const nconf = require('nconf');
const testingKeys = nconf.env().file({ file: __dirname + '/../../testing_keys.json' });

describe('Client - Templates', function () {
    const serverToken: string = testingKeys.get('SERVER_TOKEN');
    let client = new postmark.ServerClient(serverToken);
    const templatePrefix: string = 'testing-template-node-js';

    function templateToCreate() {
        return new CreateTemplateRequest(
            `${templatePrefix}-${Date.now()}`,
            'Subject',
            'Html body',
            'Text body',
        );
    };

    async function cleanup() {
        const client = new postmark.ServerClient(serverToken);
        const templates = await client.getTemplates();

        for (let i = 0; i < templates.Templates.length; i++) {
            let template = templates.Templates[i];
            if (template.Name.includes(templatePrefix)) { await client.deleteTemplate(template.TemplateId); };
        };
    };

    before(cleanup);
    after(cleanup);

    it('getTemplates', async () => {
        const result = await client.getTemplates();
        expect(result.TotalCount).to.above(-1);
    });

    it('getTemplate', async () => {
        const template = await client.createTemplate(templateToCreate());
        const result = await client.getTemplate(template.TemplateId);
        expect(result.TemplateId).to.above(-1);
    });

    it("createTemplate", async () => {
        const result = await client.createTemplate(templateToCreate());
        expect(result.TemplateId).to.above(0);
    });

    it('editTemplate', async () => {
        const templateOptions = templateToCreate();
        const updatedName = `${templateOptions.Name}-updated`
        const template = await client.createTemplate(templateOptions);
        const result = await client.editTemplate(template.TemplateId, { Name: updatedName });
        expect(result.Name).to.equal(updatedName);
    });

    it("deleteTemplate", async () => {
        const template = await client.createTemplate(templateToCreate());
        const result = await client.deleteTemplate(template.TemplateId);
        expect(result.Message.length).to.above(0);
    });

    it("validateTemplate", async () => {
        const templateToValidate = {
            TestRenderModel: {
                Name: "joe!"
            },
            TextBody: "text body for template {{id}}!",
            HtmlBody: "{{content}}",
            Subject: "{{subject}}"
        };

        const templateValidation = await client.validateTemplate(templateToValidate);
        expect(templateValidation.TextBody.ContentIsValid).to.eq(true);
    });

    describe('sending', () => {
        const fromAddress = testingKeys.get('SENDER_EMAIL_ADDRESS');
        const toAddress = testingKeys.get('EMAIL_RECIPIENT_ADDRESS');

        it("sendEmailWithTemplate", async () => {
            const template = await client.createTemplate(templateToCreate());

            let templatedMessage = new postmark.Models.TemplatedMessage(fromAddress, template.TemplateId, {}, toAddress);
            const result = await client.sendEmailWithTemplate(templatedMessage);
            expect(result.Message).to.eq('OK');
        });
    });
});