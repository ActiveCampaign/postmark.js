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
 * Postmark Template Message
 *
 * @typedef PostmarkTemplateMessage
 * @property {number} TemplateId The templateId to use when sending this message.
 * @property {string} To A comma-separate list of recipients.
 * @property {string} Cc A comma-separated list of 'Cc' recipients.
 * @property {string} Bcc A comma-separated list of 'Bcc' recipients.
 * @property {string} From The email address of the sender, must be a registered and confirmed Sender Signature.
 * @property {object} TemplateModel The model that will be applied to the Template when the email is sent.
 * @property {object} Tag The tag to apply to this message when it is sent.
 * @property {PostmarkHeader[]} Headers The headers to apply when sending this message.
 * @property {bool} InlineCss Should CSS on the HTMLBody be inlined? (Defaults to true)
 * @property {PostmarkAttachment[]} Attachments Any attachments that should be included when sending the email.
 */