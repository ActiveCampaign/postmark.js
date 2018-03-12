export enum HttpMethod {
    GET = 'GET',
    POST = 'POST',
    DELETE = 'DELETE',
    PUT = 'PUT',
    OPTIONS = 'OPTIONS',
    HEAD = 'HEAD'
}

export enum LinkTrackingOptions {
    TextOnly,
    HtmlOnly,
    HtmlAndText,
    None
}

export interface Header {
    Name: string,
    Value: string
}
export interface Attachment {
    Name: string,
    ContentID?: string,
    Content: string,
    ContentType: string
}