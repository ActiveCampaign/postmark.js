import {Hash} from "../../client/SupportingTypes";
import {OpenEvent} from "../../messages/OutboundMessageOpen";

export interface OpenWebhook extends OpenEvent {
    RecordType: "Open";
    FirstOpen: boolean;
    Metadata: Hash<string>;
}