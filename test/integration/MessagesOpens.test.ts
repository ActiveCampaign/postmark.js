import * as postmark from '../../src/index';

import { expect } from 'chai';
import 'mocha';

const nconf = require('nconf');
const testingKeys = nconf.env().file({file: __dirname + '/../../testing_keys.json'});

describe('Client - Message Statistics', function() {
    const serverToken:string = testingKeys.get('SERVER_TOKEN');
    const client:postmark.ServerClient = new postmark.ServerClient(serverToken);

    it('getMessageOpens', async () =>{
        const result: postmark.Models.OutboundMessageOpens = await client.getMessageOpens();
        expect(result.TotalCount).to.gte(0);
    });

    it('getEmailOpenCounts', async () =>{
        const result: postmark.Models.OpenCounts = await client.getEmailOpenCounts();
        expect(result.Days.length).to.gte(0);
    });

    it('getEmailPlatformUsage', async () =>{
        const result: postmark.Models.EmailPlaformUsageCounts = await client.getEmailOpenPlatformUsage();
        expect(result.Days.length).to.gte(0);
    });

    it('getEmailClientUsage', async () =>{
        const result: postmark.Models.EmailClientUsageCounts =  await client.getEmailOpenClientUsage();
        expect(result.Days.length).to.gte(0);
    });
});