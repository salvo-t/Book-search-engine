const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID!
    username: String!
    email: String!
    password: String!
    savedBooks: [Book]
  }

  type Book {
    _id: ID!
    authors: String!
    description: String!
    bookID: String!
    image: String
    link: String
    title: String!
  }

  type Query {
    getSingleUser: [User]
    matchups(_id: String): [Matchup]
  }

  type Mutation {
    createUser(tech1: String!, tech2: String!): Matchup
    createVote(_id: String!, techNum: Int!): Matchup
  }
`;

module.exports = typeDefs;