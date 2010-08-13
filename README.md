# Postmark.js -- Simple Email Sending

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

Enjoy sending.

## Install

<pre>
  npm install postmark
</pre>

### Special Thanks
  * [Postmark](http://www.postmarkapp.com) 
  * [Request Library from @mikeal](http://github.com/mikeal/node-utils/tree/master/request/)

## License 

(The MIT License)

Copyright (c) 2010 Chris Williams

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.