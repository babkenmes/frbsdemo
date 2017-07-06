var mongoose = require('mongoose');
var config = require('./config');
var User = require('./../models/User');
var Client = require('./../models/Client');
mongoose.Promise = global.Promise;
mongoose.connect(config.get('mongoose:uri'));
var db = mongoose.connection;
User.findOne({ username: "admin" }, function (err, adminUser) {
    if (err) {
        console.log('error connecting to users collection: ', err.message);
    }
    if (!adminUser) {
        adminUser = new User({
            username: "admin",
            firstName: "John",
            lastName:"Angry",
			apiKey: "admin",
			authDomain: "admin",
			databaseURL: "admin",
			storageBucket: "admin",
			messagingSenderId: "admin",
            password: "pass@world1",
            role: "admin"
        });
        adminUser.save(function (err, user) {
            if (err) return console.log(err);
            else console.log("New user - %s:%s", user.username, user.password);
        });
    }
});
Client.findOne({ clientId: config.get("ClientId") }, function (err, angularClient) {
    if (err) {
        console.log('error connecting to clients collection: ', err.message);
    }
    if (!angularClient) {
        var angularClient = new Client({
            name: "node-auth Web client app", clientId: config.get("ClientId"), clientSecret: config.get("ClientSecret") });
        angularClient.save(function (err, client) {
            if (err) return console.log(err);
            else console.log("New client - %s:%s", client.clientId, client.clientSecret);
        });
    }
});
db.on('error', function (err) {
    console.log('connection error: ', err.message);
});
db.once('open', function callback() {
    console.log("Connected to DB!");
});
module.exports = db;