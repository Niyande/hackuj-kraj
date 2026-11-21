// Importing express module
const express = require("express");
const app = express();
const admin = require("firebase-admin");
// const { initializeApp } = require('firebase-admin/app');
const { getDatabase } = require('firebase-admin/database');
// const { cert } = require('firebase-admin/credential')
admin.initializeApp({
    databaseURL: "https://misja-aed-default-rtdb.europe-west1.firebasedatabase.app"
});




// As an admin, the app has access to read and write all data, regardless of Security Rules
const db = getDatabase();
const ref = db.ref("restricted_access/secret_document");
ref.once("value", (snapshot) => {
    console.log(snapshot.val());
});

console.log(admin.getApp().name);  // '[DEFAULT]'

// Handling GET / request
app.get("/", (req, res, next) => {
    res.sendFile("index.html", {root: __dirname});
})


// Server setup
app.listen(3000, () => {
    console.log("Server is Running");
})
