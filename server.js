const fs = require ("fs");
const path = require ("path");
const express = require ("express");
const app = express ();
const PORT = process.env.PORT || 3001;


app.use(express.static('public'));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());


// Routes

app.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "public/notes.html"));
});

app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "public/index.html"));
});


app.get("/api/notes", function (req, res) {
    fs.readFile("db/db.json", function (err, data) {
        if (err) throw err;
        returnedData = JSON.parse(data);
        return res.send(returnedData);
    });
});

app.post("/api/notes", function (req, res) {
    noteList.push(req.body);
    noteId.push(noteList.length);
    savedNotes = JSON.stringify(noteList);
    fs.writeFile("db/db.json", savedNotes, function (err) {
        if (err) throw err;
        res.end();
    });
});

app.delete("/api/notes/:id", function (req, res) {
    let chosen = req.params.id;
    for (let i = 0; i < noteId- 1; i ++) {
        if (chosen === noteId[i]) {
            noteList.pop(noteId[i])
            res.end();
        } else {
            console.log ("ID Not Found")
            res.end();
        }
    }
});

app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
});
