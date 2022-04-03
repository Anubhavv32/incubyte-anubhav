const mongoose = require('mongoose');

// Schema for AddressBook
const wordsSchema = mongoose.Schema({
    word: {
     type: String,
     required: true
    }
   })
   //Creating the collection Address
   const Words = mongoose.model('Words', wordsSchema)
   module.exports = Words;