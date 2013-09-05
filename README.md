# Postmark.js -- Simple Email Sending


Note: This was recently updated to run directly on node.js 0.4.0 so there are no other dependencies. If you were using this before, it should upgrade perfectly fine without any change. 

Send emails with the greatest of ease! Now your node.js application can send emails through [Postmark](http://www.postmarkapp.com) using their HTTP API. To send any email, including attachments, all you need to do is this:

<pre>
    var postmark = require("postmark")("YOURAPIKEY");
    postmark.send({
        "From": "donotreply@example.com", 
        "To": "target@example.us", 
        "Subject": "Test", 
        "TextBody": "Test Message"
    });
</pre>

Replace YOURAPIKEY with the API key provided by Postmark and you are good to go! 
Your message must be provided in the format specified in the [Postmark API](http://developer.postmarkapp.com/developer-build.html#message-format) and will be verified. 
If you provide the object in a manner not as specified (including case sensitivity), an exception will be thrown. 
Send takes a callback as the second parameter that indicates success or failure, following the normal node.js callback 
pattern callback(error, result), if there is an issue with the submission an error object will be returned as the first
argument. 

To send attachments with the email, use the following format:

<pre>
    var postmark = require("postmark")("YOURAPIKEY");
    postmark.send({
        "From": "donotreply@example.com", 
        "To": "target@example.us", 
        "Subject": "Test", 
        "TextBody": "Test Message",
        "Attachments": [{
          "Content": File.readFileSync("./unicorns.jpg").toString('base64'),
          "Name": "PrettyUnicorn.jpg",
          "ContentType": "image/jpeg"
        }]
    }, function(error, success) {
        if(error) {
            console.error("Unable to send via postmark: " + error.message);
            return;
        }
        console.info("Sent to postmark for delivery")
    });
</pre>

## Sending Batch Messages

The Postmark API provides functionality for sending batches of emails with a single command, rather than issuing separate API calls for each message. You can access this feature by using `postmark.batch()`, which behaves similarly to `postmark.send()` except that the first parameter is an array of messages formatted as above.

For example:

    var postmark = require("postmark")("YOURAPIKEY");

    var messages = [
        {
            "From": "email@example.com",
            "To": "recipient@example.com",
            "Subject": "Message #1",
            "TextBody": "This is email number 1."
        },
        {
            "From": "email@example.com",
            "To": "recipient@example.com",
            "Subject": "Message #2",
            "TextBody": "This is email number 2."
        }
    ];

    postmark.batch(messages, function (error, success) {
        if (error) {
            console.error("Unable to send via postmark: " + error.message);
            return;
        }
        console.info("Messages sent to postmark");
    });

The Postmark API will return an array of statuses, one for each message sent. You can access the data about individual messages in either `error` or `success`. For further details, please see the [Postmark Batch API](http://developer.postmarkapp.com/developer-build.html#batching-messages).

Enjoy sending.

## Install

<pre>
  npm install postmark
</pre>

### Special Thanks
  * [Postmark](http://www.postmarkapp.com) 

