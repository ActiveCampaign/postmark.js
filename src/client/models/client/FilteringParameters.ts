import { Hash } from "./SupportingTypes";

export class FilteringParameters implements Hash<any>{
    count?: number;
    offset?: number;
}