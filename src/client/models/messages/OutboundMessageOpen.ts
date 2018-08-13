export interface ClientDetails {
    Name: string;
    Company: string;
    Family: string;
}

export type OSDetails = ClientDetails;

export interface GEOLocation {
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
    RecordType: string,
    Client: ClientDetails;
    OS: OSDetails;
    Platform: string;
    UserAgent: string;
    ReadSeconds: number;
    Geo: GEOLocation;
    MessageID: string;
    ReceivedAt: string;
    Tag: string,
    Recipient: string;
}


export default interface OutboundMessageOpens {
    TotalCount: number;
    Opens: OpenEvent[];
}

