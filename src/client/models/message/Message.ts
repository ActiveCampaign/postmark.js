import BaseMessage from "./BaseMessage";
import {Hash} from "../client/ClientOptions"

export default interface Message extends BaseMessage {
    Metadata?: Hash<string>;
}
