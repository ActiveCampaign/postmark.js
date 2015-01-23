var defaults = require('./clientDefaults.js');
var client = require('https');

function Client(api_key, options) {
  if (!api_key) {
    throw ("You must provide your postmark API key");
  }

  this.api_key = api_key;

  //TODO: merge with the "global" options.
  this.options = options || {};

  this.options.ssl = true;
  //TODO: this should handle the "ssl" option gracefully.
  //this.options.BASE_URL = this.options.BASE_URL || defaults.BASE_URL;
}

Client.prototype.processRequestWithoutBody = function(path, type, query, callback) {
  //this should translate the query to a query string and append it to the 
  //path, then forward it to the processRequestWithBody function.
  callback("Requests without a body are not supported, yet.");
}

Client.prototype.processRequestWithBody = function(path, type, content, callback) {
  var msg = JSON.stringify(content);

  var headers = {
    "Accept": "application/json",
    "Content-Type": "application/json",
    "X-Postmark-Server-Token": this.api_key,
    "Content-Length": Buffer.byteLength(msg)
  };

  var req = client.request({
    host: "api.postmarkapp.com",
    path: path,
    method: type,
    headers: headers,
    port: (this.options.ssl ? 443 : 80)
  }, function(response) {

    var body = "";

    response.on("data", function(i) {
      body += i;
    });

    response.on("end", function() {
      if (response.statusCode == 200) {
        if (callback) {
          try {
            var ret = JSON.parse(body);
            callback(null, ret);
          } catch (e) {
            callback(e);
          }
        }
      } else {
        if (callback) {
          var data;
          try {
            data = JSON.parse(body);
            callback(null, {
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

  req.write(msg);
  req.end();
};


Client.prototype.send = function(message, callback) {
  this.processRequestWithBody('/email', 'POST', message, callback);
};

Client.prototype.batch = function(messages, callback) {
  this.processRequestWithBody('/email/batch', 'POST', messages, callback);
};

module.exports = Client;