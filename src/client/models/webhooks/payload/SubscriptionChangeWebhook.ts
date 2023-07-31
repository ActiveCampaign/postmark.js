import {Hash} from "../../client/SupportingTypes";

export interface SubscriptionChangeWebhook {
    RecordType: string;
    MessageID: string;
    ServerID: number;
    MessageStream: string;
    ChangedAt: string;
    Recipient: string;
    Origin: string;
    SuppressSending: boolean;
    SuppressionReason: string;
    Tag?: string;
    Metadata: Hash<string>;
}