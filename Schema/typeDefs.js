const { gql } = require("apollo-server-express");
const typeDefs = gql`
  type User {
    user_id: ID!
    first_name: String!
    last_name: String!
  }

  type Item {
    item_id: ID!
    title: String!
    price: Float!
  }

  type ItemUser {
    item: Item!
    user: User!
    quantity: Int!
  }

  type TotalItem {
    title: String!
    price: Float!
    quantity: Int!
    totalPrice: Float!
  }

  type UserItems {
    user_id: ID!
    first_name: String!
    last_name: String!
    total_items: [TotalItem]
  }

  input userid {
    id: ID
  }

  type Query {
    totalQuantityByItemID(id: Int): Int
    totalPriceByItemID(id: Int): Float
    totalPriceForAll: Float
    totalPriceByUserID(id: userid): Float
    totalQuantityByItemIDForUser(item_id: Int, user_id: Int): Int
    totalPriceByItemIDForUser(item_id: Int, user_id: Int): Float
    allUsers: [UserItems!]!
    allItems: [TotalItem!]!
    login(first_name: String!, last_name: String!): User
  }

  type Mutation {
    addUser(first_name: String!, last_name: String!): Boolean!
    addItemUser(user_id: Int!, item_id: Int!, quantity: Int!): Boolean!
    addItem(title: String!, price: Float!): Boolean!
  }
`;

module.exports = { typeDefs };
