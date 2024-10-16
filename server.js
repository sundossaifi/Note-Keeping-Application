require('dotenv').config();

const express = require('express');
const app = express();
const mongoose = require('mongoose');

mongoose.connect(process.env.DATABASE_URL);
const db = mongoose.connection;
db.on('error', (erro) => console.error(error));
db.once('open', () => {console.log("connected to database")})

app.use(express.json());

const notesRouter = require('./routes/notes');
app.use('/notes', notesRouter);

app.listen(3000, () => {
    console.log("server started")
});