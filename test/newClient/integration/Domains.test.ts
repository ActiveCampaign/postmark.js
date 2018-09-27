import {AccountClient} from '../../../src/index'

import {expect} from 'chai';
import 'mocha';
import {DomainDetails, Domains} from "../../../src/client/models";
import DefaultResponse from "../../../src/client/models/client/PostmarkResponse";

const nconf = require('nconf');
const testingKeys = nconf.env().file({file: __dirname + '/../../../testing_keys.json'});

describe('Client - Domains', function () {
    this.timeout(5000);

    let client: AccountClient;
    const accountToken: string = testingKeys.get('ACCOUNT_TOKEN');
    let testDomainName: string = testingKeys.get('DOMAIN_NAME');

    const domainPrefix: string = 'node-js-test-domain';
    let domainName: string;
    let returnPath: string;

    function returnPathToTest(domainName: string) {
        return `return.${domainName}`
    }

    function domainToTest(prefix: string) {
        return `${prefix}-${domainName}`
    }

    async function cleanup() {
        let client = new AccountClient(accountToken);
        let domains: Domains = await client.getDomains()

        for (let i = 0; i < domains.Domains.length; i++) {
            let domain = domains.Domains[i];
            if (domain.Name.includes(domainPrefix)) { await client.deleteDomain(domain.ID) }
        };
    };

    beforeEach(function () {
        client = new AccountClient(accountToken);

        domainName = `${domainPrefix}-${testDomainName}`;
        returnPath = `return.${domainName}`;
    });

    before(cleanup);
    after(cleanup);

    it("createDomain", async () => {
        const name: string = domainToTest('create-test');
        const rp: string = returnPathToTest(name);
        const domainDetails: DomainDetails = await client.createDomain({Name: name, ReturnPathDomain: rp });
        expect(domainDetails.Name).to.equal(name);
    });

    it("getDomains", async () => {
        const domains = await client.getDomains();
        expect(domains.TotalCount).to.gte(0);
    });

    it("getDomain", async () => {
        const name: string = domainToTest('get-test');
        const domain: DomainDetails = await client.createDomain({Name: name });
        const domainDetails: DomainDetails = await client.getDomain(domain.ID);
        expect(domainDetails.Name).to.equal(name);
    });

    it("editDomain", async () => {
        const name: string = domainToTest('edit-test');
        const rp: string = returnPathToTest(name);
        const domain: DomainDetails = await client.createDomain({Name: name });
        const domainDetails: DomainDetails = await client.editDomain(domain.ID, {ReturnPathDomain: rp});
        expect(domainDetails.ReturnPathDomain).to.equal(rp);
    });

    it("deleteDomain", async () => {
        const name: string = domainToTest('delete-test');
        const domain: DomainDetails = await client.createDomain({Name: name });
        const response: DefaultResponse = await client.deleteDomain(domain.ID);
        expect(response.Message.length).to.above(0);
    });

    it("verifyDomainDKIM", async () => {
        const name: string = domainToTest('dkim-verify-test');
        const domain: DomainDetails = await client.createDomain({Name: name });
        const response: DomainDetails = await client.verifyDomainDKIM(domain.ID);
        expect(response.ID).to.eq(domain.ID);
    });

    it("verifyDomainReturnPath", async () => {
        const name: string = domainToTest('rp-verify-test');
        const domain: DomainDetails = await client.createDomain({Name: name });
        const response: DomainDetails = await client.verifyDomainReturnPath(domain.ID);
        expect(response.ID).to.eq(domain.ID);
    });
});