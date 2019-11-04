export interface ClientDetails {
    Name: string;
    Company: string;
    Family: string;
}

export interface GeoLocation {
    CountryISOCode?: string;
    Country?: string;
    RegionISOCode?: string;
    Region?: string;
    City?: string;
    Zip?: string;
    Coords?: string;
    IP?: string;
}

export interface OpenEvent {
    RecordType: string;
    Client: ClientDetails;
    OS: ClientDetails;
    Platform: string;
    UserAgent: string;
    ReadSeconds: number;
    Geo: GeoLocation;
    MessageID: string;
    ReceivedAt: string;
    Tag: string;
    Recipient: string;
    MessageStream: string;
}

export interface OutboundMessageOpens {
    TotalCount: number;
    Opens: OpenEvent[];
}
