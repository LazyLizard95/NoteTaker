const fs = require('fs');
const path = require('path');
const express = require('express');
const PORT = process.env.PORT || 3001;
const app = express();
const notes = require('./db/db.json');
const { v4: uuidv4 } = require('uuid');
//parse incoming string or array data
app.use(express.urlencoded({ extended: true }));
// parse incoming JSON data
app.use(express.json());
//Middleware that staticly gives browser all of public
app.use(express.static("public"))

app.get('/api/notes', (req, res) => {
    res.json(notes);
})

app.post('/api/notes', (req, res) => {
    const newNote = req.body;
    newNote.id = uuidv4();
    notes.push(newNote);
    fs.writeFile(path.join(__dirname, './db/db.json'), JSON.stringify(notes), (err) =>{
        if (err) throw err;
        res.json(notes);
    });
    
})

app.delete('/api/notes/:id', (req, res) => {
    const noteId = req.params.id
    res.json(notes.find(noteId));
    
    
    
    
})

app.get('/', (req, res) =>{
    res.sendFile(path.join(__dirname, "./public/index.html"))
})

app.get('/notes', (req, res) =>{
    res.sendFile(path.join(__dirname, "./public/notes.html"))
})


app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!\n`);
});