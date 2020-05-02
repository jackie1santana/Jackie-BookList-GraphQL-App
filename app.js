const express = require('express')
const graphqlHTTP = require('express-graphql')
const schema = require('./schema/schema')
const mongoose = require('mongoose')
const cors = require('cors')
const path = require('path')
 const app = express()

 const port = process.env.PORT

 app.use(cors())


const publicDirectoryPath = path.join(__dirname, './client/build')

app.use(express.static(publicDirectoryPath))


 
 mongoose.connect('mongodb+srv://jackie:1234@fcc-graphql-ikerj.mongodb.net/graphql?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true});

 app.get('', (req, res) => {
    res.sendFile(publicDirectoryPath)
  })

 app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
 }))

 app.listen(port, () => {
     console.log(` server running on port ${port}`)
 })