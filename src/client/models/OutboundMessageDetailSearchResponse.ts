import OutboundMessageDetails from "./OutboundMessageDetails";

export default interface OutboundMessageDetailSearchResponse{
    TotalCount: number,
    Messages: OutboundMessageDetails[]
}