'use strict';

import { ServerClient } from '../../src/index'
import { expect } from 'chai';
import 'mocha';
import {PostmarkError} from "../../src/client/models/client/PostmarkError";

const nconf = require('nconf');
const packageJson = require("../../package.json")
const testingKeys = nconf.env().file({file: __dirname + '/../../testing_keys.json'});
const clientVersion = packageJson.version;

describe('ServerClient', () => {
    let client:ServerClient;
    const serverToken:string = testingKeys.get('SERVER_TOKEN');

    beforeEach(function () {
        client = new ServerClient(serverToken);
    });

    describe('#new', () => {
        it('default clientOptions', () => {
            expect(client.clientOptions).to.eql({
                useHttps: true,
                requestHost: 'api.postmarkapp.com',
                timeout: 30
            });
        });

        it('clientVersion', () => {
            expect(client.clientVersion).to.equal(clientVersion);
        });
    });

    it('clientVersion=', () => {
        const customClientVersion:string = "test"

        client.clientVersion=customClientVersion;
        expect(client.clientVersion).to.equal(customClientVersion);
    });

    it('clientOptions=', () => {
        const requestHost:string = 'test';
        const useHttps:boolean = false;
        const timeout:number = 10;

        client.clientOptions.requestHost = requestHost;
        client.clientOptions.useHttps = useHttps;
        client.clientOptions.timeout = timeout;

        expect(client.clientOptions).to.eql({
            useHttps: useHttps,
            requestHost: requestHost,
            timeout: timeout
        });
    });

    describe('errors', () => {
        it('empty token', () => {
            expect(() => new ServerClient('')).to.throw('A valid API token must be provided when creating a ClientOptions');
        });
    });
});