export class StatisticsFilteringParameters {
    constructor(tag?: string, fromDate?: string, toDate?: string) {
        this.tag = tag;
        this.fromDate = fromDate;
        this.toDate = toDate;
    }
    tag?: string;
    fromDate?: string;
    toDate?: string;
}