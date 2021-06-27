import React from "react";
import {UserContext} from "../auth/UserContext";

export function useUser() {
    return React.useContext(UserContext);
}