import { gql } from "@apollo/client";

export const messageAdded = gql`
  subscription MessageAdded {
    MessageAdded {
      message_id
      user_id
      first_name
      message
    }
  }
`;
