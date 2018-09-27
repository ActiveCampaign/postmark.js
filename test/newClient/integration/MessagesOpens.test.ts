import * as postmark from '../../../src/index'
import { expect } from 'chai';
import 'mocha';

import { EmailClientUsageCounts, EmailPlaformUsageCounts, OpenCounts, OutboundMessageOpens } from "../../../src/client/models";

const nconf = require('nconf');
const testingKeys = nconf.env().file({file: __dirname + '/../../../testing_keys.json'});

describe('Client - Message Statistics', () => {
    let client:postmark.ServerClient;
    const serverToken:string = testingKeys.get('SERVER_TOKEN');

    beforeEach(function () {
        client = new postmark.ServerClient(serverToken);
    });

    it('getMessageOpens', async () =>{
        const result: OutboundMessageOpens = await client.getMessageOpens();
        expect(result.TotalCount).to.gte(0);
    });

    it('getEmailOpenCounts', async () =>{
        const result: OpenCounts = await client.getEmailOpenCounts();
        expect(result.Days.length).to.gte(0);
    });

    it('getEmailPlatformUsage', async () =>{
        const result: EmailPlaformUsageCounts = await client.getEmailOpenPlatformUsage();
        expect(result.Days.length).to.gte(0);
    });

    it('getEmailClientUsage', async () =>{
        const result: EmailClientUsageCounts =  await client.getEmailOpenClientUsage();
        expect(result.Days.length).to.gte(0);
    });
});