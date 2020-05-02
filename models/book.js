const mongoose = require('mongoose')
const Schema = mongoose.Schema

//don't have to create an ID because mongoose creates one
const bookSchema = new Schema({
    name: String,
    genre: String,
    authorId: String
})

module.exports = mongoose.model('Book', bookSchema)

