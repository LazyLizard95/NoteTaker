const fs = require('fs');
const path = require('path');
const express = require('express');
const PORT = process.env.PORT || 3001;
const app = express();
//parse incoming string or array data
app.use(express.urlencoded({ extended: true }));
// parse incoming JSON data
app.use(express.json());
//Middleware that staticly gives browser all of public
app.use(express.static("public"))
app.get('/', (req, res) =>{
    res.sendFile(path.join(__dirname, "./public/index.html"))
})

app.get('/notes', (req, res) =>{
    res.sendFile(path.join(__dirname, "./public/notes.html"))
})


app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!\n`);
});