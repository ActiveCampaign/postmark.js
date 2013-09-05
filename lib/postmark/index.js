var http = require("http");

var check_message_format = function(message) {
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
};

module.exports = (function (api_key, options) {
  if (typeof api_key == undefined)  {
    throw("You must provide your postmark API key");
  }
  if (typeof options === 'undefined')  { options = {}; }
  if (options.ssl && options.ssl !== true) { options.ssl = false; }
  
  var postmark_headers = {
    "Accept":  "application/json",
    "Content-Type":  "application/json",
    "X-Postmark-Server-Token": api_key
  };
  
  return {
    send: function(message, callback) {
      
      // throw exception if message is improperly formatted
      check_message_format(message);
      
      var req = http.request({
        host: "api.postmarkapp.com",
        path: "/email",
        method: "POST",
        headers: postmark_headers,
        port: (options.ssl ? 443 : 80)
      }, function (response) {
        var body = "";
        response.on("data", function (i) { body += i; })
        response.on("end", function () {
          if (response.statusCode == 200) {
            if (callback) {
              var ret = message["To"];
              try {
                ret = JSON.parse(body);
              } catch (e) {
                ret = message["To"];
              }
              callback(null, ret);
            }
          } else {
            if (callback) {
              try {
                var data = JSON.parse(body);
                callback({
                  status: response.statusCode,
                  message: data['Message'],
                  code: data['ErrorCode']
                });
              } catch (e) {
                callback({
                  status: 404,
                  message: "Unsupported Request Method and Protocol",
                  code: -1 // this is a fake error code !
                });
              }
            }
          }
        });
      });
      
      req.on('error', function(err) {
        if (callback) {
          callback(err);
        }
      });
      
      req.write(JSON.stringify(message));
      req.end();
    },

    batch: function(messages, callback) {

      // check that all messages are properly formatted
      messages.forEach(function (message) {
        check_message_format(message);
      });

      var req = http.request({
        host: "api.postmarkapp.com",
        path: "/email/batch",
        method: "POST",
        headers: postmark_headers,
        port: (options.ssl ? 443 : 80)
      }, function (response) {
        var body = "";
        response.on("data", function (i) { body += i; });
        response.on("end", function () {
          if (response.statusCode == 200) {
            if (callback) {
              callback(null, body);
            }
          } else {
            if (callback) {
              var data = JSON.parse(body);
              callback(data);
            }
          }
        });
      });

      req.on('error', function(err) {
        if (callback) {
          callback(err);
        }
      });

      req.write(JSON.stringify(messages));
      req.end();
    }
  }
});
