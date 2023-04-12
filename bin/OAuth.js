var express = require("express");
var OAuth = require('oauth').OAuth;


function doOAuth1(config, callback) {
    var consumer = new OAuth(config.endpoint + config.request_token_path  + "?scope=all",
        config.endpoint + config.auth_token_path,
        config.consumer_key, config.consumer_secret, '1.0',
        "http://localhost:3000/authback", 'PLAINTEXT');

    var eapp = express();
    require("util").inherits(eapp, require('events').EventEmitter);

    eapp.get("/authback", function(req, res, next) {
        res.status(200).send("OK - you can close this tab");
        setTimeout(function() {
            eapp.emit('authorized', req.query.oauth_verifier, req.query.oauth_token)
        }, 500)

    })

    var server = eapp.listen(3000);

    // Maintain a hash of all connected sockets
var sockets = {}, nextSocketId = 0;
server.on('connection', function (socket) {
  // Add a newly connected socket
  var socketId = nextSocketId++;
  sockets[socketId] = socket;
  console.log('socket', socketId, 'opened');

  // Remove the socket when it closes
  socket.on('close', function () {
    console.log('socket', socketId, 'closed');
    delete sockets[socketId];
  });

  // Extend socket lifetime for demo purposes
  socket.setTimeout(4000);
});

 //close the server and destroy all the open sockets
function killserver() {
    
  // Close the server
  server.close(function () { console.log('Server closed!'); });
  // Destroy all open sockets
  for (var socketId in sockets) {
    console.log('socket', socketId, 'destroyed');
    sockets[socketId].destroy();
  }
};

    // Get the request token                    
    consumer.getOAuthRequestToken(function(err, orauth_token, orauth_token_secret, results) {

        if (err)
            return callback(err);

        require('open')(config.endpoint + config.authorization_path + "?oauth_token=" + orauth_token);

        eapp.on('authorized', function(verifier, oauth_token) {


            

            consumer.getOAuthAccessToken(orauth_token, orauth_token_secret, verifier, function(err, oauth_token, oauth_token_secret, results) {
                //server.close();
                killserver();
                if (err)
                    return callback(err);
                console.log("Request Token", orauth_token);
                console.log("Request Token Secret", orauth_token_secret);
                console.log("Auth Token", oauth_token);
                console.log("Auth Token Secret", oauth_token_secret);
                console.log("Verifier", verifier);
                var token = {
                    token: oauth_token,
                    token_secret: oauth_token_secret,
                    verifier: verifier
                };
                process.nextTick(function() {
                    callback(null, token);
                })

            });
        })
    });
}
exports.auth = doOAuth1;