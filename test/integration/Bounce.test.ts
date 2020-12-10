import * as postmark from "../../src/index";

import { expect } from "chai";
import "mocha";

import * as nconf from "nconf";
const testingKeys = nconf.env().file({ file: __dirname + "/../../testing_keys.json" });

describe("Bounce", () => {
    const serverToken: string = testingKeys.get("SERVER_API_TOKEN");
    const client = new postmark.ServerClient(serverToken);

    it("getBounce", async () => {
        const bounces = await client.getBounces();
        const bounce = await client.getBounce(bounces.Bounces[0].ID);
        expect(bounce.ID).to.be.gte(0);
    });

    describe("invalid", () => {
        it("getBounce", () => {
            return client.getBounces({ count: -1, offset: 0 }).catch((error) => {
                expect(error.name).to.eq("ApiInputError");
            });
        });
    });

    it("getBounces", async () => {
        const bounces = await client.getBounces();
        expect(bounces.TotalCount).to.be.gte(0);
    });

    it("getBounceBump", async () => {
        const bounces = await client.getBounces();
        const bounceDump = await client.getBounceDump(bounces.Bounces[0].ID);
        expect(bounceDump.Body.length).to.be.gt(0);
    });
});
