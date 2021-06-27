import React, {useState} from "react";
import {UserContext} from "./UserContext";
import {User} from "../fragments/types/User";
import {removeAuthToken, setAuthToken} from "./utils";
import {useApolloClient, useMutation} from "react-apollo";
import {tokenAuthMutation} from "./mutations";
import {TokenAuth, TokenAuthVariables} from "./types/TokenAuth";

interface AuthProviderProps {
    children: React.ReactNode;
}

export function AuthProvider(
    {
        children
    }: AuthProviderProps) {

    const apolloClient = useApolloClient();

    const [user, setUser] = useState<User | undefined>(undefined);

    const logout = () => {
        setUser(undefined);
        removeAuthToken();
    }

    const [tokenAuth, tokenAuthResult] = useMutation<TokenAuth, TokenAuthVariables>(
        tokenAuthMutation,
        {
            client: apolloClient,
            onCompleted: ({tokenCreate}) => {
                setUser(tokenCreate.user);
                setAuthToken(tokenCreate.token);
            },
            onError: logout
        });

    const login = async (email: string, password: string) => {

        const result = await tokenAuth({variables: {email, password}});

        if (result.data) {
            return result.data.tokenCreate;
        } else {
            throw new Error("Create token data empty");
        }
    }

    return (
        <UserContext.Provider value={
            {
                login,
                logout,
                tokenAuthLoading: tokenAuthResult.loading,
                user: user
            }}>
            {children}
        </UserContext.Provider>
    )
}