/**
 * Describes filtering parameters that can be used when retrieving message streams.
 */
export class MessageStreamsFilteringParameters {
    public messageStreamType?: string;
    public includeArchivedStreams?: boolean;

    constructor(messageStreamType?: string, includeArchivedStreams?: boolean) {
        this.messageStreamType = messageStreamType;
        this.includeArchivedStreams = includeArchivedStreams;
    }
}
