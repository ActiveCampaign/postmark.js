export enum LinkTrackingOptions {
    TextOnly = "TextOnly",
    HtmlOnly = "HtmlOnly",
    HtmlAndText = "HtmlAndText",
    None = "None",
}

export enum LinkClickLocation {
    HTML = "HTML",
    Text = "Text",
}

export enum ServerDeliveryTypes {
  Live = "Live",
  Sandbox = "Sandbox",
}

export class Header {
    public Name: string;
    public Value: string;
    constructor(Name: string, Value: string) {
        this.Name = Name;
        this.Value = Value;
    }
}

/**
 * Attachment content
 *
 * @param Name - name of the attachment, for example book.pdf
 * @param Content - Base64 encoded content, for example: fs.readFileSync('/Folder/book.pdf').toString('base64')
 * @param ContentID - id of the attachment, in case we are referencing it, for example: cid:123book.pdf
 * @param ContentType - content type (json, image, etc)
 * @param ContentLength - length of the message
 */
export class Attachment {
    public Name: string;
    public ContentID: string | null;
    public Content: string;
    public ContentType: string;
    public ContentLength?: number;
    public Disposition?: string | null;
    constructor(Name: string, Content: string, ContentType: string, ContentID: string | null = null, ContentLength? :number, Disposition?: string) {
        this.Name = Name;
        this.Content = Content;
        this.ContentType = ContentType;
        this.ContentID = ContentID;
        this.ContentLength = ContentLength;
        this.Disposition = Disposition;
    }
}
