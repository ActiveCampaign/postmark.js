import * as postmark from "../../src/index";

import { expect } from "chai";
import "mocha";

import * as dotenv from "dotenv";
import { getTestRunTag } from "./testRunTag";
dotenv.config();

describe("Client - Webhooks", () => {
    const tag = getTestRunTag();
    const serverToken: any = process.env.SERVER_API_TOKEN;
    const client = new postmark.ServerClient(serverToken);

    function webhookToCreate() {
        return new postmark.Models.CreateWebhookRequest(
            `https://example.com/postmark-js-ci/${tag}`,
            { Open: { Enabled: true } }
        );
    }

    async function cleanup() {
        const webhooks = await client.getWebhooks();

        for (const webhook of webhooks.Webhooks) {
            if (typeof webhook.Url === "string" && webhook.Url.includes(`/postmark-js-ci/${tag}`)) {
                try {
                    await client.deleteWebhook(webhook.ID)
                } catch (err) {
                    const e = err as { name?: string; statusCode?: number; message?: string };
                    const name = e?.name;
                    const statusCode = e?.statusCode;
                    const message = e?.message;

                    const isGone =
                        statusCode === 404 ||
                        (name === "ApiInputError" &&
                            typeof message === "string" &&
                            message.toLowerCase().includes("not found"));

                    if (!isGone) throw err;
                }
            }
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
