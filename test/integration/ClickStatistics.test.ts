import * as postmark from "../../src/index";

import { expect } from "chai";
import "mocha";

import * as nconf from "nconf";
const testingKeys = nconf.env().file({ file: __dirname + "/../../testing_keys.json" });

describe("Client - Click Statistics", () => {
    const serverToken: string = testingKeys.get("SERVER_API_TOKEN");
    const client = new postmark.ServerClient(serverToken);

    it("getClickCounts", async () => {
        const stats = await client.getClickCounts();
        expect(stats.Clicks).to.be.gte(0);
    });

    it("getClickBrowserUsage", async () => {
        const stats = await client.getClickBrowserUsage();
        expect(stats.Days.length).to.be.gte(0);
    });

    it("getEmailOpenPlatformUsage", async () => {
        const stats = await client.getEmailOpenPlatformUsage();
        expect(stats.Days.length).to.be.gte(0);
    });

    it("getClickLocation", async () => {
        const stats = await client.getClickLocation();
        expect(stats.Days.length).to.be.gte(0);
    });
});
