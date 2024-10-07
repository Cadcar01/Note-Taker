const notes = require('express').Router()
const { readAndAppend, readFromFile } = require('../helpers/fsUtils');
const ShortUniqueId = require('short-unique-id')
const { sequentialUUID } = new ShortUniqueId()

// GET route to retrieve all notes
notes.get('/', (req, res) =>
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)))
)

// POST route for adding new notes
notes.post('/', (req, res) => {
    console.log(req.body)
    const { noteTitle, noteText } = req.body

    const newNote = {
        noteTitle,
        noteText,
        noteID: sequentialUUID()
    }

    readAndAppend(newNote, './db/db.json')

    const response = {
        status: 'success',
        body: newNote,
    }

    res.json(response)
})

module.exports = notes