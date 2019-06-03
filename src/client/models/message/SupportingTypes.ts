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


/**
 * Attachment content
 *
 * @param Name - name of the attachment, for example book.pdf
 * @param Content - Base64 encoded content, for example: fs.readFileSync('/Folder/book.pdf').toString('base64')
 * @param ContentID - id of the attachment, in case we are referencing it, for example: cid:123book.pdf
 */
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