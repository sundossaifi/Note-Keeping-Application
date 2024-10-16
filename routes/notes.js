const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Note = require('../models/note');

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
        res.status(400).json({ message: error.message });
    }
});

router.patch('/:id', getNote, async (req, res) => {
    if (req.body.title != null) {
        res.note.title = req.body.title;
    }
    if (req.body.content != null) {
        res.note.content = req.body.content;
    }

    try {
        const updatedNote = await res.note.save();
        res.json(updatedNote);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.delete('/:id', getNote, async (req, res) => {
    try {
        await res.note.deleteOne();
        res.status(200).json({ message: "note is deleted" })
    } catch (error) {
        res.status(500).json({ "message": error.message });
    }
});

async function getNote(req, res, next) {
    let note;
    try {
        note = await Note.findById(req.params.id);
        if (note === null) {
            return res.status(404).json({ message: "can't find note" })
        }

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
    res.note = note;
    next();
}
module.exports = router;

