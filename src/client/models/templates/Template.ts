import {FilteringParameters} from "../client/FilteringParameters";
import {Hash} from "../client/SupportingTypes";
import { Attachment, Header, LinkTrackingOptions } from "../message/SupportingTypes";

export class UpdateTemplateRequest {
    public TemplateType?: TemplateTypes;
    public Name?: string;
    public Subject?: string;
    public HtmlBody?: string;
    public TextBody?: string;
    public Alias?: string | null;
    public LayoutTemplate?: string;
    constructor(Name?: string, Subject?: string, HtmlBody?: string, TextBody?: string,
                Alias?: string | null, TemplateType?: TemplateTypes, LayoutTemplate?: string) {
        this.Name = Name;
        this.Subject = Subject;
        this.HtmlBody = HtmlBody;
        this.TextBody = TextBody;
        this.Alias = Alias;
        this.LayoutTemplate = LayoutTemplate;
        this.TemplateType = TemplateType;
    }
}

export class CreateTemplateRequest extends UpdateTemplateRequest {
    constructor(Name: string, Subject?: string, HtmlBody?: string, TextBody?: string, Alias?: string | null,
                TemplateType?: TemplateTypes, LayoutTemplate?: string) {
        super(Name, Subject, HtmlBody, TextBody, Alias, TemplateType, LayoutTemplate);
    }
}

export class TemplateValidationOptions {
    public Subject?: string;
    public HtmlBody?: string;
    public TextBody?: string;
    public TestRenderModel?: object;
    public TemplateType?: TemplateTypes;
    public LayoutTemplate?: string;
    public InlineCssForHtmlTestRender?: boolean;
    constructor(Subject?: string, HtmlBody?: string, TextBody?: string, TestRenderModel?: object,
                TemplateType?: TemplateTypes, LayoutTemplate?: string,
                InlineCssForHtmlTestRender?: boolean) {
        this.Subject = Subject;
        this.HtmlBody = HtmlBody;
        this.TextBody = TextBody;
        this.TestRenderModel = TestRenderModel;
        this.TemplateType = TemplateType;
        this.LayoutTemplate = LayoutTemplate;
        this.InlineCssForHtmlTestRender = InlineCssForHtmlTestRender;
    }
}

export enum TemplateTypes { Standard = "Standard", Layout = "Layout" }

export interface Template {
    TemplateType: TemplateTypes;
    Name: string;
    TemplateId: number;
    Alias: string | null;
    Subject: string;
    HtmlBody: string | null;
    TextBody: string | null;
    Active: boolean;
    AssociatedServerId: number;
    LayoutTemplate: string | null;
}

export interface TemplateInList {
    TemplateType: TemplateTypes;
    Active: boolean;
    TemplateId: number;
    Name: string;
    Alias: string | null;
    LayoutTemplate: string | null;
}

export interface Templates {
    TotalCount: number;
    Templates: TemplateInList[];
}

export class TemplatesPushRequest {
    public SourceServerID: number;
    public DestinationServerID: number;
    public PerformChanges: boolean;

    constructor(SourceServerID: number, DestinationServerID: number, PerformChanges: boolean) {
        this.SourceServerID = SourceServerID;
        this.DestinationServerID = DestinationServerID;
        this.PerformChanges = PerformChanges;
    }
}

export interface TemplatePushAction {
    Action: string;
    TemplateId?: number;
    Alias: string;
    Name: string;
}

export interface TemplatesPush {
    TotalCount: number;
    Templates: TemplatePushAction[];
}

export interface ValidationSection {
    ContentIsValid: boolean;
    ValidationErrors: object;
    RenderedContent: string;
}

export interface TemplateValidation {
    AllContentIsValid: boolean;
    HtmlBody: ValidationSection;
    TextBody: ValidationSection;
    Subject: ValidationSection;
    SuggestedTemplateModel: object;
}

export class TemplatedMessage {
    public TemplateId?: number;
    public TemplateAlias?: string;
    public TemplateModel: object;
    public InlineCss?: boolean;
    public From: string;
    public To?: string;
    public Cc?: string;
    public Bcc?: string;
    public ReplyTo?: string;
    public MessageStream?: string;
    public Tag?: string;
    public TrackOpens?: boolean;
    public TrackLinks?: LinkTrackingOptions;
    public Headers?: Header[];
    public Metadata?: Hash<string>;
    public Attachments?: Attachment[];
    constructor(from: string, templateIdOrAlias: (number | string),
                templateModel: object, to?: string, cc?: string, bcc?: string,
                replyTo?: string, tag?: string, trackOpens?: boolean,
                trackLinks?: LinkTrackingOptions, headers?: Header[], attachments?: Attachment[]) {
        this.From = from;
        this.TemplateModel = templateModel;
        if (typeof templateIdOrAlias === "number") {
            this.TemplateId = templateIdOrAlias;
        } else {
            this.TemplateAlias = templateIdOrAlias;
        }
        this.To = to;
        this.Cc = cc;
        this.Bcc = bcc;
        this.ReplyTo = replyTo;
        this.Tag = tag;
        this.TrackOpens = trackOpens;
        this.TrackLinks = trackLinks;
        this.Headers = headers;
        this.Attachments = attachments;
    }
}

/**
 * Describes filtering parameters that can be used when retrieving templates.
 * When pagination parameters are not specified, default values are set.
 */
export class TemplateFilteringParameters extends FilteringParameters {
    public templateType?: TemplateTypes;
    public layoutTemplate?: string;
    constructor(count: number = 100, offset: number = 0,
                templateType?: TemplateTypes, layoutTemplate?: string) {
        super(count, offset);
        this.templateType = templateType;
        this.layoutTemplate = layoutTemplate;
    }
}
