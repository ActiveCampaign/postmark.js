import {Hash} from "../../client/SupportingTypes";
import {Bounce} from "../../bounces/Bounce";

export interface BounceWebhook extends Bounce {
    RecordType: "Bounce";
    Metadata: Hash<string>;
}