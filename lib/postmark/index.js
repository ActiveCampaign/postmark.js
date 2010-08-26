var request;
try {
  request = require("request"); // use NPM installed if available.
} catch(e) {  // resort to vendored.
  request = require("./vendor/request");
}
var sys = require("sys")

module.exports = (function (api_key, options) {
  if (typeof api_key == undefined)  {
    throw("You must provide your postmark API key");
  }
  if (typeof options === 'undefined')  { options = {}; }
  if (options.ssl && options.ssl !== true) { options.ssl = false; }
  
  
  
  return {
    send: function(message, callback) {
      
      var valid_parameters = ["From", "To", "Cc", "Bcc", "Subject", "Tag", "HtmlBody", "TextBody", "ReplyTo", "Headers", "Attachments"]
      var valid_attachment_parameters = ["Name", "Content", "ContentType"];
      var attr, attach;
      for (attr in message) {
        if (valid_parameters.indexOf(attr) < 0)  {
          throw("You can only provide attributes that work with the Postmark JSON message format. Details: http://developer.postmarkapp.com/developer-build.html#message-format");
        }
        if (attr == "Attachments") {
          for(attach in message[attr])  {
            var attach_attr;
            for (attach_attr in message[attr][attach])  {
              if (valid_attachment_parameters.indexOf(attach_attr) < 0)  {
                throw("You can only provide attributes for attachments that work with the Postmark JSON message format. Details: http://developer.postmarkapp.com/developer-build.html#attachments");
              }
            }
          }
        }
      }
      
      var postmark_uri = "http://api.postmarkapp.com/email"
      if (options.ssl)  {
        postmark_uri = "https://api.postmarkapp.com/email";
      } 
      
      postmark_headers = {
        "Accept":  "application/json",
        "Content-Type":  "application/json",
        "X-Postmark-Server-Token":  api_key
      }
      request({uri: postmark_uri, method: "POST", body: JSON.stringify(message), headers: postmark_headers}, function (error, response, body) {
        if (response.statusCode == 401) {
          throw("Incorrect Postmark API Key header")
        } else if (response.statusCode == 422)  {
          throw("Incorrect or Malformed JSON message: "+JSON.parse(body["Message"]))
        } else if (response.statusCode == 200) {
          return true;
        } else  {
          throw("Something wrong with Postmark");
        }
      });
    }
  }
});