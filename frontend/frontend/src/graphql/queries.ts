import { gql } from "@apollo/client";

export const GET_KIOSKS = gql`
  query GetKiosks {
    kiosks {
      id
      name
      location
      status
    }
  }
`;
