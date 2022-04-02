const mongoose = require("mongoose");

const NoteSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    require: true,
  },
});

const Note = mongoose.model("Note", NoteSchema);

module.exports = Note;
