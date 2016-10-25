// The following docs support type definitions, without the need to actually create these types.

/**
 * Postmark Error
 *
 * @typedef PostmarkError
 * @property {number} status The HTTP status code returned from the API.
 * @property {string} message The error message returned from the API.
 * @property {number} code The API status code returned. Note, this is NOT the HTTP status code.
 */

/**
 * Standard Postmark Callback
 *
 * @callback PostmarkCallback
 * @param {PostmarkError} error An error message and status code if the request fails due to invalid data. `error` will be `null` if the API request was successful.
 * @param {object} response The parsed JSON object that is sent as the result of the requested operation.
 */


/**
 * Postmark Message
 *
 * @typedef PostmarkMessage
 * @property {string} To A comma-separate list of recipients.
 * @property {string} From The email address of the sender, must be a registered and confirmed Sender Signature.
 * @property {string} [Cc] A comma-separated list of 'Cc' recipients.
 * @property {string} [Bcc] A comma-separated list of 'Bcc' recipients.
 * @property {string} [ReplyTo] The email address that should be used in the reply. Defaults to the 'From' address.
 * @property {string} [Tag] Tag to apply to this message when it is sent.
 * @property {string} [Subject] The subject to be used in the message being sent.
 * @property {string} [HtmlBody] The HTML part of the email being sent. Optional when TextBody is specified.
 * @property {string} [TextBody] The text part of the email being sent. Optional when HTMLBody is specified.
 * @property {boolean} [TrackOpens] Should a tracking image be included on HTML emails to track statistics?
 * @property {string} [TrackLinks] Should a link tracking be enabled for this message? (Possible values: 'HtmlOnly', 'TextOnly', 'HtmlAndText', 'None', and null)
 * @property {PostmarkMessageHeader[]} Headers The headers to apply when sending this message.
 * @property {PostmarkAttachment[]} Attachments Any attachments that should be included when sending the email.
 */

/**
 * Postmark Template Message
 *
 * @typedef PostmarkTemplateMessage
 * @property {number} TemplateId The templateId to use when sending this message.
 * @property {string} To A comma-separate list of recipients.
 * @property {string} From The email address of the sender, must be a registered and confirmed Sender Signature.
 * @property {object} TemplateModel The model that will be applied to the Template when the email is sent.
 * @property {boolean} [InlineCss] Should CSS on the HTMLBody be inlined? (Defaults to true)
 * @property {string} [Cc] A comma-separated list of 'Cc' recipients.
 * @property {string} [Bcc] A comma-separated list of 'Bcc' recipients.
 * @property {string} [ReplyTo] The email address that should be used in the reply. Defaults to the 'From' address.
 * @property {string} [Tag] The tag to apply to this message when it is sent.
 * @property {boolean} [TrackOpens] Should a tracking image be included on HTML emails to track statistics?
 * @property {string} [TrackLinks] Should a link tracking be enabled for this message? (Possible values: 'HtmlOnly', 'TextOnly', 'HtmlAndText', 'None', and null)
 * @property {PostmarkMessageHeader[]} [Headers] The headers to apply when sending this message.
 * @property {PostmarkAttachment[]} [Attachments] Any attachments that should be included when sending the email.
 */


/**
 * Postmark Message Header
 *
 * @typedef PostmarkMessageHeader
 * @property {string} Name The name of the MIME Header.
 * @property {string} Value The content of the MIME Header.
 */