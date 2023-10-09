import {Hash} from "../../client/SupportingTypes";

export interface DeliveryWebhook {
    RecordType: string;
    ServerID: number;
    MessageStream: string;
    MessageID: string;
    Recipient: string;
    Tag?: string;
    DeliveredAt: string;
    Details: string;
    Metadata: Hash<string>;
}