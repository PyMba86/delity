import React from "react";
import {User} from "../fragments/types/User";
import {TokenAuth_tokenCreate} from "./types/TokenAuth";

interface UserContext {
    login: (username: string, password: string) => Promise<TokenAuth_tokenCreate>;
    logout: () => void;
    tokenAuthLoading: boolean;
    user?: User;
}

export const UserContext = React.createContext<UserContext>({} as UserContext);