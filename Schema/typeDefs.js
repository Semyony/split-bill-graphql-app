const { gql } = require('apollo-server-express');
const typeDefs = gql`

  type User {
    user_id: ID!
    first_name: String!,
    last_name: String!
  }

  type Item {
    item_id: ID!,
    title: String!,
    price: Float!
  }

  type ItemUser {
    item: Item!,
    user: User!,
    quantity: Int!
  }

  type Query {
    totalQuantityByItemID(id: Int): Int,
    totalPriceByItemID(id: Int): Float,
    totalPriceForAll: Float,
    totalPriceByUserID(id: Int): Float,
    totalQuantityByItemIDForUser(item_id: Int, user_id: Int): Int,
    totalPriceByItemIDForUser(item_id: Int, user_id: Int): Float
  }
`;

module.exports = { typeDefs };