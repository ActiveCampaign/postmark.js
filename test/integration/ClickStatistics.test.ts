import * as postmark from "../../src/index";

import { expect } from "chai";
import "mocha";

import * as dotenv from "dotenv";
dotenv.config();

describe("Client - Click Statistics", () => {
    const serverToken: any = process.env.SERVER_API_TOKEN;
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
