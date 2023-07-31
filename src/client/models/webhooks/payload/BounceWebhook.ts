import {Hash} from "../../client/SupportingTypes";
import {Bounce} from "../../bounces/Bounce";

export interface BounceWebhook extends Bounce {
    Metadata: Hash<string>;
}