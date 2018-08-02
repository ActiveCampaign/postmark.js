import BounceInfo from "./BounceInfo";

export default interface BounceListingResponse {
    TotalCount: number
    Bounces: BounceInfo[]
}