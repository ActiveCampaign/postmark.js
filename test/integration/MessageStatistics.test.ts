import * as postmark from '../../src/index';

import { expect } from 'chai';
import 'mocha';

const nconf = require('nconf');
const testingKeys = nconf.env().file({ file: __dirname + '/../../testing_keys.json' });

describe('Client - Message Statistics', function () {
    const serverToken: string = testingKeys.get('SERVER_TOKEN');
    const client = new postmark.ServerClient(serverToken);

    function formattedDate(date: Date) {
        return '' + date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
    }

    it('getDeliveryStatistics', async () => {
        const stats = await client.getDeliveryStatistics();
        expect(stats.InactiveMails).to.be.gte(0);
    });

    it('getSentCounts', async () => {
        const stats = await client.getSentCounts();
        expect(stats.Sent).to.be.gte(0);
    });

    it('getBounceCounts', async () => {
        const stats = await client.getBounceCounts();
        expect(stats).not.to.be.null;
    });

    it('getSpamComplaints', async () => {
        const stats = await client.getSpamComplaintsCounts();
        expect(stats.Days.length).to.be.gte(0);
    });

    it('getTrackedEmailCounts', async () => {
        const stats = await client.getTrackedEmailCounts();
        expect(stats.Tracked).to.be.gte(0)
    });

    it('getOutboundOverview', async () => {
        let now = new Date();
        let yesterday = new Date(now.valueOf() - (24 * 3600 * 1000));
        let toDate = formattedDate(now);
        let fromDate = formattedDate(yesterday);

        const stats = await client.getOutboundOverview({ fromDate: fromDate, toDate: toDate });
        expect(stats.Sent).to.be.gte(0);
    });
});