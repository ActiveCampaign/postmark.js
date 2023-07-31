import {Hash} from "../../client/SupportingTypes";

export interface DeliveryWebhook {
    RecordType: string;
    ServerId: number;
    MessageStream: string;
    MessageId: string;
    Recipient: string;
    Tag: string;
    DeliveredAt: string;
    Details: string;
    Metadata: Hash<string>;
}