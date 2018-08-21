import {Hash} from "./SupportingTypes";

export default interface FilteringParameters extends Hash<any>{
    count?: number;
    offset?: number;
}