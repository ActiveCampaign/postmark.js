import {expect} from "chai";
import "mocha";

import {DataRemovalStatus, DataRemovalStatusTypes} from "../../src/client/models";
import * as postmark from "../../src/index";

import * as dotenv from "dotenv";
dotenv.config();

describe("DataRemoval", () => {
    const accountToken: any = process.env.ACCOUNT_API_TOKEN;
    const client = new postmark.AccountClient(accountToken);
    const fromAddress: any = process.env.SENDER_EMAIL_ADDRESS;

    it("createDataRemoval", async () => {
        const dataRemovalStatus:DataRemovalStatus = await client.requestDataRemoval({
            RequestedBy: fromAddress.toString(),
            RequestedFor: 'test@example.com',
            NotifyWhenCompleted: false})

        expect(dataRemovalStatus.Status).to.eq(DataRemovalStatusTypes.Pending);
        expect(dataRemovalStatus.ID).to.be.gt(0);
    });

    it("getDataRemoval", async () => {
        let dataRemovalStatus: DataRemovalStatus = await client.requestDataRemoval({
            RequestedBy: fromAddress.toString(),
            RequestedFor: 'test@example.com',
            NotifyWhenCompleted: false})

        const dataRemovalStatusId:number = dataRemovalStatus.ID;
        dataRemovalStatus = await client.getDataRemovalStatus(dataRemovalStatusId);
        expect(dataRemovalStatus.ID).to.eq(dataRemovalStatusId)
    });
});
