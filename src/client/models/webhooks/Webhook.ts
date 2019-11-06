import {Header} from "../message/SupportingTypes";

interface WebhookRequestTriggers {
    Open?: OpenWebhookTrigger;
    Click?: WebhookTrigger;
    Delivery?: WebhookTrigger;
    Bounce?: BounceWebhookTrigger;
    SpamComplaint?: SpamWebhookTrigger;
}

export class UpdateWebhookRequest {
    public Url?: string;
    public HttpAuth?: HttpAuth;
    public HttpHeaders?: Header[];
    public Triggers?: WebhookRequestTriggers;

    public constructor(url?: string, triggers?: WebhookRequestTriggers, httpAuth?: HttpAuth, httpHeaders?: Header[]) {
        this.Url = url;
        this.HttpAuth = httpAuth;
        this.HttpHeaders = httpHeaders;
        this.Triggers = triggers;
    }
}

export class CreateWebhookRequest extends UpdateWebhookRequest {
    public constructor(url?: string, triggers?: WebhookRequestTriggers, httpAuth?: HttpAuth, httpHeaders?: Header[]) {
        super(url, triggers, httpAuth, httpHeaders);
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

export interface SpamWebhookTrigger extends WebhookTrigger {
    IncludeContent?: boolean;
}

export interface HttpAuth {
    Username: string;
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
  };
}
