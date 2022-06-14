import { gql } from "@apollo/client";

export const sendMessage = gql`
  mutation SendMessage($message: String!, $from: Int!, $firstName: String!) {
    sendMessage(message: $message, user_id: $from, first_name: $firstName)
  }
`;
