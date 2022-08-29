export class StatisticsFilteringParameters {
    public tag?: string;
    public fromDate?: string;
    public toDate?: string;
    public messageStream?: string;

    constructor(tag?: string, fromDate?: string, toDate?: string, messageStream?: string) {
        this.tag = tag;
        this.fromDate = fromDate;
        this.toDate = toDate;
        this.messageStream = messageStream;
    }
}
