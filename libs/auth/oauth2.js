var oauth2orize = require('oauth2orize');
var passport = require('passport');
var crypto = require('crypto');

var libs = process.cwd() + '/libs/';

var config = require('./../config');
var log = require(libs + 'log')(module);

var db = require(libs + 'dbconn');
var User = require('./../../models/User');
var AccessToken = require('./../../models/AccessToken');
var RefreshToken = require('./../../models/RefreshToken');

// create OAuth 2.0 server
var aserver = oauth2orize.createServer();

// Generic error handler
var errFn = function (cb, err) {
    if (err) {
        return cb(err);
    }
};


// token endpoint
//
// `token` middleware handles client requests to exchange authorization grants
// for access tokens.  Based on the grant type being exchanged, the above
// exchange middleware will be invoked to handle the request.  Clients must
// authenticate when making requests to this endpoint.

exports.token = [
    passport.authenticate(['jwt'], { session: false })
];