const express = require("express");
const cors = require("cors");

const fs = require("fs").promises;
const path = require("path");

const app = express();

app.use(cors());
app.use(express.json());

const FILE_PATH = path.join(__dirname, "notes.json");
let notes = [
{ id: 1, text: "Prima notassssss" },
{ id: 2, text: "Seconda nota e bastaaaaaasecondo" },
{ id: 3, text: "terza" }
];

async function readNotes() {
    try {
        const data = await fs.readFile(FILE_PATH, "utf8");
        return JSON.parse(data);
    } catch (error) {
        if (error.code === "ENOENT") {
            return []; // Ritorna un array vuoto se il file non esiste ancora
        }
        throw error;
    }
}

async function writeNotes(notes) {
    await fs.writeFile(FILE_PATH, JSON.stringify(notes, null, 2), "utf8");
}


// GET -> ottiene tutte le note
app.get("/notes", (req, res) => {
res.json(notes);
});


// POST -> aggiunge una nota
app.post("/notes", (req, res) => {
const newNote = {
id: notes.length + 1,
text: req.body.text
};

notes.push(newNote);

res.json(newNote);
});


// DELETE -> elimina una nota
app.delete("/notes/:id", (req, res) => {

const id = parseInt(req.params.id);

notes = notes.filter(note => note.id !== id);

res.json({
message: "Nota eliminata"
});
});


app.listen(3000, () => {
console.log("Server avviato su http://localhost:3000");
});
