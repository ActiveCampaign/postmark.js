import {ServerClient} from '../../../src/index'
import {Message, MessageSendingResponse} from "../../../src/client/models";

import { expect } from 'chai';
import 'mocha';

const nconf = require('nconf');
const testingKeys = nconf.env().file({file: __dirname + '/../../../testing_keys.json'});

describe('Sending', () => {
    let client: ServerClient;
    let message: Message;

    const serverToken: string = testingKeys.get('SERVER_TOKEN');
    const fromAddress: string = testingKeys.get('SENDER_EMAIL_ADDRESS');
    const toAddress: string = testingKeys.get('EMAIL_RECIPIENT_ADDRESS');

    beforeEach(function () {
        client = new ServerClient(serverToken);
        message = { From: fromAddress, To: toAddress, Subject: 'Test subject', HtmlBody: 'Test html body' };
    });

    it('sendEmail', async() => {
        const response: MessageSendingResponse = await client.sendEmail(message);
        expect(response.Message).to.equal('OK')
    });

    it('sendEmailBatch', async() => {
        const messages: Message[] = Array.from({length:3}, () => message)
        const responses:MessageSendingResponse[] = await client.sendEmailBatch(messages);

        expect(responses[0].Message).to.equal('OK');
        expect(responses.length).to.equal(3);
    });

    describe('invalid', () => {
        it('sendEmail', () => {
            message.HtmlBody = undefined;

            return client.sendEmail(message).then(result => {
                expect(result).to.equal(undefined);
            }).catch(error => {
                expect(error.name).to.equal('ApiInputError');
            });
        });
    });
});