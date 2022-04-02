const express = require("express");
const notesModel = require("./model");
const app = express();

//*********************************************** */

//the module is imported and algorithm used is aes 256
const crypto = require("crypto");
const algorithm = "aes-256-cbc";

const initVector = crypto.randomBytes(16);

// the data we want to encrypt

const note = "This is the first note I am making";

//Secret key generate 32 bytes of random data
const Securitykey = crypto.randomBytes(32);

//cipher function
const cipher = crypto.createCipheriv(algorithm, Securitykey, initVector);

app.post("/addnote", async (req, res) => {
  console.log(req.body.content);
  let note = req.body.content;
  let encryptedData = cipher.update(note, "utf-8", "hex");

  encryptedData += cipher.final("hex");

  console.log(encryptedData);

  const Note = new notesModel({ content: encryptedData });

  try {
    await Note.save();
    res.send(Note);
    // console.log(Securitykey);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.get("/notes", async (request, response) => {
  const notes = await notesModel.find({});
  const enc = notes[0].content;
  console.log(enc);

  try {
    response.send(notes);
    // console.log(Securitykey);
  } catch (error) {
    response.status(500).send(error);
  }
});

module.exports = app;
