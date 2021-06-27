/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: TokenAuth
// ====================================================

export interface TokenAuth_tokenCreate_user {
  __typename: "User";
  id: string;
  email: string;
}

export interface TokenAuth_tokenCreate {
  __typename: "CreateToken";
  token: string;
  user: TokenAuth_tokenCreate_user;
}

export interface TokenAuth {
  tokenCreate: TokenAuth_tokenCreate;
}

export interface TokenAuthVariables {
  email: string;
  password: string;
}
