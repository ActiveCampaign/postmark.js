import {LinkClickLocation} from "../message/SupportingTypes";

export interface MessageEvent {
    Recipient: string;
    Type: string;
    ReceivedAt: string;
    Details: object;
}

export interface ClickEvent extends MessageEvent {
    Details: {
        Summary: string;
        Link: string;
        ClickLocation: LinkClickLocation;
    };
}

export interface DeliveryEvent extends MessageEvent {
    Details: {
        DeliveryMessage: string;
        DestinationServer: string;
        DestinationIP: string;
    };
}

export interface TransientDelayEvent extends MessageEvent {
    Details: {
        DeliveryMessage: string;
        DestinationServer: string;
        DestinationIP: string;
    };
}

export interface BounceEvent extends MessageEvent {
    Details: {
        Summary: string;
        BounceID: number;
    };
}

export interface OpenEvent extends MessageEvent {
    Details: {
        Summary: string;
    };
}
