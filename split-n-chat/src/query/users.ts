import { gql } from "@apollo/client";

export const getAllUsers = gql`
  query {
    allUsers {
    user_id
    first_name
    last_name
    total_items {
      title
      price
      quantity
      totalPrice
    }
    
  }
  }
`;
