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

Replace YOURAPIKEY with the API key provided by Postmark and you are good to go! Your message must be provided in the format specified in the (Postmark API)[http://developer.postmarkapp.com/developer-build.html#message-format] and will be verified. If you provide the object in a manner not as specified (including case sensitivity), an exception will be thrown. If there is an issue with the submission it will be thrown as an exception as well with information necessary for you to understand what went wrong.

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
    });
</pre>


Enjoy sending.

## Install

<pre>
  npm install postmark
</pre>

### Special Thanks
  * [Postmark](http://www.postmarkapp.com) 

