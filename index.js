// Importing express module
const express = require("express");
var bodyParser = require('body-parser');

const server = express();
// var jsonParser = bodyParser.json();

server.use(express.static(__dirname));

const admin = require("firebase-admin");
const { getDatabase } = require('firebase-admin/database');
admin.initializeApp({
    databaseURL: "https://misja-aed-default-rtdb.europe-west1.firebasedatabase.app"
});

// As an admin, the app has access to read and write all data, regardless of Security Rules
const db = getDatabase();
const ref = db.ref();

console.log(admin.getApp().name);  // '[DEFAULT]'

// Handling GET / request
server.get("/", (req, res, next) => {
    res.sendFile("index.html", {root: __dirname});
})

// Handling GET /locations request
// server.get("/locations/:location", (req, res) => {
//     let range = 1000;
//     db.ref().once("value", (locations) => {
//         res.json(locations.val());
//     });
// })
server.use(bodyParser.json();
server.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));
server.post("/upload" (req, res) => {
    console.log(req.body);
    var newEntry = req.body;
    //TODO check for type here
    //TODO convert to json if not already
    for (var e in newEntry) {
        ref.push(newEntry[e]);
    }
    res.send();
})

// Server setup
server.listen(3000, () => {
    console.log("Server is Running");
})
