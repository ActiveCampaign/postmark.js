import * as postmark from "../../src/index";

import { expect } from "chai";
import "mocha";

import * as dotenv from "dotenv";
dotenv.config();

describe("Server", () => {
    const serverToken: any = process.env.SERVER_API_TOKEN;
    const client: postmark.ServerClient = new postmark.ServerClient(serverToken);

    it("getServer", async () => {
        const server: postmark.Models.Server = await client.getServer();
        expect(server.ID).to.above(0);
    });
});
