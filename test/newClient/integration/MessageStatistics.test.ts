import { ServerClient } from '../../../src/index'
import { expect } from 'chai';
import 'mocha';

const nconf = require('nconf');
const testingKeys = nconf.env().file({file: __dirname + '/../../../testing_keys.json'});

describe('Client - Click Statistics', () => {
    let client:ServerClient;
    const serverToken:string = testingKeys.get('SERVER_TOKEN');

    beforeEach(function () {
        client = new ServerClient(serverToken);
    });

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
        var now:Date = new Date();
        var yesterday = new Date(now.valueOf() - (24 * 3600 * 1000));
        var toDate = '' + now.getFullYear() + '-' + (now.getMonth() + 1) + '-' + now.getDate();
        var fromDate = '' + yesterday.getFullYear() + '-' + (yesterday.getMonth() + 1) + '-' + yesterday.getDate();

        const stats = await client.getOutboundOverview({fromDate: fromDate, toDate: toDate});
        expect(stats.Sent).to.be.gte(0);
    });

});