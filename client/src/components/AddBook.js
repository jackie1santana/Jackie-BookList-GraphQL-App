import React, { Component } from 'react'
import { graphql} from 'react-apollo'
import { getAuthorsQuery, getBooksQuery, addBookMutation } from '../queries/queries'
import { flowRight as compose } from 'lodash'

//form tag
class AddBook extends Component {
    constructor(props){
        super(props)

        this.state = {
            name: '',
            genre: '',
            authorId: ''
        }
    }

   displayAuthors(){
       const data = this.props.getAuthorsQuery

       if(data.loading){
        return (<option disabled>Loading Authors..</option>)
       }else {
            return data.authors.map(author => {
                return (<option key={author.id} value={author.id} >{author.name}</option>)
            })
       }
   }

    submitForm(e){
        e.preventDefault()
        this.props.addBookMutation({
            variables: {
                name: this.state.name,
                genre: this.state.genre,
                authorId: this.state.authorId
            },
            refetchQueries: [{ query: getBooksQuery }]
        })

    }

    render() {
        console.log(this.props)
        return (
          <form id="add-book" onSubmit={this.submitForm.bind(this)} >

            <div className="field" >
                <label>Book Name:</label>
                <input type="text" onChange={(e) => this.setState({ name: e.target.value })} />
            </div>

            <div className="field" >
                <label>Genre:</label>
                <input type="text" onChange={(e) => this.setState({ genre: e.target.value })}/>
            </div>

            <div className="field" >
                <label>Author:</label>
                <select onChange={(e) => this.setState({ authorId: e.target.value })}>
                    <option>Select author:</option>
                    { this.displayAuthors() }
                </select>
            </div>

            <button>+</button>

          </form>
        )
    }
}

//this basically says, take graphql and bind geyBooks Query to BookList
export default compose(
    //use compose to bind queries to client & bind mutations to client
    graphql(getAuthorsQuery, {name: "getAuthorsQuery"}),
    graphql(addBookMutation, {name: "addBookMutation"})
    //both query & mutations are now bound to (addBook)
)(AddBook);


//use compose to bind multiple queries