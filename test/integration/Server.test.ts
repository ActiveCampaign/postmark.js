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
});
