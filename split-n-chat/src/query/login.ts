import { gql } from "@apollo/client";

export const login = gql`
  query login($first_name: String!, $last_name: String!) {
    login(first_name: $first_name, last_name: $last_name) {
      user_id
      first_name
      last_name
    }
  }
`;
