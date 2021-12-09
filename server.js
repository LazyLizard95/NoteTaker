const fs = require('fs');
const path = require('path');
const express = require('express');
const PORT = process.env.PORT || 3001;
const app = express();
const notes = require('./db/db.json');
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
    notes.push(newNote);
    res.json(notes);
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