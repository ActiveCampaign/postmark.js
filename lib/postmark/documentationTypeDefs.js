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