## Postmark.js

Send emails with the greatest of ease! Now your node.js application can send emails through [Postmark](http://www.postmarkapp.com).

[![Build Status](https://travis-ci.org/wildbit/postmark.js.svg?branch=master)](https://travis-ci.org/wildbit/postmark.js)

[Complete documentation can be found here](https://wildbit.github.io/postmark.js/), but the following information should get you started...

### Install

Installing `postmark` is super simple:

```bash
npm install postmark
```

### Sending an Email:

To send your first email, all you need to do is:

```javascript
var postmark = require("postmark");
var client = new postmark.Client("<server key>");

client.sendEmail({
    "From": "donotreply@example.com", 
    "To": "target@example.us", 
    "Subject": "Test", 
    "TextBody": "Test Message"
});
```

Replace <server key> with the server key provided by Postmark and you are good to go!

Your message must be provided in the format specified in the [Postmark API](http://developer.postmarkapp.com/developer-build.html#message-format) and will be verified. The **member names of 
message payloads are case-sensitive**, and messages not matching the documented format will not
be accepted by the API.

All client methods accept a callback as the their last parameter, following the normal node.js callback 
convention: 

```javascript
callback(error, result){...} 
```

To send attachments with the email, use the following format may be used:

```javascript
var postmark = require("postmark");
var client = new postmark.Client("<server key>");

client.sendEmail({
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
```

### Sending a Batch of Messages

The Postmark API provides functionality for sending batches of emails with a single command, rather than issuing separate API calls for each message. You may access this feature by calling `Client.sendEmailBatch(...)`, which behaves similarly to `postmark.sendEmail(...)` except that the first parameter is an array of messages formatted in the same manner as outlined above:

For example:

```javascript
var postmark = require("postmark");
var client = new postmark.Client("<server key>");

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

postmark.sendEmailBatch(messages, function (error, batchResults) {
    if (error) {
        console.error("Unable to send via postmark: " + error.message);
        return;
    }
    console.info("Messages sent to postmark");
});
```

The Postmark API will return an array of statuses, one for each message sent. You may iterate over the `batchResults` for information about each sent message. For further details, please see the [Postmark Batch API](http://developer.postmarkapp.com/developer-build.html#batching-messages).
