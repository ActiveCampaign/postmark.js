import * as postmark from '../../src/index';

import { expect } from 'chai';
import 'mocha';

const nconf = require('nconf');
const testingKeys = nconf.env().file({file: __dirname + '/../../testing_keys.json'});

describe('Client - Click Statistics', function () {
    const serverToken:string = testingKeys.get('SERVER_TOKEN');
    const client:postmark.ServerClient = new postmark.ServerClient(serverToken);

    it('getClickCounts', async() => {
        const stats: postmark.DataTypes.ClickCounts = await client.getClickCounts();
        expect(stats.Clicks).to.be.gte(0);
    });

    it('getClickBrowserUsage', async() => {
        const stats: postmark.DataTypes.BrowserUsageCounts = await client.getClickBrowserUsage();
        expect(stats.Days.length).to.be.gte(0);
    });

    it('getEmailOpenPlatformUsage', async() => {
        const stats: postmark.DataTypes.EmailPlaformUsageCounts = await client.getEmailOpenPlatformUsage();
        expect(stats.Days.length).to.be.gte(0);
    });

    it('getClickLocation', async() => {
        const stats: postmark.DataTypes.ClickLocationCounts = await client.getClickLocation();
        expect(stats.Days.length).to.be.gte(0);
    });
});