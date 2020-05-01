import React from 'react';
import BookList from './components/BookList'
import ApolloClient from 'apollo-boost'


//Apollo client set up

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql'
})


function App() {
  return (
    <div id="main">
      <h1>Jackie's Reading List</h1>
      <BookList/>
    </div>
  );
}

export default App;
