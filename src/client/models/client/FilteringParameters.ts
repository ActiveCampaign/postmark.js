import { Hash } from "./SupportingTypes";

export class FilteringParameters implements Hash<any>{
    constructor(count: number = 100, offset: number = 0) {
        this.count = count;
        this.offset = offset;
    }
    count: number;
    offset: number;
}