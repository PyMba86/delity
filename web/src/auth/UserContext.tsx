import React from "react";

interface UserContext {
    login: (username: string, password: string) => void;
    logout: () => void;
}

export const UserContext = React.createContext<UserContext>({
    login: (username, password) => undefined,
    logout: () => undefined
});