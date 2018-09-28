import * as postmark from '../../../src/index'
import {DefaultResponse, Domains, SignatureDetails, SignatureOptions, Signatures} from "../../../src/client/models";

import {expect} from 'chai';
import 'mocha';

const nconf = require('nconf');
const testingKeys = nconf.env().file({file: __dirname + '/../../../testing_keys.json'});

describe('Client - Signatures', function () {
    const accountToken: string = testingKeys.get('ACCOUNT_TOKEN');
    const testDomainName: string = testingKeys.get('DOMAIN_NAME');
    const client: postmark.AccountClient = new postmark.AccountClient(accountToken);
    const domainName = `node-js-test-signatures-${testDomainName}`;

    function signatureToTest(): SignatureOptions {
        const fromEmail: string = `${Date.now()}@${domainName}`
        return {FromEmail: fromEmail, Name: 'John Smith'}
    }

    async function cleanup() {
        let client = new postmark.AccountClient(accountToken);
        let domains: Domains = await client.getDomains()

        for (let i = 0; i < domains.Domains.length; i++) {
            let domain = domains.Domains[i];
            if (domain.Name.includes(domainName)) { await client.deleteDomain(domain.ID) }
        };
    };

    before(cleanup);
    after(cleanup);

    it("createSenderSignature", async () => {
        const signatureOptions: SignatureOptions = signatureToTest();

        const signatureDetails: SignatureDetails = await client.createSenderSignature(signatureOptions);
        expect(signatureDetails.EmailAddress).to.equal(signatureOptions.FromEmail);
    });

    it("getSenderSignatures", async () => {
        const signatures: Signatures = await client.getSenderSignatures();
        expect(signatures.TotalCount).to.gte(0);
    });

    it("getSenderSignature", async () => {
        const signatureOptions: SignatureOptions = signatureToTest();
        const signature: SignatureDetails = await client.createSenderSignature(signatureOptions);

        const signatureDetails: SignatureDetails = await client.getSenderSignature(signature.ID);
        expect(signatureDetails.EmailAddress).to.equal(signatureOptions.FromEmail);
    });

    it("editSenderSignature", async () => {
        const editName: string = 'Updated name';
        const signatureOptions: SignatureOptions = signatureToTest();
        const signature: SignatureDetails = await client.createSenderSignature(signatureOptions);

        const signatureDetails: SignatureDetails = await client.editSenderSignature(signature.ID, {Name: editName});
        expect(signatureDetails.Name).to.equal(editName);
    });

    it("deleteSenderSignature", async () => {
        const signatureOptions: SignatureOptions = signatureToTest();
        const signature: SignatureDetails = await client.createSenderSignature(signatureOptions);

        const result: DefaultResponse = await client.deleteSenderSignature(signature.ID);
        expect(result.Message.length).to.above(0);
    });

    it("resendSenderSignatureConfirmation", async () => {
        const signatureOptions: SignatureOptions = signatureToTest();
        const signature: SignatureDetails = await client.createSenderSignature(signatureOptions);

        const result: DefaultResponse = await client.resendSenderSignatureConfirmation(signature.ID);
        expect(result.Message.length).to.above(0);
    });

    it("resendSenderSignatureConfirmation", async () => {
        const signatureOptions: SignatureOptions = signatureToTest();
        const signature: SignatureDetails = await client.createSenderSignature(signatureOptions);

        const signatureDetails: SignatureDetails = await client.verifySenderSignatureSPF(signature.ID);
        expect(signatureDetails.ID).to.eq(signature.ID);
    });
});