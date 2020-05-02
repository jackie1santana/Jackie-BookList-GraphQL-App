# Developer Notes

This is a Full Stack React GraphQL Node.js MongoDB Application.

The purpose of this app is to give the user the ability to create new books composed by the selected authors.
The user always has the abuility to select any Book by name which will render & disp[ay the information about the book & author.

### The technologies that I use is: 

* React for the client

* Node.js for the backend to implement a Graphql server.

* Apollo Client to query the graphQL via User which then sends the query
back down to the graphql server which then sends off the data to the 
mongoDB database I have hosted on a cloud.

I use environment variables to protect pertinent information.
I always use a proxy for fetching http throught the client.

React is served up as a static asset through express.
