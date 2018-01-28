#!/usr/bin/env node
"use strict";

var express = require("express");

//get routes
var users = require('./routes/default/users');
var groups = require('./routes/default/groups');
var create = require('./routes/default/create');
var editUser = require('./routes/default/edituser');
var editGroups = require('./routes/default/editgroups');

//for test
var usersJson = require('./routes/testJson/usersjson');
var groupsJson = require('./routes/testJson/groupsjson');

// Create the app objekt
var app = express();

const path = require("path");

var port = 1337;

// if ('MY_PORT' in process.env) {
//     port = process.env.MY_PORT;
//     console.log("port set to: port=" + port);
// } else {
//     port = 1337;
//     console.log("No MY_PORT found setting it to defeault port=1337");
// }

// enable views from pug
app.set('view engine', 'pug');

// //Fixes better layout for html code
if (app.get('env') === 'development') {
    app.locals.pretty = true;
}


// Serve static files
var staticFiles = path.join(__dirname, "public");

app.use(express.static(staticFiles));


// Add routes
app.use('/', users);
app.use('/groups', groups);
app.use('/create', create);
app.use('/users/edit/:id', editUser);
app.use('/groups/edit/:id', editGroups);


//for test
app.use('/users', usersJson);
app.use('/groupsJson', groupsJson);

//Also for test
var testgroups = require('./testdata/groups.json');
var testusers = require('./testdata/users.json');
app.get("/groupsJson/:id", (req, res) => {
    res.send(testgroups[req.params.id - 1]);
});
app.get("/users/:id", (req, res) => {
    res.send(testusers[req.params.id - 1]);
});


app.use((req, res, next) => {
    var err = new Error("Not Found");

    err.status = 404;
    next(err);
});

// Note the error handler takes four arguments
app.use((err, req, res, next) => {
    if (res.headersSent) {
        return next(err);
    }
    err.status = err.status || 500;
    res.status(err.status);
    res.render("error", {
        error: err
    });
});

// Start up server
console.log("Listening to port: " + port);
app.listen(port);
