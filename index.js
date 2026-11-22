const express = require("express");
const { initializeApp, applicationDefault } = require("firebase-admin/app");
const { getDatabase, ServerValue } = require("firebase-admin/database");

initializeApp({
    credential: applicationDefault(),
    databaseURL: "https://misja-aed-default-rtdb.europe-west1.firebasedatabase.app"
});

const db = getDatabase();
const aedRef = db.ref("aed");

const server = express();
server.use(express.static(__dirname));
server.use(express.json({ limit: "5mb" }));

server.get("/", (req, res) => {
    res.sendFile("index.html", { root: __dirname });
});

<<<<<<< HEAD
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({
    extended: true
}));
server.post("/upload", (req, res) => {
    console.log(req.body);
    var newEntry = req.body;
    //TODO check completness
    for (var e in newEntry) {
        ref.push(newEntry[e]);
=======
const str = (v) => String(v ?? "").trim();
const num = (v) => Number(String(v ?? "").replace(",", "."));
const keyOf = (id) => id.replace(/[.$#\[\]\/]/g, "_");

function cleanPoint(p) {
    const id = str(p.id);
    const lat = num(p.lat);
    const lon = num(p.lon);
    if (!id || !Number.isFinite(lat) || !Number.isFinite(lon)) return null;
    if (lat < -90 || lat > 90 || lon < -180 || lon > 180) return null;
    return {
        id, lat, lon,
        hours: str(p.hours),
        position: str(p.position),
        location: str(p.location),
        description: str(p.description)
    };
}

server.post("/upload", async (req, res) => {
    console.log("UPLOAD:", JSON.stringify(req.body).slice(0, 300));
    const { publisher, points } = req.body || {};
    if (!Array.isArray(points) || points.length === 0) {
        return res.status(400).json({ error: "Brak punktów do wysłania." });
    }
    if (points.length > 5000) {
        return res.status(400).json({ error: "Za dużo punktów naraz (max 5000)." });
>>>>>>> b6f3d2d8b5d0c8018c27828ec87b49a7ad52e9e2
    }

    const updates = {};
    const bad = [];
    points.forEach((p, i) => {
        const c = cleanPoint(p || {});
        if (!c) { bad.push(i + 1); return; }
        updates[keyOf(c.id)] = { ...c, publisher: str(publisher), updatedAt: ServerValue.TIMESTAMP };
    });
    if (bad.length) {
        return res.status(400).json({ error: "Nieprawidłowe dane w wierszach: " + bad.join(", ") });
    }

    try {
        await aedRef.update(updates);
        res.json({ ok: true, count: Object.keys(updates).length });
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: "Błąd zapisu do bazy." });
    }
});

server.get("/points", async (req, res) => {
    try {
        const snap = await aedRef.once("value");
        res.json(Object.values(snap.val() || {}));
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: "Błąd odczytu z bazy." });
    }
});

server.listen(3000, () => console.log("Server is Running"));
