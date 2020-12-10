import { expect } from "chai";
import "mocha";
import { CreateSignatureRequest } from "../../src/client/models";
import * as postmark from "../../src/index";

import * as nconf from "nconf";
const testingKeys = nconf.env().file({ file: __dirname + "/../../testing_keys.json" });

describe("Client - Signatures", () => {
    const accountToken: string = testingKeys.get("ACCOUNT_API_TOKEN");
    const testDomainName: string = testingKeys.get("DOMAIN_NAME");
    const client: postmark.AccountClient = new postmark.AccountClient(accountToken);
    const domainName: string = testDomainName;

    function signatureToTest() {
        return new CreateSignatureRequest("John Smith", `mailing+${Date.now()}@${domainName}`);
    }

    async function cleanup() {
        const domains = await client.getDomains();

        for (const domain of domains.Domains) {
            if (domain.Name.includes(domainName)) { await client.deleteDomain(domain.ID); }
        }
    }

    before(cleanup);
    after(cleanup);

    it("createSenderSignature", async () => {
        const signatureOptions = signatureToTest();

        const signatureDetails = await client.createSenderSignature(signatureOptions);
        expect(signatureDetails.EmailAddress).to.equal(signatureOptions.FromEmail);
    });

    it("getSenderSignatures", async () => {
        const signatures = await client.getSenderSignatures();
        expect(signatures.TotalCount).to.gte(0);
    });

    it("getSenderSignature", async () => {
        const signatureOptions = signatureToTest();
        const signature = await client.createSenderSignature(signatureOptions);

        const signatureDetails = await client.getSenderSignature(signature.ID);
        expect(signatureDetails.EmailAddress).to.equal(signatureOptions.FromEmail);
    });

    it("editSenderSignature", async () => {
        const editName = "Updated name";
        const signatureOptions = signatureToTest();
        const signature = await client.createSenderSignature(signatureOptions);

        const signatureDetails = await client.editSenderSignature(signature.ID, { Name: editName });
        expect(signatureDetails.Name).to.equal(editName);
    });

    it("deleteSenderSignature", async () => {
        const signatureOptions = signatureToTest();
        const signature = await client.createSenderSignature(signatureOptions);

        const result: postmark.Models.DefaultResponse = await client.deleteSenderSignature(signature.ID);
        expect(result.Message.length).to.above(0);
    });

    it("resendSenderSignatureConfirmation", async () => {
        const signatureOptions = signatureToTest();
        const signature = await client.createSenderSignature(signatureOptions);

        const result: postmark.Models.DefaultResponse = await client.resendSenderSignatureConfirmation(signature.ID);
        expect(result.Message.length).to.above(0);
    });

    it("resendSenderSignatureConfirmation", async () => {
        const signatureOptions = signatureToTest();
        const signature = await client.createSenderSignature(signatureOptions);

        const signatureDetails = await client.verifySenderSignatureSPF(signature.ID);
        expect(signatureDetails.ID).to.eq(signature.ID);
    });
});
