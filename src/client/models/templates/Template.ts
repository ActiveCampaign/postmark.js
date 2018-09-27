import {Attachment, Header, LinkTrackingOptions} from "../message/SupportingTypes";

export interface TemplateOptions {
    Name?: string;
    Subject?: string;
    HtmlBody?: string;
    TextBody?: string;
    Alias?: string | null;
}

export interface Template extends TemplateOptions {
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

export interface TemplateValidationOptions {
    Subject?: string;
    HtmlBody?: string;
    TextBody?: string;
    TestRenderModel?: object;
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