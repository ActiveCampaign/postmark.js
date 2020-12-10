import * as postmark from "../../src/index";

import { expect } from "chai";
import "mocha";

import * as nconf from "nconf";
const testingKeys = nconf.env().file({ file: __dirname + "/../../testing_keys.json" });

describe("Client - Message Statistics", () => {
    const serverToken: string = testingKeys.get("SERVER_API_TOKEN");
    const client = new postmark.ServerClient(serverToken);

    function formattedDate(date: Date) {
        return "" + date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
    }

    it("getDeliveryStatistics", async () => {
        const stats = await client.getDeliveryStatistics();
        expect(stats.InactiveMails).to.be.gte(0);
    });

    it("getSentCounts", async () => {
        const stats = await client.getSentCounts();
        expect(stats.Sent).to.be.gte(0);
    });

    it("getBounceCounts", async () => {
        const stats = await client.getBounceCounts();
        expect(stats.toString().length).to.be.gte(0);
    });

    it("getSpamComplaints", async () => {
        const stats = await client.getSpamComplaintsCounts();
        expect(stats.Days.length).to.be.gte(0);
    });

    it("getTrackedEmailCounts", async () => {
        const stats = await client.getTrackedEmailCounts();
        expect(stats.Tracked).to.be.gte(0);
    });

    it("getOutboundOverview", async () => {
        const now = new Date();
        const yesterday = new Date(now.valueOf() - (24 * 3600 * 1000));
        const toDate = formattedDate(now);
        const fromDate = formattedDate(yesterday);

        const stats = await client.getOutboundOverview({ fromDate, toDate });
        expect(stats.Sent).to.be.gte(0);
    });
});
