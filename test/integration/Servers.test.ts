import {expect} from "chai";
import "mocha";

import {CreateServerRequest, ServerDeliveryTypes, UpdateServerRequest} from "../../src/client/models";
import * as postmark from "../../src/index";

import * as dotenv from "dotenv";
dotenv.config();

describe("Servers", () => {
    const runId: string = (() => {
        const base =
            process.env.CIRCLE_WORKFLOW_ID ||
            process.env.CIRCLE_BUILD_NUM ||
            process.env.GITHUB_RUN_ID ||
            `${Date.now()}`;
        const job = process.env.CIRCLE_JOB || process.env.GITHUB_JOB || process.version;
        return `${base}-${job}`.replace(/[^a-zA-Z0-9._-]/g, "-");
    })();
    const accountToken: any = process.env.ACCOUNT_API_TOKEN;
    const client = new postmark.AccountClient(accountToken);
    const serverNamePrefix: string = `node-js-test-server-${runId}`;

    function serverToTest() {
        return new CreateServerRequest(`${serverNamePrefix}-${Date.now()}`);
    }

    async function cleanup() {
        const servers = await client.getServers();

        for (const server of servers.Servers) {
            if (server.Name.includes(serverNamePrefix)) {
                try {
                    await client.deleteServer(server.ID);
                } catch (err) {
                    const statusCode = (err as any)?.statusCode as number | undefined;
                    if (statusCode !== 404) throw err;
                }
            }
        }
    }

    before(cleanup);
    after(cleanup);

    it("getServers", async () => {
        const servers = await client.getServers();
        expect(servers.TotalCount).to.gte(1);
    });

    it("createServer", async () => {
        const serverOptions = serverToTest();
        const serverDetails = await client.createServer(serverOptions);
        expect(serverDetails.Name).to.equal(serverOptions.Name);
    });

    it("createServer - delivery type - sandbox", async () => {
      const serverOptions = serverToTest();
      serverOptions.DeliveryType = ServerDeliveryTypes.Sandbox;
      const serverDetails = await client.createServer(serverOptions);
      expect(serverDetails.DeliveryType).to.equal("Sandbox");
    });

    it("editServer", async () => {
        const serverOptions = new UpdateServerRequest(undefined, "red");
        const updatedServerOptions = new UpdateServerRequest(undefined, "green");

        const servers = await client.getServers();
        const server = servers.Servers[0];

        let result = await client.editServer(server.ID, serverOptions);
        expect(result.Color).to.eq(serverOptions.Color);

        result = await client.editServer(server.ID, updatedServerOptions);
        expect(result.Color).to.eq(updatedServerOptions.Color);
    });

    it("deleteServer", async () => {
        const serverDetails = await client.createServer(serverToTest());
        const result = await client.deleteServer(serverDetails.ID);
        expect(result.Message.length).to.gte(1);
    });
});
