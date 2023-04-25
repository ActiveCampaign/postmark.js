import { expect } from "chai";
import "mocha";
import {MessageStream, MessageStreamArchiveResponse, MessageStreams, MessageStreamUnarchiveResponse} from "../../src/client/models";
import * as postmark from "../../src/index";

import * as dotenv from "dotenv";
dotenv.config();

describe("Servers - Message Streams", () => {
    const serverNamePrefix: string = "node-js-test-message-streams";
    const accountToken: any = process.env.ACCOUNT_API_TOKEN;
    const accountClient = new postmark.AccountClient(accountToken);

    async function serverToTestApiToken() {
      const server: postmark.Models.Server = await accountClient.createServer({Name: `${serverNamePrefix}-${Date.now()}`});
      return server.ApiTokens[0];
    }

    async function deleteServers() {
        const servers = await accountClient.getServers();

        for (const server of servers.Servers) {
            if (server.Name.includes(serverNamePrefix)) { await accountClient.deleteServer(server.ID); }
        }
    }

    before(deleteServers);
    after(deleteServers);

    it("message streams", async () => {
        const apiToken: string = await serverToTestApiToken();
        const client = new postmark.ServerClient(apiToken);
        const streams: MessageStreams = await client.getMessageStreams();
        expect(streams.TotalCount).to.gte(2);
    });

    it("message stream", async () => {
      const apiToken: string = await serverToTestApiToken();
      const client = new postmark.ServerClient(apiToken);
      const streams: MessageStream = await client.getMessageStream("outbound");
      expect(streams.ID).to.eq("outbound");
    });

    it("create message stream", async () => {
      const apiToken: string = await serverToTestApiToken();
      const client = new postmark.ServerClient(apiToken);
      const streams: MessageStream = await client.createMessageStream({Name: "test", ID: "test",
        Description: "test description", MessageStreamType: "Transactional"});
      const streamsToCount: MessageStreams = await client.getMessageStreams();

      expect(streams.Description).to.eq("test description");
      expect(streamsToCount.TotalCount).to.eq(4);
    });

    it("archive message stream", async () => {
      const streamToCreateID: string = "test";
      const apiToken: string = await serverToTestApiToken();
      const client = new postmark.ServerClient(apiToken);
      await client.createMessageStream({Name: "test", ID: streamToCreateID, Description: "test description", MessageStreamType: "Transactional"});
      const response: MessageStreamArchiveResponse = await client.archiveMessageStream(streamToCreateID);

      expect(response.ID).to.eq(streamToCreateID);
    });

    it("unarchive message stream", async () => {
      const streamToCreateID: string = "test";
      const apiToken: string = await serverToTestApiToken();
      const client = new postmark.ServerClient(apiToken);
      await client.createMessageStream({Name: "test", ID: streamToCreateID, Description: "test description", MessageStreamType: "Transactional"});
      await client.archiveMessageStream(streamToCreateID);
      const responseUnarchive: MessageStreamUnarchiveResponse = await client.unarchiveMessageStream(streamToCreateID);

      expect(responseUnarchive.MessageStreamType).to.eq("Transactional");
    });
});
