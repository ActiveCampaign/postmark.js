import * as postmark from "../../src/index";

import { expect } from "chai";
import "mocha";

import * as nconf from "nconf";
const testingKeys = nconf.env().file({ file: __dirname + "/../../testing_keys.json" });

describe("Server", () => {
    const serverToken: string = testingKeys.get("SERVER_API_TOKEN");
    const client: postmark.ServerClient = new postmark.ServerClient(serverToken);

    it("getServer", async () => {
        const server: postmark.Models.Server = await client.getServer();
        expect(server.ID).to.above(0);
    });

    it("editServer", async () => {
        const serverOptions = new postmark.Models.UpdateServerRequest(undefined, undefined, undefined, true);
        const updatedServerOptions = new postmark.Models.UpdateServerRequest(undefined, undefined, undefined, false);

        let server: postmark.Models.Server = await client.editServer(serverOptions);
        expect(server.RawEmailEnabled).to.eq(serverOptions.RawEmailEnabled);

        server = await client.editServer(updatedServerOptions);
        expect(server.RawEmailEnabled).to.eq(updatedServerOptions.RawEmailEnabled);
    });
});
