import { gql } from "apollo-boost";

const GET_DEVICES = gql`
  {
    repository(owner: "LineageOS", name: "lineage_wiki") {
      object(expression: "master:_data/devices") {
        ... on Tree {
          entries {
            name
            object {
              ... on Blob {
                text
              }
            }
          }
        }
      }
    }
  }
`;

export default GET_DEVICES;
