import { Hash } from "./SupportingTypes";

export class FilteringParameters implements Hash<any>{
    constructor(count: number, offset: number) {
        this.count = count;
        this.offset = offset;
    }
    count: number;
    offset: number;
}