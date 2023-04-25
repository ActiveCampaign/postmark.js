import * as postmark from "../../src/index";

import { expect } from "chai";
import "mocha";

import * as dotenv from "dotenv";
dotenv.config();

describe("Client - Message Statistics", () => {
    const serverToken: any = process.env.SERVER_API_TOKEN
    const client = new postmark.ServerClient(serverToken);

    it("getMessageOpens", async () => {
        const result = await client.getMessageOpens();
        expect(result.TotalCount).to.gte(0);
    });

    it("getEmailOpenCounts", async () => {
        const result = await client.getEmailOpenCounts();
        expect(result.Days.length).to.gte(0);
    });

    it("getEmailPlatformUsage", async () => {
        const result = await client.getEmailOpenPlatformUsage();
        expect(result.Days.length).to.gte(0);
    });

    it("getEmailClientUsage", async () => {
        const result = await client.getEmailOpenClientUsage();
        expect(result.Days.length).to.gte(0);
    });
});
