export enum LinkTrackingOptions {
    TextOnly = 'TextOnly',
    HtmlOnly = 'HtmlOnly',
    HtmlAndText = 'HtmlAndText',
    None = 'None'
}

export enum LinkClickLocation {
    HTML = 'HTML',
    Text = 'Text'
}

export interface Header {
    Name: string;
    Value: string;
}
export interface Attachment {
    Name: string;
    ContentID?: string;
    Content: string;
    ContentType: string;
}