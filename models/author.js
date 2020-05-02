const mongoose = require('mongoose')
const Schema = mongoose.Schema

//don't have to create an ID because mongoose creates one
const authorSchema = new Schema({
    name: String,
    age: Number
})

module.exports = mongoose.model('Author', authorSchema)

