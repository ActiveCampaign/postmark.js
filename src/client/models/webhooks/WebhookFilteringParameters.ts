/**
 * Describes filtering parameters that can be used when retrieving webhooks.
 */
export class WebhookFilteringParameters {
    public messageStream?: string;

    constructor(messageStream: string) {
        this.messageStream = messageStream;
    }
}
