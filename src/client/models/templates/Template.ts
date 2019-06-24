import { Attachment, Header, LinkTrackingOptions } from "../message/SupportingTypes";
import {Hash} from "../client/SupportingTypes";
import {FilteringParameters} from "../client/FilteringParameters";

export class UpdateTemplateRequest {
    constructor(Name?: string, Subject?: string, HtmlBody?: string, TextBody?: string,
                Alias?: string | null, TemplateType?: TemplateType, LayoutTemplate?: string) {
        this.Name = Name;
        this.Subject = Subject;
        this.HtmlBody = HtmlBody;
        this.TextBody = TextBody;
        this.Alias = Alias;
        this.LayoutTemplate = LayoutTemplate;
        this.TemplateType = TemplateType;
    }

    TemplateType?: TemplateType;
    Name?: string;
    Subject?: string;
    HtmlBody?: string;
    TextBody?: string;
    Alias?: string | null;
    LayoutTemplate?: string;
}

export class CreateTemplateRequest extends UpdateTemplateRequest {
    constructor(Name: string, Subject?: string, HtmlBody?: string, TextBody?: string, Alias?: string | null,
                TemplateType?: TemplateType, LayoutTemplate?: string) {
        super(Name, Subject, HtmlBody, TextBody, Alias, TemplateType, LayoutTemplate);
    }
}

export class TemplateValidationOptions {
    constructor(Subject?: string, HtmlBody?: string, TextBody?: string, TestRenderModel?: object,
                TemplateType?: TemplateType, LayoutTemplate?: string,
                InlineCssForHtmlTestRender?: boolean) {
        this.Subject = Subject;
        this.HtmlBody = HtmlBody;
        this.TextBody = TextBody;
        this.TestRenderModel = TestRenderModel;
        this.TemplateType = TemplateType;
        this.LayoutTemplate = LayoutTemplate;
        this.InlineCssForHtmlTestRender = InlineCssForHtmlTestRender;
    }

    Subject?: string;
    HtmlBody?: string;
    TextBody?: string;
    TestRenderModel?: object;
    TemplateType?: TemplateType;
    LayoutTemplate?: string;
    InlineCssForHtmlTestRender?: boolean;
}

export enum TemplateType { Standard = 'Standard', Layout = 'Layout' };

export interface Template extends UpdateTemplateRequest {
    Name: string;
    TemplateId: number;
    Active: boolean;
    AssociatedServerId?: number;
}

export interface Templates {
    TotalCount: number;
    Templates: [
        {
            TemplateType: TemplateType;
            Active: boolean;
            TemplateId: number;
            Name: string;
            Alias?: string | null;
            LayoutTemplate: string | null;
        }
    ]
}

export class TemplatesPushRequest {
    SourceServerID: number;
    DestinationServerID: number;
    PerformChanges: boolean;

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

export class TemplatedMessage {
    constructor(from: string, templateIdOrAlias: (number | string),
        templateModel: object, to?: string, cc?: string, bcc?: string,
        replyTo?: string, tag?: string, trackOpens?: boolean,
        trackLinks?: LinkTrackingOptions, headers?: Header[], attachments?: Attachment[]) {
        this.From = from;
        this.TemplateModel = templateModel;
        if (typeof templateIdOrAlias === 'number') {
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
    Metadata?: Hash<string>;
    Attachments?: Attachment[];
}

/**
 * Describes filtering parameters that can be used when retrieving templates.
 * When pagination parameters are not specified, default values provided by [[DefaultPaginationFilterValues]] are set.
 */
export class TemplateFilteringParameters extends FilteringParameters {
    constructor(count: number = 100, offset: number = 0,
                templateType?: TemplateType, layoutTemplate?: string) {
        super(count, offset);
        this.templateType = templateType;
        this.layoutTemplate = layoutTemplate;
    }
    templateType?: TemplateType;
    layoutTemplate?: string;
}