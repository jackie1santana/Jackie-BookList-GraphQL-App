const graphql = require('graphql')
const Book = require('../models/book')
const Author = require('../models/author')
const { 
    GraphQLObjectType, 
    GraphQLString, 
    GraphQLSchema ,
    GraphQLID,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull
} = graphql;

//defined your 1st object type for the schema
const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        genre: { type: GraphQLString },
        author:{
            type: AuthorType,
            resolve(parent, args){
                // console.log(parent)
                // return authors.find(i => i.id == parent.authorId)
                return Author.findById(parent.authorId)
            }
        }
    })
}) 

const AuthorType = new GraphQLObjectType({
    name: 'Author',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        age: { type: GraphQLInt },
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args){
                // console.log(parent)
                // return books.filter(i => i.authorId == parent.id)
                return Book.find({ authorId: parent.id})
                
            }
        }
    })
}) 

// put both Types above inside the root query
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        book: {
            type: BookType,
            args: {id: { type: GraphQLID }},
            resolve(parent, args){
               //code to get data from db/ or other source
               //using lodash
            //    return _.find(books, {id: args.id })
            // return books.find(i => i.id == args.id)
            return Book.findById(args.id)
            }
        },
        author: {
            type: AuthorType,
            args: {id: {type: GraphQLID}},
            resolve(parent, args){
                // console.log(parent)
                // return authors.find(i => i.id == args.id)
                return Author.findById(args.id)
            }
        },
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args){
                // return books
                return Book.find({})
            }
        },
        authors: {
            type: new GraphQLList(AuthorType),
            resolve(parent, args){
                // return authors
                return Author.find({})
            }
        },
    }
})

//redefine types
const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addAuthor: {
            type: AuthorType,
            args: {
                name: { type: new GraphQLNonNull(GraphQLString) },
                age: { type: new GraphQLNonNull(GraphQLInt) }
            },
            resolve(parent, args){
                //author model from mongoose schema
                let author = new Author({
                    name: args.name,
                    age: args.age
                })

               return author.save()
            }
        },
        addBook: {
            type: BookType,
            args: {
                name: { type: new GraphQLNonNull(GraphQLString) },
                genre: { type: new GraphQLNonNull(GraphQLString) },
                authorId: { type: new GraphQLNonNull(GraphQLID) }
            },
            resolve(parent, args){
                //author model from mongoose schema
                let book = new Book({
                    name: args.name,
                    genre: args.genre,
                    authorId: args.authorId
                })

               return book.save()
            }
        },
    }
})

module.exports = new GraphQLSchema({
    query:RootQuery,
    mutation: Mutation
})