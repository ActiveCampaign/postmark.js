import * as postmark from "../../src/index";

import { expect } from "chai";
import "mocha";

import * as nconf from "nconf";
import {Suppression, Suppressions, SuppressionStatuses} from "../../src/client/models";
const testingKeys = nconf.env().file({ file: __dirname + "/../../testing_keys.json" });

describe("Client - Suppressions", () => {
    const serverToken: string = testingKeys.get("SERVER_API_TOKEN");
    const client = new postmark.ServerClient(serverToken);
    const suppression_email_domain:string = 'supression.example.com';

    async function cleanup() {
        const suppressions: Suppressions = await client.getSuppressions('outbound');
        suppressions.Suppressions.forEach( async (suppression: Suppression) => {
            if (suppression.EmailAddress.includes(suppression_email_domain)) {
                await client.deleteSuppressions('outbound', { Suppressions: [ { EmailAddress: suppression.EmailAddress} ] });
            }
        });
    }

    before(cleanup);
    after(cleanup);

    it("createSuppression", async () => {
        const emailAddress = `nothing+create@${suppression_email_domain}`;
        const suppression: SuppressionStatuses = await client.createSuppressions('outbound', {
            Suppressions: [ { EmailAddress: emailAddress} ]
        });

        expect(suppression.Suppressions.length).to.eq(1);
    });

    it("getSuppressions", async () => {
        const emailAddress = `nothing+list@${suppression_email_domain}`;
        await client.createSuppressions('outbound', {
            Suppressions: [ { EmailAddress: emailAddress} ]
        });


        const suppressions: Suppressions = await client.getSuppressions('outbound');
        expect(suppressions.Suppressions.length).to.be.gte(1);
    });

    it("deleteSuppression", async () => {
        const emailAddress = `nothing+delete@${suppression_email_domain}`;
        const suppression: SuppressionStatuses = await client.deleteSuppressions('outbound', {
            Suppressions: [ { EmailAddress: emailAddress} ]
        });

        expect(suppression.Suppressions.length).to.eq(1);
    });
});
