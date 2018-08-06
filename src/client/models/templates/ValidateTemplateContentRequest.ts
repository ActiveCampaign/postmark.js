export interface ValidateTemplateContentRequest {
    Subject?: string
    HtmlBody?: string
    TextBody?: string
    TestRenderModel?: object
}

export interface TemplateValidationError{
    Message: string,
    Line : (number|null),
    CharacterPosition : (number|null)
}

export interface TemplateValidationResult {
    ContentIsValid: boolean
    ValidationErrors: TemplateValidationError[],
    RenderedContent: string
}

export interface ValidateTemplateContentResponse {
    AllContentIsValid: boolean
    HtmlBody?: TemplateValidationResult
    TextBody?: TemplateValidationResult
    Subject?: TemplateValidationResult
    SuggestedTemplateModel: object
}