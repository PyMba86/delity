import gql from "graphql-tag";

export const fragmentUser = gql`
    fragment User on User {
        id
        email,
        userPermissions {
            code
            name
        }
    }
`;