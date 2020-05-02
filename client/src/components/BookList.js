import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import { getBooksQuery } from '../queries/queries'
import BookDetails from './BookDetails'

//now we need to bind this query to this component (react-apollo package does that)
class BookList extends Component {

    constructor(props){
        super(props)
        this.state = {
            selected: null
        }
    }


    displayBooks(){
        const data = this.props.data;
        if(data.loading){
            return (<div>Loading Books...</div>)
        }else {
            return data.books.map(book => {
                return (
                    <li key={book.id} onClick={ (e) => { this.setState({ selected: book.id }) }}> {book.name}</li>
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
                <BookDetails bookId={this.state.selected} />
            </div>
        )
    }
}

//this basically says, take graphql and bind geyBooks Query to BookList
export default graphql(getBooksQuery)(BookList);
