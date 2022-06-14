import { gql } from "@apollo/client";

export const getMessages = gql`
  query getMessages {
    getMessages {
      message_id
      user_id
      first_name
      message
    }
  }
`;
