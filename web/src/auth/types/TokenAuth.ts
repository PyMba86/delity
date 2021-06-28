/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { PermissionEnum } from "./../../types/globalTypes";

// ====================================================
// GraphQL mutation operation: TokenAuth
// ====================================================

export interface TokenAuth_tokenCreate_user_userPermissions {
  __typename: "UserPermission";
  code: PermissionEnum;
  name: string;
}

export interface TokenAuth_tokenCreate_user {
  __typename: "User";
  id: string;
  email: string;
  userPermissions: TokenAuth_tokenCreate_user_userPermissions[];
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
