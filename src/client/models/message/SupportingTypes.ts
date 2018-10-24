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

export class Header {
    constructor(Name: string, Value: string) {
        this.Name = Name;
        this.Value = Value;
    }

    Name: string;
    Value: string;
}
export class Attachment {
    constructor(Name: string, Content: string, ContentType: string, ContentID: string | null = null) {
        this.Name = Name;
        this.Content = Content;
        this.ContentType = ContentType;
        this.ContentID = ContentID;
    }

    Name: string;
    ContentID: string | null;
    Content: string;
    ContentType: string;
}