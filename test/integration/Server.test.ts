import * as postmark from "../../src/index";

import { expect } from "chai";
import "mocha";

import * as nconf from "nconf";
const testingKeys = nconf.env().file({ file: __dirname + "/../../testing_keys.json" });

describe("Server", () => {
    const serverToken: string = testingKeys.get("SERVER_TOKEN");
    const client: postmark.ServerClient = new postmark.ServerClient(serverToken);

    it("getServer", async () => {
        const server: postmark.Models.Server = await client.getServer();
        expect(server.ID).to.above(0);
    });

    it("editServer", async () => {
        const serverOptions = new postmark.Models.UpdateServerRequest(undefined, "red");
        const updatedServerOptions = new postmark.Models.UpdateServerRequest(undefined, "green");

        let server: postmark.Models.Server = await client.editServer(serverOptions);
        expect(server.Color).to.eq(serverOptions.Color);

        server = await client.editServer(updatedServerOptions);
        expect(server.Color).to.eq(updatedServerOptions.Color);
    });
});
