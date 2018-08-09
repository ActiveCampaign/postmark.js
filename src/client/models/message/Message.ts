import BaseMessage from "./BaseMessage";

interface Hash<T> {
    [key: string]: T;
}

export default interface Message extends BaseMessage {
    Metadata?: Hash<string>;
}
