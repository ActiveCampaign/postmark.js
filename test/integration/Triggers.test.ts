import { expect } from "chai";
import "mocha";
import { CreateInboundRuleRequest } from "../../src/client/models";
import * as postmark from "../../src/index";

import * as nconf from "nconf";
const testingKeys = nconf.env().file({ file: __dirname + "/../../testing_keys.json" });

describe("Client - Triggers", () => {
    const serverToken: string = testingKeys.get("SERVER_API_TOKEN");
    const client = new postmark.ServerClient(serverToken);
    const triggerName: string = "node-js";

    function inboundRuleTriggerToTest() {
        return new CreateInboundRuleRequest(`${triggerName}-${Date.now()}.com`);
    }

    async function cleanupInboundRuleTriggers() {
        const inboundRuleTriggers = await client.getInboundRuleTriggers();

        for (const inboundRuleTrigger of inboundRuleTriggers.InboundRules) {
            if (inboundRuleTrigger.Rule.includes(triggerName)) {
                await client.deleteInboundRuleTrigger(inboundRuleTrigger.ID);
            }
        }
    }

    async function cleanup() {
        await cleanupInboundRuleTriggers();
    }

    before(cleanup);
    after(cleanup);
    
    it("createInboundRuleTrigger", async () => {
        const inboundRuleTriggerOptions = inboundRuleTriggerToTest();
        const result = await client.createInboundRuleTrigger(inboundRuleTriggerOptions);
        expect(result.Rule).to.equal(inboundRuleTriggerOptions.Rule);
    });

    it("getInboundRuleTriggers", async () => {
        const inboundRules = await client.getInboundRuleTriggers();
        expect(inboundRules.InboundRules.length).to.gte(0);
    });

    it("deleteInboundRuleTrigger", async () => {
        const inboundRuleTriggerOptions = inboundRuleTriggerToTest();
        const inboundRule = await client.createInboundRuleTrigger(inboundRuleTriggerOptions);

        const response = await client.deleteInboundRuleTrigger(inboundRule.ID);
        expect(response.Message.length).to.above(0);
    });
});
