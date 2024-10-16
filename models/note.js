const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Title is required'],
        trim: true
    },
    content: {
        type: String,
        required: [true, 'Content is required'],
        trim: true
    },
    creationDate: {
        type: Date,
        required: [true, 'Date is required'],
        default: Date.now
    }
});

module.exports = mongoose.model('Note', noteSchema);