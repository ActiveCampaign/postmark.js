import { LinkClickLocation } from "../message/SupportingTypes";
import { ClientDetails, GeoLocation } from "./OutboundMessageOpen";

export interface ClickEvent {
    ClickLocation: LinkClickLocation;
    Client: ClientDetails;
    OS: ClientDetails;
    Platform: string;
    UserAgent: string;
    OriginalLink: string;
    Geo: GeoLocation;
    MessageID: string;
    ReceivedAt: string;
    Tag: string;
    Recipient: string;
    MessageStream: string;
}

export interface OutboundMessageClicks {
    TotalCount: number;
    Clicks: ClickEvent[];
}
