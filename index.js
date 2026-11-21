// Importing express module
const express = require("express");
const server = express();
server.use(express.static(__dirname));

const admin = require("firebase-admin");
const { getDatabase } = require('firebase-admin/database');
admin.initializeApp({
    databaseURL: "https://misja-aed-default-rtdb.europe-west1.firebasedatabase.app"
});

// As an admin, the app has access to read and write all data, regardless of Security Rules
const db = getDatabase();
const ref = db.ref("0");
ref.once("value", (snapshot) => {
    console.log(snapshot.val());
});

console.log(admin.getApp().name);  // '[DEFAULT]'

// Handling GET / request
server.get("/", (req, res, next) => {
    res.sendFile("index.html", {root: __dirname});
})

// Handling GET /locations request
server.get("/locations/:location", (req, res) => {
    let range = 1000;
    db.ref().once("value", (locations) => {
        res.json(locations.val());
    });
})

// Server setup
server.listen(3000, () => {
    console.log("Server is Running");
})
