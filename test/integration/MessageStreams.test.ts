import { expect } from "chai";
import "mocha";
import {MessageStream, MessageStreams} from "../../src/client/models";
import * as postmark from "../../src/index";

import * as dotenv from "dotenv";
import { getTestRunTag } from "./testRunTag";
dotenv.config();

describe("Servers - Message Streams", () => {
    const tag = getTestRunTag();
    const serverNamePrefix: string = `node-js-test-message-streams-${tag}`;
    const accountToken: any = process.env.ACCOUNT_API_TOKEN;
    const accountClient = new postmark.AccountClient(accountToken);

    async function serverToTestApiToken() {
      const server: postmark.Models.Server = await accountClient.createServer({Name: `${serverNamePrefix}-${Date.now()}`});
      return server.ApiTokens[0];
    }

    async function deleteServers() {
        const servers = await accountClient.getServers();

        for (const server of servers.Servers) {
            if (server.Name.includes(serverNamePrefix)) {
                try {
                    await accountClient.deleteServer(server.ID);
                } catch (err) {
                    // Ignore deletes racing with other jobs/cleanup.
                    const statusCode = (err as { statusCode?: number } | undefined)?.statusCode;
                    if (statusCode !== 404) throw err;
                }
            }
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

    // Verify that an archive rejection from the API is surfaced to the caller as an ApiInputError.
    it("archive message stream surfaces API errors", async () => {
      const streamToCreateID: string = "test";
      const apiToken: string = await serverToTestApiToken();
      const client = new postmark.ServerClient(apiToken);
      await client.createMessageStream({Name: "test", ID: streamToCreateID, Description: "test description", MessageStreamType: "Transactional"});

      return client.archiveMessageStream(streamToCreateID).then((result) => {
        throw new Error(`Expected archiveMessageStream to be rejected, but it resolved: ${JSON.stringify(result)}`);
      }).catch((error) => {
        expect(error.name).to.equal("ApiInputError");
        expect(error.message).to.contain("unable to be archived");
      });
    });
});
