import { gql } from "@apollo/client";

export const totalPriceByUserID = gql`
  query getPriceByUserID($user_id: userid) {
    totalPriceByUserID(id: $user_id)
  }
`;

