import * as postmark from "../../src/index";

import { expect } from "chai";
import "mocha";
import { CreateDomainRequest } from "../../src/client/models";

import * as dotenv from "dotenv";
import { getTestRunTag } from "./testRunTag";
dotenv.config();

describe("Client - Domains", () => {
    const tag = getTestRunTag().toLowerCase().replace(/[^a-z0-9-]/g, "-");
    const accountToken: any = process.env.ACCOUNT_API_TOKEN
    const client = new postmark.AccountClient(accountToken);
    const domainName: string = `nodejs-${tag}.${process.env.DOMAIN_NAME}`;

    function returnPathToTest(domainNameForReturnPath: string) {
        return `return.${domainNameForReturnPath}`;
    }

    function domainToTest() {
        // Keep the first label starting with a letter.
        return new CreateDomainRequest(`nodejs-${tag}-${Date.now()}.${process.env.DOMAIN_NAME}`);
    }

    async function cleanup() {
        const domains = await client.getDomains();

        for (const domain of domains.Domains) {
            if (domain.Name.includes(domainName)) {
                try {
                    await client.deleteDomain(domain.ID);
                } catch (err) {
                    const statusCode = (err as { statusCode?: number } | undefined)?.statusCode;
                    if (statusCode !== 404) throw err;
                }
            }
        }
    }

    before(cleanup);
    after(cleanup);

    it("createDomain", async () => {
        const domainOptions = domainToTest();
        const domainDetails = await client.createDomain(domainOptions);
        expect(domainDetails.Name).to.equal(domainOptions.Name);
    });

    it("getDomains", async () => {
        const domains = await client.getDomains();
        expect(domains.TotalCount).to.gte(0);
    });

    it("getDomain", async () => {
        const domainOptions = domainToTest();
        const domain = await client.createDomain(domainOptions);

        const domainDetails = await client.getDomain(domain.ID);
        expect(domainDetails.Name).to.equal(domainOptions.Name);
    });

    it("editDomain", async () => {
        const domainOptions = domainToTest();
        const returnPath = returnPathToTest(domainOptions.Name);
        const domain = await client.createDomain(domainOptions);

        const domainDetails = await client.editDomain(domain.ID, { ReturnPathDomain: returnPath });
        expect(domainDetails.ReturnPathDomain).to.equal(returnPath);
    });

    it("deleteDomain", async () => {
        const domain = await client.createDomain(domainToTest());

        const response = await client.deleteDomain(domain.ID);
        expect(response.Message.length).to.above(0);
    });

    it("verifyDomainDKIM", async () => {
        const domain = await client.createDomain(domainToTest());
        const response = await client.verifyDomainDKIM(domain.ID);
        expect(response.ID).to.eq(domain.ID);
    });

    it("verifyDomainReturnPath", async () => {
        const domain = await client.createDomain(domainToTest());
        const response = await client.verifyDomainReturnPath(domain.ID);
        expect(response.ID).to.eq(domain.ID);
    });
});
