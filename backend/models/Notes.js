// models/Notes.js
const mongoose = require('mongoose');

// Define the schema for Notes
const NoteSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('Notes', NoteSchema);
