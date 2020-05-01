import React, { Component } from 'react'
import { gql } from 'apollo-boost'
import { graphql } from 'react-apollo'

//pulling from the graphql uri
const getBooksQuery = gql `
{
    books {
        name,
        id
    }
}
`
//now we need to bind this query to this component (react-apollo package does that)
class BookList extends Component {
    displayBooks(){
        const data = this.props.data;
        if(data.loading){
            return (<div>Loading Books...</div>)
        }else {
            return data.books.map(book => {
                return (
                    <li key={book.id}>{book.name}</li>
                )
            })
        }
    }

    render() {
        console.log(this.props)
        return (
            <div>
                <ul id="book-list" >
                    { this.displayBooks() }
                </ul>
            </div>
        )
    }
}

//this basically says, take graphql and bind geyBooks Query to BookList
export default graphql(getBooksQuery)(BookList);
