import * as postmark from "../../src/index";

import { expect } from "chai";
import "mocha";

import * as nconf from "nconf";
const testingKeys = nconf.env().file({file: __dirname + "/../../testing_keys.json"});

const packageJson = require("../../package.json");
const clientVersion = packageJson.version;
import * as sinon from "sinon";


describe("AxiosHttpClient", () => {
    it("no response", () => {
    });

    /*

        it("no message", () => {
            const errorHandler = new ErrorHandler();
            const error: any = { stack: 'Hello stack' };

            const postmarkError = errorHandler.buildError(error);
            expect(postmarkError).to.be.an.instanceof(Errors.PostmarkError);
            expect(postmarkError.name).to.equal("PostmarkError");
            expect(postmarkError.message).to.equal(JSON.stringify(error));
        });
    */
});
