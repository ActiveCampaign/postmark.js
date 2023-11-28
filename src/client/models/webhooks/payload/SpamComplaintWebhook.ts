import {Hash} from "../../client/SupportingTypes";

export interface SpamComplaintWebhook {
    RecordType: "SpamComplaint";
    Metadata: Hash<string>;
    ID: number;
    Type: string;
    TypeCode: number;
    Name: string;
    Tag?: string;
    MessageID: string;
    ServerID: number;
    Description: string;
    Details: string;
    Email: string;
    From: string;
    BouncedAt: string;
    DumpAvailable: boolean;
    Inactive: boolean;
    CanActivate: boolean;
    Subject: string;
    Content?: string;
    MessageStream: string;
}