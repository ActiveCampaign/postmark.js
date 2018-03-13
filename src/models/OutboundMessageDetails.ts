import { LinkTrackingOptions, LinkClickLocation } from "./SupportingTypes";

export interface MessageEventInfo {
    Recipient: string
    Type: string
    ReceivedAt: string
    Details: object
}

export interface ClickEventInfo extends MessageEventInfo {
    Details: {
        Summary: string
        Link: string
        ClickLocation: LinkClickLocation
    }
}

export interface DeliveryEventInfo extends MessageEventInfo {
    Details: {
        DeliveryMessage: string
        DestinationServer: string
        DestinationIP: string
    }
}

export interface TransientDelayEventInfo extends MessageEventInfo {
    Details: {
        DeliveryMessage: string
        DestinationServer: string
        DestinationIP: string
    }
}

export interface BounceEventInfo extends MessageEventInfo {
    Details: {
        Summary: string
        BounceID: number
    }
}

export interface OpenEventInfo extends MessageEventInfo {
    Details: {
        Summary: string
    }
}

export interface Recipient {
    Email: string
    Name: string
}
export default interface OutboundMessageDetails {
    MessageID: string
    To: Recipient[]
    Cc: Recipient[],
    Bcc: Recipient[],
    Recipients: string[]
    ReceivedAt: string
    From: string
    Subject: string
    Attachments: string[]
    Status: string
    TrackOpens: boolean,
    TrackLinks: LinkTrackingOptions,
}

export interface OutboundMessageDetailsExtended extends OutboundMessageDetails {
    TextBody?: string
    HtmlBody?: string
    Body: string
    Tag?: string
    MessageEvents: MessageEventInfo[]
}