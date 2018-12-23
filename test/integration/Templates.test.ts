import * as postmark from "../../src/index";

import { expect } from "chai";
import "mocha";
import {CreateTemplateRequest, TemplatesPushRequest} from "../../src/client/models";

import * as nconf from "nconf";
const testingKeys = nconf.env().file({ file: __dirname + "/../../testing_keys.json" });

describe("Client - Templates", () => {
    const serverToken: string = testingKeys.get("SERVER_TOKEN");
    const accountToken: string = testingKeys.get("ACCOUNT_TOKEN");
    const client = new postmark.ServerClient(serverToken);
    const accountClient = new postmark.AccountClient(accountToken);
    const templatePrefix: string = "testing-template-node-js";

    function templateToCreate() {
        return new CreateTemplateRequest(
            `${templatePrefix}-${Date.now()}`,
            "Subject",
            "Html body",
            "Text body",
        );
    }
    async function cleanup() {
        const templates = await client.getTemplates();

        for (const template of templates.Templates) {
            if (template.Name.includes(templatePrefix)) {
                await client.deleteTemplate(template.TemplateId);
            }
        }
    }
    before(cleanup);
    after(cleanup);

    it("getTemplates", async () => {
        const result = await client.getTemplates();
        expect(result.TotalCount).to.above(-1);
    });

    it("getTemplate", async () => {
        const template = await client.createTemplate(templateToCreate());
        const result = await client.getTemplate(template.TemplateId);
        expect(result.TemplateId).to.above(-1);
    });

    it("createTemplate", async () => {
        const result = await client.createTemplate(templateToCreate());
        expect(result.TemplateId).to.above(0);
    });

    it("editTemplate", async () => {
        const templateOptions = templateToCreate();
        const updatedName = `${templateOptions.Name}-updated`;
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
                Name: "joe!",
            },
            HtmlBody: "{{content}}",
            TextBody: "text body for template {{id}}!",
            Subject: "{{subject}}",
        };

        const templateValidation = await client.validateTemplate(templateToValidate);
        expect(templateValidation.TextBody.ContentIsValid).to.eq(true);
    });

    describe("sending", () => {
        const fromAddress = testingKeys.get("SENDER_EMAIL_ADDRESS");
        const toAddress = testingKeys.get("EMAIL_RECIPIENT_ADDRESS");

        it("sendEmailWithTemplate", async () => {
            const template = await client.createTemplate(templateToCreate());

            const templatedMessage = new postmark.Models.TemplatedMessage(
                fromAddress, template.TemplateId, {}, toAddress);
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
