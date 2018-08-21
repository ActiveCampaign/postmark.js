import {LinkClickLocation} from "../message/SupportingTypes";
import {ClientDetails, OSDetails, GEOLocation} from "./OutboundMessageOpen";

export interface ClickEvent {
    RecordType: string;
    ClickLocation: LinkClickLocation;
    Client: ClientDetails;
    OS: OSDetails;
    Platform: string;
    UserAgent: string;
    OriginalLink: string;
    Geo: GEOLocation;
    MessageID: string;
    ReceivedAt: string;
    Tag: string,
    Recipient: string;
}


export interface OutboundMessageClicks {
    TotalCount: number;
    Clicks: ClickEvent[];
}

