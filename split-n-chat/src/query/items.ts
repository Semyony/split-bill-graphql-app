import { gql } from "@apollo/client";

export const getAllItems = gql`
  query {
    allItems {
      title
      price
      quantity
      totalPrice
    }
    totalPriceForAll
  }
`;

