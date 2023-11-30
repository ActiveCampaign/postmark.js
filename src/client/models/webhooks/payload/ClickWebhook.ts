import {ClickEvent} from "../../messages/OutboundMessageClick";
import {Hash} from "../../client/SupportingTypes";

export interface ClickWebhook extends ClickEvent {
    Metadata: Hash<string>;
}