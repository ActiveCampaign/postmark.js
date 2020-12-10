import * as postmark from "../../src/index";

import { expect } from "chai";
import "mocha";

import * as nconf from "nconf";
const testingKeys = nconf.env().file({ file: __dirname + "/../../testing_keys.json" });

describe("Client - Webhooks", () => {
    const serverToken: string = testingKeys.get("SERVER_API_TOKEN");
    const client = new postmark.ServerClient(serverToken);

    function webhookToCreate() {
        return new postmark.Models.CreateWebhookRequest(
            'https://example.com',
            { Open: { Enabled: true } }
        );
    }

    async function cleanup() {
        const webhooks = await client.getWebhooks();

        for (const webhook of webhooks.Webhooks) {
            await client.deleteWebhook(webhook.ID)
        }
    }

    before(cleanup);
    after(cleanup);

    it("getWebhooks", async () => {
        const result = await client.getWebhooks();
        expect(result.Webhooks.length).to.above(-1);
    });

    it("getWebhook", async () => {
        const webhook = await client.createWebhook(webhookToCreate());
        const result = await client.getWebhook(webhook.ID);
        expect(result.ID).to.above(-1);
    });

    it("createWebhook", async () => {
        const webhook = await client.createWebhook(webhookToCreate());
        expect(webhook.ID).to.above(-1);
    });

    it("editWebhook", async () => {
        const webhook = await client.createWebhook(webhookToCreate());
        const result = await client.editWebhook(webhook.ID, { Triggers: { SpamComplaint: { Enabled:true } } } );
        expect(result.Triggers.SpamComplaint.Enabled).to.equal(true);
    });

    it("deleteWebhook", async () => {
        const webhook = await client.createWebhook(webhookToCreate());
        const result = await client.deleteWebhook(webhook.ID);
        expect(result.Message.length).to.above(0);
    });
});
