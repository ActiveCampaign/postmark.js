import { Attachment, Header, LinkTrackingOptions } from "../message/SupportingTypes";

export class UpdateTemplateRequest {
    constructor(Name?: string, Subject?: string, HtmlBody?: string, TextBody?: string, Alias?: string | null) {
        this.Name = Name;
        this.Subject = Subject;
        this.HtmlBody = HtmlBody;
        this.TextBody = TextBody;
        this.Alias = Alias;
    }

    Name?: string;
    Subject?: string;
    HtmlBody?: string;
    TextBody?: string;
    Alias?: string | null;
}

export class CreateTemplateRequest extends UpdateTemplateRequest {
    constructor(Name: string, Subject?: string, HtmlBody?: string, TextBody?: string, Alias?: string | null) {
        super(Name, Subject, HtmlBody, TextBody, Alias);
    }
}

export class TemplateValidationOptions {
    constructor(Subject?: string, HtmlBody?: string, TextBody?: string, TestRenderModel?: object) {
        this.Subject = Subject;
        this.HtmlBody = HtmlBody;
        this.TextBody = TextBody;
        this.TestRenderModel = TestRenderModel;
    }

    Subject?: string;
    HtmlBody?: string;
    TextBody?: string;
    TestRenderModel?: object;
}


export interface Template extends UpdateTemplateRequest {
    Name: string;
    TemplateId: number;
    AssociatedServerId?: number;
    Active: boolean;
}

export interface Templates {
    TotalCount: number;
    Templates: [
        {
            Active: boolean;
            TemplateId: number;
            Name: string;
            Alias?: string | null;
        }
    ]
}

export interface ValidationSection {
    ContentIsValid: boolean;
    ValidationErrors: object,
    RenderedContent: string;
}

export interface TemplateValidation {
    AllContentIsValid: boolean;
    HtmlBody: ValidationSection;
    TextBody: ValidationSection;
    Subject: ValidationSection;
    SuggestedTemplateModel: object;
}

export interface TemplateMessage {
    TemplateId?: number;
    TemplateAlias?: string;
    TemplateModel?: object;
    InlineCss?: boolean;
    From: string;
    To?: string;
    Cc?: string;
    Bcc?: string;
    ReplyTo?: string;
    Tag?: string;
    TrackOpens?: boolean;
    TrackLinks?: LinkTrackingOptions;
    Headers?: Header[];
    Attachments?: Attachment[];
}