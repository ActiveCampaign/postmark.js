export class StatisticsFilteringParameters {
    public tag?: string;
    public fromDate?: string;
    public toDate?: string;
    constructor(tag?: string, fromDate?: string, toDate?: string) {
        this.tag = tag;
        this.fromDate = fromDate;
        this.toDate = toDate;
    }
}
