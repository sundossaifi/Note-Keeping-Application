const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Note = require('../models/note');


module.exports = router;

router.get('/', async (req, res) => {
    try {
        const notes = await Note.find()
        res.status(200).json(notes);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
});

router.post('/', async (req, res) => {
    const note = new Note({
        title: req.body.title,
        content: req.body.content
    });

    try {
        const newNote = await note.save();
        res.status(200).json(newNote);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
});

router.patch('/:id', (req, res) => {

});

router.delete('/:id', (req, res) => {

});

