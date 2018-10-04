import {Hash} from "./SupportingTypes";

export interface FilteringParameters extends Hash<any>{
    count?: number;
    offset?: number;
}