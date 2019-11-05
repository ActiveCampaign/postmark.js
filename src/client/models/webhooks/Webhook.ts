import {Header} from "../message/SupportingTypes";

interface WebhookRequestTriggers {
    Open?: OpenWebhookTrigger;
    Click?: WebhookTrigger;
    Delivery?: WebhookTrigger;
    Bounce?: BounceWebhookTrigger;
    SpamComplaint?: SpamWebhookTrigger;
}

export class UpdateWebhookRequest {
    Url?: string;
    HttpAuth?: HttpAuth;
    HttpHeaders?: Header[];
    Triggers?: WebhookRequestTriggers;

    public constructor(Url?: string, Triggers?: WebhookRequestTriggers, HttpAuth?: HttpAuth, HttpHeaders?: Header[]) {
        this.Url = Url;
        this.HttpAuth = HttpAuth;
        this.HttpHeaders = HttpHeaders;
        this.Triggers = Triggers;
    }
}

export class CreateWebhookRequest extends UpdateWebhookRequest{
    public constructor(Url?: string, Triggers?: WebhookRequestTriggers, HttpAuth?: HttpAuth, HttpHeaders?: Header[]) {
        super(Url, Triggers, HttpAuth, HttpHeaders);
    }
}

export interface WebhookTrigger {
  Enabled: boolean;
}

export interface OpenWebhookTrigger extends WebhookTrigger {
    PostFirstOpenOnly?: boolean;
}

export interface BounceWebhookTrigger extends WebhookTrigger {
    IncludeContent?: boolean;
}

export interface SpamWebhookTrigger extends BounceWebhookTrigger {}

export interface HttpAuth {
    Username: string,
    Password: string;
}

export interface Webhook {
  ID: number;
  Url: string;
  HttpAuth?: HttpAuth;
  HttpHeaders?: Header[];
  MessageStream: string;
  Triggers: {
    Open: OpenWebhookTrigger;
    Click: WebhookTrigger;
    Delivery: WebhookTrigger;
    Bounce: BounceWebhookTrigger;
    SpamComplaint: SpamWebhookTrigger;
  }
}