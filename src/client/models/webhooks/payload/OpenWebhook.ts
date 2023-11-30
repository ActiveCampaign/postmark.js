import {Hash} from "../../client/SupportingTypes";
import {OpenEvent} from "../../messages/OutboundMessageOpen";

export interface OpenWebhook extends OpenEvent {
    FirstOpen: boolean;
    Metadata: Hash<string>;
}