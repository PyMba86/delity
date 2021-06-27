import gql from "graphql-tag";
import {fragmentUser} from "../fragments/auth";

export const tokenAuthMutation = gql`
    ${fragmentUser}
    mutation TokenAuth($email: String!, $password: String!) {
        tokenCreate(email: $email, password: $password) {
            token
            user {
                ...User
            }
        }
    }
`;