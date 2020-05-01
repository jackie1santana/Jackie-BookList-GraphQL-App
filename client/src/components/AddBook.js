import React, { Component } from 'react'
import { gql } from 'apollo-boost'
import { graphql } from 'react-apollo'

//pulling from the graphql uri
const getAuthorsQuery = gql `
{
    authors {
        name,
        id
    }
}
`
//form tag
class AddBook extends Component {
   displayAuthors(){
       const data = this.props.data

       if(data.loading){
        return (<option>Loading Authors..</option>)
       }else {
            return data.authors.map(author => {
                return (<option key={author.id} value={author.id} >{author.name}</option>)
            })
       }
   }

    render() {
        console.log(this.props)
        return (
          <form id="add-book" >

            <div className="field" >
                <label>Book Name:</label>
                <input type="text" />
            </div>

            <div className="field" >
                <label>Genre:</label>
                <input type="text" />
            </div>

            <div className="field" >
                <label>Author:</label>
                <select>
                    <option>Select author:</option>
                    { this.displayAuthors() }
                </select>
            </div>

          </form>
        )
    }
}

//this basically says, take graphql and bind geyBooks Query to BookList
export default graphql(getAuthorsQuery)(AddBook);
