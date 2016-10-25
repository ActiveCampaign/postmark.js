(function() {
    var defaults = require('./clientDefaults.js');
    var merge = require('merge');
    var querystring = require('querystring');

    /**
     * The constructor for the `Client` object.
     * This is the main entry point to the standard Postmark API.
     *
     * ```javascript
     * var client = new Client('<server key>');
     *
     * // You can now use any of the methods associated with the client.
     * ```
     *
     * @class Client
     * @param {string} serverKey The **server key** is required, and specifies which Server you wish to use when making API calls from this Client.
     * @param {ClientOptions} [options] The configuration options for this client. If not specified, the global defaults will be used.
     * @return Client
     */
    function Client(serverKey, options) {
        if (!serverKey) {
            throw ("You must provide your postmark API key");
        }
        this.options = merge({}, defaults, options);
        this.options.apiKey = serverKey;
        this.options.authorizationHeader = "X-Postmark-Server-Token";
        this.processRequestWithBody = this.options.requestFactory(this.options);
    }

    Client.prototype = {};

    /**
     * Coalesces arguments to allow for easy method overloads.
     * @private
     * @method coalesceCallback
     * @return PostmarkCallback
     */
    function coalesceCallback(arg1, arg2) {
        var callback = arg2;
        if (!callback && typeof(arg1) === 'function') {
            callback = arg1;
        }
        return callback;
    }


    /**
     * @private
     */
    Client.prototype.processRequestWithoutBody = function(path, type, query, callback) {
        if (query) {
            path += '?' + querystring.stringify(query);
        }
        this.processRequestWithBody(path, type, null, callback);
    }

    /**
     * Send a single email message.
     *
     * @deprecated Consider using {@link Client#sendEmail} instead of this method.
     * @memberof Client.prototype
     * @method send
     * @param {PostmarkMessage} message The message you wish to send.
     * @param {PostmarkCallback} callback A standard callback that is called when the API request completes.
     */
    Client.prototype.send = function(message, callback) {
        this.processRequestWithBody('/email', 'POST', message, callback);
    };


    /**
     * Send a message using a template.
     *
     * @memberof Client.prototype
     * @method sendEmailWithTemplate
     * @param {PostmarkTemplateMessage} message The message you wish to send.
     * @param {PostmarkCallback} callback A standard callback that is called when the API request completes.
     */
    Client.prototype.sendEmailWithTemplate = function(message, callback) {
        this.processRequestWithBody('/email/withTemplate', 'POST', message, callback);
    };

    /**
     * Send a batch of email messages.
     *
     * @deprecated Consider using {@link Client#sendEmailBatch} instead of this method.
     * @memberof Client.prototype
     * @method batch
     * @param {PostmarkMessage[]} messages An array of `PostmarkMessage` you wish to send using this Client.
     * @param {PostmarkCallback} callback A standard callback that is called when the API request completes.
     */
    Client.prototype.batch = function(messages, callback) {
        this.processRequestWithBody('/email/batch', 'POST', messages, callback);
    };

    /**
     * Send a single email message.
     *
     * @memberof Client.prototype
     * @method sendEmail
     * @param {PostmarkMessage} message The message you wish to send.
     * @param {PostmarkCallback} callback A standard callback that is called when the API request completes.
     */
    Client.prototype.sendEmail = function(message, callback) {
        this.processRequestWithBody('/email', 'POST', message, callback);
    };

    /**
     * Send a batch of email messages.
     *
     * @memberof Client.prototype
     * @method sendEmailBatch
     * @param {PostmarkMessage[]} messages An array of `PostmarkMessage` you wish to send using this Client.
     * @param {PostmarkCallback} callback A standard callback that is called when the API request completes.
     */
    Client.prototype.sendEmailBatch = function(messages, callback) {
        this.processRequestWithBody('/email/batch', 'POST', messages, callback);
    };

    /**
     * Retrieve delivery statistic information for the associated Server.
     *
     * @memberof Client.prototype
     * @method getDeliveryStatistics
     * @param {PostmarkCallback} callback A standard callback that is called when the API request completes.
     */
    Client.prototype.getDeliveryStatistics = function(callback) {
        this.processRequestWithoutBody('/deliverystats', 'GET', null, callback);
    };

    /**
     * Retrieve a batch of bounces. The default batch size is 100, and the offset is 0.
     *
     * @memberof Client.prototype
     * @method getBounces
     * @param {object} [filter] An optional filter for which bounces to retrieve.
     * @param {PostmarkCallback} callback A standard callback that is called when the API request completes.
     */
    Client.prototype.getBounces = function(filter, callback) {
        callback = coalesceCallback(filter, callback);
        filter = merge({
            count: 100,
            offset: 0
        }, filter);

        this.processRequestWithoutBody('/bounces', 'GET', filter, callback);
    };

    /**
     * Get a information for a specific Bounce.
     *
     * @memberof Client.prototype
     * @method getBounce
     * @param {number} id The ID of the Bounce you wish to retrieve.
     * @param {PostmarkCallback} callback A standard callback that is called when the API request completes.
     */
    Client.prototype.getBounce = function(id, callback) {
        this.processRequestWithoutBody('/bounces/' + id, 'GET', null, callback);
    };

    /**
     * Get a Bounce Dump for a specific Bounce.
     * @memberof Client.prototype
     * @method getBounceDump
     * @param {number} id The ID of the Bounce for which you wish to retrieve a dump.
     * @param {PostmarkCallback} callback A standard callback that is called when the API request completes.
     */
    Client.prototype.getBounceDump = function(id, callback) {
        this.processRequestWithoutBody('/bounces/' + id + '/dump', 'GET', null, callback);
    };

    /**
     * Cause an email address that was deactivated due to a Bounce to be reactivated.
     *
     * @memberof Client.prototype
     * @method activateBounce
     * @param {number} id The ID of the Bounce for which you wish to activate the associated email.
     * @param {PostmarkCallback} callback A standard callback that is called when the API request completes.
     */
    Client.prototype.activateBounce = function(id, callback) {
        this.processRequestWithBody('/bounces/' + id + '/activate', 'PUT', null, callback);
    };

    /**
     * Get an array of tags associated with bounces.
     *
     * @memberof Client.prototype
     * @method getBounceTags
     * @param {PostmarkCallback} callback A standard callback that is called when the API request completes.
     */
    Client.prototype.getBounceTags = function(callback) {
        this.processRequestWithoutBody('/bounces/tags', 'GET', null, callback);
    };

    /**
     * Get the information for the Server associated with this Client.
     *
     * @memberof Client.prototype
     * @method getServer
     * @param {PostmarkCallback} callback A standard callback that is called when the API request completes.
     */
    Client.prototype.getServer = function(callback) {
        this.processRequestWithoutBody('/server', 'GET', null, callback);
    };

    /**
     * Modify the Server associated with this Client.
     *
     * @memberof Client.prototype
     * @method editServer
     * @param {object} options The options you wish to modify for this server.
     * @param {PostmarkCallback} callback A standard callback that is called when the API request completes.
     */
    Client.prototype.editServer = function(options, callback) {
        this.processRequestWithBody('/server', 'PUT', options, callback);
    };

    /**
     * Retrieve a batch of Outbound Messages. The default batch size is 100, and the offset is 0.
     * You can make successive calls to the API to retrieve additional Outbound Messages.
     *
     * @memberof Client.prototype
     * @method getOutboundMessages
     * @param {object} [filter] Optional filtering parameters.
     * @param {PostmarkCallback} callback A standard callback that is called when the API request completes.
     */
    Client.prototype.getOutboundMessages = function(filter, callback) {
        callback = coalesceCallback(filter, callback);
        filter = merge({
            count: 100,
            offset: 0
        }, filter);
        this.processRequestWithoutBody('/messages/outbound', 'GET', filter, callback);
    };

    /**
     * Get details for a specific Outbound Message.
     *
     * @memberof Client.prototype
     * @method getOutboundMessageDetails
     * @param {number} id The ID of the Outbound Message for which you wish to retrieve details.
     * @param {PostmarkCallback} callback A standard callback that is called when the API request completes.
     */
    Client.prototype.getOutboundMessageDetails = function(id, callback) {
        this.processRequestWithoutBody('/messages/outbound/' + id + '/details', 'GET', null, callback);
    };

    /**
     * Get the Opens for Outbound Messages. The default batch size is 100, and offset is 0.
     * You can make successive calls to the API to retrieve additional Opens information.
     *
     * @memberof Client.prototype
     * @method getMessageOpens
     * @param {object} [filter] Optional filtering parameters.
     * @param {PostmarkCallback} callback A standard callback that is called when the API request completes.
     */
    Client.prototype.getMessageOpens = function(filter, callback) {
        callback = coalesceCallback(filter, callback);
        filter = merge({
            count: 100,
            offset: 0
        }, filter);
        this.processRequestWithoutBody('/messages/outbound/opens', 'GET', filter, callback);
    };

    /**
     * Get Open information for a single Outbound Message. The default batch size is 100, and offset is 0.
     *
     * @memberof Client.prototype
     * @method getMessageOpensForSingleMessage
     * @param {number} id The ID of the Message for which you wish to retrieve Opens.
     * @param {object} [filter] Optional filtering parameters.
     * @param {PostmarkCallback} callback A standard callback that is called when the API request completes.
     */
    Client.prototype.getMessageOpensForSingleMessage = function(id, filter, callback) {
        callback = coalesceCallback(filter, callback);
        filter = merge({
            count: 100,
            offset: 0
        }, filter);
        this.processRequestWithoutBody('/messages/outbound/opens/' + id, 'GET', filter, callback);
    };

    /**
     * Retrieve a batch of Inbound Messages. The default batch size is 100, and the offset is 0.
     * You can make successive calls to the API to retrieve additional Inbound Messages.
     * @memberof Client.prototype
     * @method getInboundMessages
     * @param {object} [filter] Optional filtering parameters.
     * @param {PostmarkCallback} callback A standard callback that is called when the API request completes.
     */
    Client.prototype.getInboundMessages = function(filter, callback) {
        callback = coalesceCallback(filter, callback);
        filter = merge({
            count: 100,
            offset: 0
        }, filter);
        this.processRequestWithoutBody('/messages/inbound', 'GET', filter, callback);
    };

    /**
     * Get details for a specific Inbound Message.
     *
     * @memberof Client.prototype
     * @method getInboundMessageDetails
     * @param {number} id The ID of the Inbound Message for which you wish to retrieve details.
     * @param {PostmarkCallback} callback A standard callback that is called when the API request completes.
     */
    Client.prototype.getInboundMessageDetails = function(id, callback) {
        this.processRequestWithoutBody('/messages/inbound/' + id + '/details', 'GET', null, callback);
    };

    /**
     * Cause an Inbound Message to bypass filtering rules defined on this Client's associated Server.
     *
     * @memberof Client.prototype
     * @method bypassBlockedInboundMessage
     * @param {number} id The ID of the Inbound Message for which you wish to bypass the filtering rules.
     * @param {PostmarkCallback} callback A standard callback that is called when the API request completes.
     */
    Client.prototype.bypassBlockedInboundMessage = function(id, callback) {
        this.processRequestWithBody('/messages/inbound/' + id + '/bypass', 'PUT', null, callback);
    };

    /**
     * Request that Postmark retry POSTing to the Inbound Hook for the specified message.
     *
     * @memberof Client.prototype
     * @method retryInboundHookForMessage
     * @param {number} id The ID of the Inbound Message for which you wish to retry the inbound hook.
     * @param {PostmarkCallback} callback A standard callback that is called when the API request completes.
     */
    Client.prototype.retryInboundHookForMessage = function(id, callback) {
        this.processRequestWithBody('/messages/inbound/' + id + '/retry', 'PUT', null, callback);
    };


    /**
     * Get overview statistics on Outbound Messages sent from the Server associated with this Client.
     *
     * @memberof Client.prototype
     * @method getOuboundOverview
     * @param {object} [filter] Optional filtering parameters.
     * @param {PostmarkCallback} callback A standard callback that is called when the API request completes.
     */
    Client.prototype.getOuboundOverview = function(filter, callback) {
        callback = coalesceCallback(filter, callback);
        this.processRequestWithoutBody('/stats/outbound', 'GET', filter, callback);
    };

    /**
     * Get statistics on email sent from the Server associated with this Client.
     *
     * @memberof Client.prototype
     * @method getSentCounts
     * @param {object} [filter] Optional filtering parameters.
     * @param {PostmarkCallback} callback A standard callback that is called when the API request completes.
     */
    Client.prototype.getSentCounts = function(filter, callback) {
        callback = coalesceCallback(filter, callback);
        this.processRequestWithoutBody('/stats/outbound/sends', 'GET', filter, callback);
    };

    /**
     * Get statistiscs on emails that bounced after being sent from the Server associated with this Client.
     *
     * @memberof Client.prototype
     * @method getBounceCounts
     * @param {object} [filter] Optional filtering parameters.
     * @param {PostmarkCallback} callback A standard callback that is called when the API request completes.
     */
    Client.prototype.getBounceCounts = function(filter, callback) {
        callback = coalesceCallback(filter, callback);
        this.processRequestWithoutBody('/stats/outbound/bounces', 'GET', filter, callback);
    };

    /**
     * Get SPAM complaint statistics for email sent from the Server associated with this Client.
     *
     * @memberof Client.prototype
     * @method getSpamComplaints
     * @param {object} [filter] Optional filtering parameters.
     * @param {PostmarkCallback} callback A standard callback that is called when the API request completes.
     */
    Client.prototype.getSpamComplaints = function(filter, callback) {
        callback = coalesceCallback(filter, callback);
        this.processRequestWithoutBody('/stats/outbound/spam', 'GET', filter, callback);
    };

    /**
     * Get email tracking statistics for messages sent from the Server associated with this Client.
     *
     * @memberof Client.prototype
     * @method getTrackedEmailCounts
     * @param {object} [filter] Optional filtering parameters.
     * @param {PostmarkCallback} callback A standard callback that is called when the API request completes.
     */
    Client.prototype.getTrackedEmailCounts = function(filter, callback) {
        callback = coalesceCallback(filter, callback);
        this.processRequestWithoutBody('/stats/outbound/tracked', 'GET', filter, callback);
    };

    /**
     * Get Open statistics for messages sent from the Server associated with this Client.
     *
     * @memberof Client.prototype
     * @method getEmailOpenCounts
     * @param {object} [filter] Optional filtering parameters.
     * @param {PostmarkCallback} callback A standard callback that is called when the API request completes.
     */
    Client.prototype.getEmailOpenCounts = function(filter, callback) {
        callback = coalesceCallback(filter, callback);
        this.processRequestWithoutBody('/stats/outbound/opens', 'GET', filter, callback);
    };

    /**
     * Get Email Client Platform statistics  for messages sent from the Server associated with this Client.
     *
     * @memberof Client.prototype
     * @method getEmailPlatformUsage
     * @param {object} [filter] Optional filtering parameters.
     * @param {PostmarkCallback} callback A standard callback that is called when the API request completes.
     */
    Client.prototype.getEmailPlatformUsage = function(filter, callback) {
        callback = coalesceCallback(filter, callback);
        this.processRequestWithoutBody('/stats/outbound/opens/platforms', 'GET', filter, callback);
    };

    /**
     * Get statistics on which Email Clients were used to open messages sent from the Server associated with this Client.
     *
     * @memberof Client.prototype
     * @method getEmailClientUsage
     * @param {object} [filter] Optional filtering parameters.
     * @param {PostmarkCallback} callback A standard callback that is called when the API request completes.
     */
    Client.prototype.getEmailClientUsage = function(filter, callback) {
        callback = coalesceCallback(filter, callback);
        this.processRequestWithoutBody('/stats/outbound/opens/emailclients', 'GET', filter, callback);
    };

    /**
     * Get Read Time statistics for messages sent from the Server associated with this Client.
     *
     * @memberof Client.prototype
     * @method getEmailReadTimes
     * @param {object} [filter] Optional filtering parameters.
     * @param {PostmarkCallback} callback A standard callback that is called when the API request completes.
     */
    Client.prototype.getEmailReadTimes = function(filter, callback) {
        callback = coalesceCallback(filter, callback);
        this.processRequestWithoutBody('/stats/outbound/opens/readtimes', 'GET', filter, callback);
    };

    /**
     * Get total clicks statistics for tracked links for messages sent from the Server associated with this Client.
     *
     * @memberof Client.prototype
     * @method getClickCounts
     * @param {object} [filter] Optional filtering parameters.
     * @param {PostmarkCallback} callback A standard callback that is called when the API request completes.
     */
    Client.prototype.getClickCounts = function(filter, callback) {
        callback = coalesceCallback(filter, callback);
        this.processRequestWithoutBody('/stats/outbound/clicks', 'GET', filter, callback);
    };

    /**
     * Get browser family statistics for tracked links for messages sent from the Server associated with this Client.
     *
     * @memberof Client.prototype
     * @method getBrowserUsage
     * @param {object} [filter] Optional filtering parameters.
     * @param {PostmarkCallback} callback A standard callback that is called when the API request completes.
     */
    Client.prototype.getBrowserUsage = function(filter, callback) {
        callback = coalesceCallback(filter, callback);
        this.processRequestWithoutBody('/stats/outbound/clicks/browserfamilies', 'GET', filter, callback);
    };

    /**
     * Get browser platform statistics for tracked links for messages sent from the Server associated with this Client.
     *
     * @memberof Client.prototype
     * @method getBrowserPlatforms
     * @param {object} [filter] Optional filtering parameters.
     * @param {PostmarkCallback} callback A standard callback that is called when the API request completes.
     */
    Client.prototype.getBrowserPlatforms = function(filter, callback) {
        callback = coalesceCallback(filter, callback);
        this.processRequestWithoutBody('/stats/outbound/clicks/platforms', 'GET', filter, callback);
    };

      /**
     * Get click location statistics for tracked links for messages sent from the Server associated with this Client.
     * (Shows whether a tracked link was clicked from "HTML" or "Text" body of the email)
     *
     * @memberof Client.prototype
     * @method getClickLocation
     * @param {object} [filter] Optional filtering parameters.
     * @param {PostmarkCallback} callback A standard callback that is called when the API request completes.
     */
    Client.prototype.getClickLocation = function(filter, callback) {
        callback = coalesceCallback(filter, callback);
        this.processRequestWithoutBody('/stats/outbound/clicks/location', 'GET', filter, callback);
    };

    /**
     * Create a new Tag Trigger.
     *
     * @memberof Client.prototype
     * @method createTagTrigger
     * @param {object} options Configuration options to be used in creating the trigger.
     * @param {PostmarkCallback} callback A standard callback that is called when the API request completes.
     */
    Client.prototype.createTagTrigger = function(options, callback) {
        this.processRequestWithBody('/triggers/tags', 'POST', options, callback);
    };

    /**
     * Modify an existing Tag Trigger.
     *
     * @memberof Client.prototype
     * @method editTagTrigger
     * @param {number} id The ID of the Tag Trigger you wish to modify.
     * @param {object} options The updated configuration options for this Tag Trigger.
     * @param {PostmarkCallback} callback A standard callback that is called when the API request completes.
     */
    Client.prototype.editTagTrigger = function(id, options, callback) {
        this.processRequestWithBody('/triggers/tags/' + id, 'PUT', options, callback);
    };

    /**
     * Delete an existing Tag Trigger.
     *
     * @memberof Client.prototype
     * @method deleteTagTrigger
     * @param {number} id The ID of the Tag Trigger you wish to delete.
     * @param {PostmarkCallback} callback A standard callback that is called when the API request completes.
     */
    Client.prototype.deleteTagTrigger = function(id, callback) {
        this.processRequestWithoutBody('/triggers/tags/' + id, 'DELETE', null, callback);
    };

    /**
     * Get a specific Tag Trigger.
     *
     * @memberof Client.prototype
     * @method getTagTrigger
     * @param {number} id The ID of the Tag Trigger you wish to retrieve.
     * @param {PostmarkCallback} callback A standard callback that is called when the API request completes.
     */
    Client.prototype.getTagTrigger = function(id, callback) {
        this.processRequestWithoutBody('/triggers/tags/' + id, 'GET', null, callback);
    };

    /**
     * Get a list of Tag Trigger. The default batch count is 100, and the offset is 0.
     * You may retrieve additional Tag Triggers by making successive calls to the API.
     *
     * @memberof Client.prototype
     * @method getTagTriggers
     * @param {object} [filter] Optional filtering parameters.
     * @param {PostmarkCallback} callback A standard callback that is called when the API request completes.
     */
    Client.prototype.getTagTriggers = function(filter, callback) {
        callback = coalesceCallback(filter, callback);
        filter = merge({
            count: 100,
            offset: 0
        }, filter);
        this.processRequestWithoutBody('/triggers/tags/', 'GET', filter, callback);
    };

    /**
     * Create an Inbound Rule Trigger.
     *
     * @memberof Client.prototype
     * @method createInboundRuleTrigger
     * @param {object} options The configuration options to used when creating this Trigger.
     * @param {PostmarkCallback} callback A standard callback that is called when the API request completes.
     */
    Client.prototype.createInboundRuleTrigger = function(options, callback) {
        this.processRequestWithBody('/triggers/inboundrules', 'POST', options, callback);
    };

    /**
     * Delete an Inbound Rule Trigger.
     *
     * @memberof Client.prototype
     * @method deleteInboundRuleTrigger
     * @param {number} id The ID of the Inbound Rule Trigger you wish to delete.
     * @param {PostmarkCallback} callback A standard callback that is called when the API request completes.
     */
    Client.prototype.deleteInboundRuleTrigger = function(id, callback) {
        this.processRequestWithoutBody('/triggers/inboundrules/' + id, 'DELETE', null, callback);
    };

    /**
     * Get a list of Inbound Rule Triggers. The default batch count is 100, and the offset is 0.
     * You may retrieve additional Inbound Rule Tag Triggers by making successive calls to the API.
     *
     * @memberof Client.prototype
     * @method getInboundRuleTriggers
     * @param {object} [filter] Optional filtering parameters.
     * @param {PostmarkCallback} callback A standard callback that is called when the API request completes.
     */
    Client.prototype.getInboundRuleTriggers = function(filter, callback) {
        callback = coalesceCallback(filter, callback);
        filter = merge({
            count: 100,
            offset: 0
        }, filter);
        this.processRequestWithoutBody('/triggers/inboundrules', 'GET', filter, callback);
    };

    /**
     * Get the list of templates assoicated with this server.
     *
     * @memberof Client.prototype
     * @method getTemplates
     * @param {object} [options] Optional paging/filtering options.
     * @param {PostmarkCallback} callback A standard callback that is called when the API request completes.
     */
    Client.prototype.getTemplates = function(options, callback) {
        callback = coalesceCallback(options, callback);
        options = merge({
            count: 100,
            offset: 0
        }, options);
        this.processRequestWithoutBody('/templates', 'GET', options, callback);
    };


    /**
     * Get the a specific template assoicated with this server.
     *
     * @memberof Client.prototype
     * @method getTemplate
     * @param {int} [id] The templateid for the template you wish to retrieve.
     * @param {PostmarkCallback} callback A standard callback that is called when the API request completes.
     */
    Client.prototype.getTemplate = function(id, callback) {
        this.processRequestWithoutBody('/templates/' + id, 'GET', null, callback);
    };

    /**
     * Delete a template associated with this server.
     *
     * @memberof Client.prototype
     * @method deleteTemplate
     * @param {int} [id] The templateid you wish to delete.
     * @param {PostmarkCallback} callback A standard callback that is called when the API request completes.
     */
    Client.prototype.deleteTemplate = function(id, callback) {
        this.processRequestWithoutBody('/templates/' + id, 'DELETE', null, callback);
    }

    /**
     * Create a new template on the associated server.
     *
     * @memberof Client.prototype
     * @method createTemplate
     * @param {object} [template] The template you wish to create.
     * @param {PostmarkCallback} callback A standard callback that is called when the API request completes.
     */
    Client.prototype.createTemplate = function(template, callback) {
        this.processRequestWithBody('/templates/', 'POST', template, callback);
    }

    /**
     * Update a template on the associated server.
     *
     * @memberof Client.prototype
     * @method editTemplate
     * @param {number} id The id of the template you wish to update.
     * @param {object} template The values on the template you wish to update.
     * @param {PostmarkCallback} callback A standard callback that is called when the API request completes.
     */
    Client.prototype.editTemplate = function(id, template, callback) {
        this.processRequestWithBody('/templates/' + id, 'PUT', template, callback);
    }

    /**
     * Validate template markup to verify that it will be parsed. Also provides a recommended template
     * model to be used when sending using the specified template content.
     *
     * @memberof Client.prototype
     * @method validateTemplate
     * @param {object} [templateContent] The template you wish to update.
     * @param {PostmarkCallback} callback A standard callback that is called when the API request completes.
     */
    Client.prototype.validateTemplate = function(templateContent, callback) {
        this.processRequestWithBody('/templates/validate', 'POST', templateContent, callback);
    }

    module.exports = Client;
})();
