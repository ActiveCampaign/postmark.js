import * as postmark from '../../../src/index'
import {DomainDetails, DomainOptions, Domains, DefaultResponse} from "../../../src/client/models";

import {expect} from 'chai';
import 'mocha';

const nconf = require('nconf');
const testingKeys = nconf.env().file({file: __dirname + '/../../../testing_keys.json'});

describe('Client - Domains', function () {
    const accountToken: string = testingKeys.get('ACCOUNT_TOKEN');
    const client: postmark.AccountClient = new postmark.AccountClient(accountToken);
    const domainName: string = testingKeys.get('DOMAIN_NAME');

    function returnPathToTest(domainName: string) {
        return `return.${domainName}`
    }

    function domainToTest():DomainOptions {
        return {
            Name: `${Date.now()}-${domainName}`
        }
    }

    async function cleanup() {
        let domains: Domains = await client.getDomains()

        for (let i = 0; i < domains.Domains.length; i++) {
            let domain = domains.Domains[i];
            if (domain.Name.includes(domainName)) { await client.deleteDomain(domain.ID) }
        };
    };

    before(cleanup);
    after(cleanup);

    it("createDomain", async () => {
        const domainOptions: DomainOptions = domainToTest();
        const domainDetails: DomainDetails = await client.createDomain(domainOptions);
        expect(domainDetails.Name).to.equal(domainOptions.Name);
    });

    it("getDomains", async () => {
        const domains = await client.getDomains();
        expect(domains.TotalCount).to.gte(0);
    });

    it("getDomain", async () => {
        const domainOptions: DomainOptions = domainToTest();
        const domain: DomainDetails = await client.createDomain(domainOptions);

        const domainDetails: DomainDetails = await client.getDomain(domain.ID);
        expect(domainDetails.Name).to.equal(domainOptions.Name);
    });

    it("editDomain", async () => {
        const domainOptions: any = domainToTest();
        const returnPath: string = returnPathToTest(domainOptions.Name);
        const domain: DomainDetails = await client.createDomain(domainOptions);

        const domainDetails: DomainDetails = await client.editDomain(domain.ID, {ReturnPathDomain: returnPath});
        expect(domainDetails.ReturnPathDomain).to.equal(returnPath);
    });

    it("deleteDomain", async () => {
        const domain: DomainDetails = await client.createDomain(domainToTest());

        const response: DefaultResponse = await client.deleteDomain(domain.ID);
        expect(response.Message.length).to.above(0);
    });

    it("verifyDomainDKIM", async () => {
        const domain: DomainDetails = await client.createDomain(domainToTest());
        const response: DomainDetails = await client.verifyDomainDKIM(domain.ID);
        expect(response.ID).to.eq(domain.ID);
    });

    it("verifyDomainReturnPath", async () => {
        const domain: DomainDetails = await client.createDomain(domainToTest());
        const response: DomainDetails = await client.verifyDomainReturnPath(domain.ID);
        expect(response.ID).to.eq(domain.ID);
    });
});