import * as postmark from "../../src/index";

import { expect } from "chai";
import "mocha";
import {CreateTemplateRequest, TemplatesPushRequest, TemplateTypes} from "../../src/client/models";

import * as nconf from "nconf";
const testingKeys = nconf.env().file({ file: __dirname + "/../../testing_keys.json" });

describe("Client - Templates", () => {
    const serverToken: string = testingKeys.get("SERVER_API_TOKEN");
    const accountToken: string = testingKeys.get("ACCOUNT_API_TOKEN");
    const client = new postmark.ServerClient(serverToken);
    const accountClient = new postmark.AccountClient(accountToken);
    const templatePrefix: string = "testing-template-node-js";

    function templateToCreate() {
        return new CreateTemplateRequest(
            `${templatePrefix}-${Date.now()}`,
            "Subject",
            "Html body",
            "Text body",
            null,
            postmark.Models.TemplateTypes.Standard,
        );
    }

    function templateLayoutToCreate() {
        return new CreateTemplateRequest(
            `${templatePrefix}-${Date.now()}`,
            undefined,
            "Html body {{{@content}}}",
            "Text body {{{@content}}}",
            null,
            postmark.Models.TemplateTypes.Layout,
    );
    }

    async function cleanup() {
        const templates = await client.getTemplates({count: 50});

        for (const template of templates.Templates) {
            if (template.Name.includes(templatePrefix)) {
                await client.deleteTemplate(template.TemplateId);
            }
        }
    }
    before(cleanup);
    after(cleanup);

    it("getTemplates", async () => {
        const result = await client.getTemplates({count:5, offset:0, templateType: TemplateTypes.Standard});
        expect(result.TotalCount).to.above(-1);
    });

    it("getTemplate", async () => {
        const template = await client.createTemplate(templateToCreate());
        const result = await client.getTemplate(template.TemplateId);
        expect(result.TemplateId).to.above(-1);
    });

    it("getTemplate - layout", async () => {
        const template = await client.createTemplate(templateLayoutToCreate());
        const result = await client.getTemplate(template.TemplateId);
        expect(result.TemplateType).to.equal(TemplateTypes.Layout);
    });

    it("createTemplate", async () => {
        const result = await client.createTemplate(templateToCreate());
        expect(result.TemplateType).to.equal(TemplateTypes.Standard)
    });

    it("createTemplate - layout", async () => {
        const result = await client.createTemplate(templateLayoutToCreate());
        expect(result.TemplateType).to.equal(TemplateTypes.Layout)
    });

    it("editTemplate", async () => {
        const templateOptions = templateToCreate();
        const updatedName = `${templateOptions.Name}-updated`;
        const template = await client.createTemplate(templateOptions);
        const result = await client.editTemplate(template.TemplateId, { Name: updatedName });
        expect(result.Name).to.equal(updatedName);
    });

    describe("editTemplate - layout", () => {
        it("valid", async () => {
            const templateOptions = templateLayoutToCreate();
            const updatedName = `${templateOptions.Name}-updated`;
            const template = await client.createTemplate(templateOptions);
            const result = await client.editTemplate(template.TemplateId, { Name: updatedName });
            expect(result.Name).to.equal(updatedName);
        });

        it("invalid", async () => {
            const templateOptions = templateLayoutToCreate();
            const updatedContent = 'Html content';
            const template = await client.createTemplate(templateOptions);

            return await client.editTemplate(template.TemplateId, { HtmlBody: updatedContent }).then((result) => {
                throw Error(`Should not be here with result: ${result}`);
            }, (error) => {
                expect(error.name).to.equal("ApiInputError");
                expect(error.message).to.include('The layout content placeholder must be present');
            });

        });
    });

    it("deleteTemplate", async () => {
        const template = await client.createTemplate(templateToCreate());
        const result = await client.deleteTemplate(template.TemplateId);
        expect(result.Message.length).to.above(0);
    });

    it("validateTemplate", async () => {
        const templateToValidate = {
            TestRenderModel: {
                Name: "joe!",
            },
            HtmlBody: "{{content}}",
            TextBody: "text body for template {{id}}!",
            Subject: "{{subject}}",
        };

        const templateValidation = await client.validateTemplate(templateToValidate);
        expect(templateValidation.TextBody.ContentIsValid).to.eq(true);
    });

    it("validateTemplate - layout", async () => {
        const templateToValidate = {
            TemplateType: TemplateTypes.Layout,
            TestRenderModel: {
                Name: "joe!",
            },
            HtmlBody: "{{{@content}}}",
            TextBody: "text body for template {{id}} {{{@content}}}!"
        };

        const templateValidation = await client.validateTemplate(templateToValidate);
        expect(templateValidation.TextBody.ContentIsValid).to.eq(true);
    });

    describe("sending", () => {
        const fromAddress = testingKeys.get("SENDER_EMAIL_ADDRESS");
        const toAddress = testingKeys.get("RECIPIENT_EMAIL_ADDRESS");

        it("sendEmailWithTemplate", async () => {
            const template = await client.createTemplate(templateToCreate());

            const templatedMessage = new postmark.Models.TemplatedMessage(
                fromAddress, template.TemplateId, {}, toAddress);
            templatedMessage.Metadata = { "Key": "Value"};

            const result = await client.sendEmailWithTemplate(templatedMessage);
            expect(result.Message).to.eq("OK");
        });
    });

    describe("push templates", () => {
        it("non existing servers error", () => {
            const pushRequest = new TemplatesPushRequest(0, 1, false);

            return accountClient.pushTemplates(pushRequest).then((result) => {
                throw Error(`Should not be here with result: ${result}`);
            }, (error) => {
                expect(error.name).to.equal("ApiInputError");
                expect(error.message).to.equal("The source and destination servers were not found.");
            });
        });

        it("bad destination server", async () => {
            const server = await client.getServer();
            const pushRequest = new TemplatesPushRequest(server.ID, 1, false);

            return accountClient.pushTemplates(pushRequest).then((result) => {
                throw Error(`Should not be here with result: ${result}`);
            }, (error) => {
                expect(error.name).to.equal("ApiInputError");
                expect(error.message).to.equal(`The destination server was not found.`);
            });
        });

        it("bad source server", async () => {
            const server = await client.getServer();
            const pushRequest = new TemplatesPushRequest(1, server.ID, false);

            return accountClient.pushTemplates(pushRequest).then((result) => {
                throw Error(`Should not be here with result: ${result}`);
            }, (error) => {
                expect(error.name).to.equal("ApiInputError");
                expect(error.message).to.equal(`The source server was not found.`);
            });
        });
    });
});
