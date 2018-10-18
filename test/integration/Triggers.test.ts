import * as postmark from '../../src/index';

import { expect } from 'chai';
import 'mocha';

const nconf = require('nconf');
const testingKeys = nconf.env().file({file: __dirname + '/../../testing_keys.json'});

describe('Client - Triggers', function() {
    const serverToken:string = testingKeys.get('SERVER_TOKEN');
    let client: postmark.ServerClient = new postmark.ServerClient(serverToken);
    const triggerName: string = 'node-js'

    function tagTriggerToTest(): postmark.DataTypes.TagTriggerOptions {
        return {
            MatchName: `${triggerName}_${Date.now()}`,
            TrackOpens: true
        };
    };

    function inboundRuleTriggerToTest(): postmark.DataTypes.InboundRuleOptions {
        return {
            Rule: `${triggerName}-${Date.now()}.com`,
        }
    };

    async function cleanupTagTriggers() {
        let tagTriggers: postmark.DataTypes.TagTriggers = await client.getTagTriggers();

        for (let i = 0; i < tagTriggers.Tags.length; i++) {
            let tagTrigger: postmark.DataTypes.TagTrigger = tagTriggers.Tags[i];
            if (tagTrigger.MatchName.includes(triggerName)) {
                await client.deleteTagTrigger(tagTrigger.ID);
            };
        };
    };
    
    async function cleanupInboundRuleTriggers() {
        let inboundRuleTriggers: postmark.DataTypes.InboundRules = await client.getInboundRuleTriggers();

        for (let i = 0; i < inboundRuleTriggers.InboundRules.length; i++) {
            let inboundRuleTrigger: postmark.DataTypes.InboundRule = inboundRuleTriggers.InboundRules[i];
            if (inboundRuleTrigger.Rule.includes(triggerName)) {
                await client.deleteInboundRuleTrigger(inboundRuleTrigger.ID);
            };
        };
    }
    
    async function cleanup() {
        await cleanupTagTriggers();
        await cleanupInboundRuleTriggers();
    };

    before(cleanup);
    after(cleanup);

    it('createTagTrigger', async () => {
        const tagTriggerOptions: postmark.DataTypes.TagTriggerOptions = tagTriggerToTest();
        const result: postmark.DataTypes.TagTrigger = await client.createTagTrigger(tagTriggerOptions);
        expect(result.MatchName).to.equal(tagTriggerOptions.MatchName);
    });

    it('editTagTrigger', async () => {
        const tagTriggerOptions: postmark.DataTypes.TagTriggerOptions = tagTriggerToTest();
        const editMatchName: string = `${tagTriggerOptions.MatchName}-updated`;
        const tagTrigger: postmark.DataTypes.TagTrigger = await client.createTagTrigger(tagTriggerOptions);

        const tagTriggerDetails: postmark.DataTypes.TagTrigger = await client.editTagTrigger(tagTrigger.ID, {MatchName: editMatchName})
        expect(tagTriggerDetails.MatchName).to.equal(editMatchName);
    });

    it('deleteTagTrigger', async () => {
        const tagTriggerOptions: postmark.DataTypes.TagTriggerOptions = tagTriggerToTest();
        const tagTrigger: postmark.DataTypes.TagTrigger = await client.createTagTrigger(tagTriggerOptions);

        const response: postmark.DataTypes.DefaultResponse = await client.deleteTagTrigger(tagTrigger.ID);
        expect(response.Message.length).to.above(0);
    });

    it('getTagTriggers', async () => {
        const tagTriggerOptions: postmark.DataTypes.TagTriggerOptions = tagTriggerToTest();
        await client.createTagTrigger(tagTriggerOptions);

        const tagTriggers: postmark.DataTypes.TagTriggers = await client.getTagTriggers();
        expect(tagTriggers.Tags.length).to.above(0);
    });

    it('getTagTrigger', async () => {
        const tagTriggerOptions: postmark.DataTypes.TagTriggerOptions = tagTriggerToTest();
        await client.createTagTrigger(tagTriggerOptions);

        const tagTriggers: postmark.DataTypes.TagTriggers = await client.getTagTriggers();
        const tagTrigger: postmark.DataTypes.TagTrigger = await client.getTagTrigger(tagTriggers.Tags[0].ID);
        expect(tagTrigger.ID).to.above(0);
    });

    it('createInboundRuleTrigger', async () => {
        const inboundRuleTriggerOptions: postmark.DataTypes.InboundRuleOptions = inboundRuleTriggerToTest();
        const result: postmark.DataTypes.InboundRule = await client.createInboundRuleTrigger(inboundRuleTriggerOptions);
        expect(result.Rule).to.equal(inboundRuleTriggerOptions.Rule);
    });

    it('getInboundRuleTriggers', async () => {
        const inboundRules: postmark.DataTypes.InboundRules = await client.getInboundRuleTriggers();
        expect(inboundRules.InboundRules.length).to.gte(0);
    });

    it('deleteInboundRuleTrigger', async () => {
        const inboundRuleTriggerOptions: postmark.DataTypes.InboundRuleOptions = inboundRuleTriggerToTest();
        const inboundRule: postmark.DataTypes.InboundRule = await client.createInboundRuleTrigger(inboundRuleTriggerOptions);

        const response: postmark.DataTypes.DefaultResponse = await client.deleteInboundRuleTrigger(inboundRule.ID);
        expect(response.Message.length).to.above(0);
    });
});