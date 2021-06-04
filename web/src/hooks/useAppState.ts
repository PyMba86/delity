import React from "react";
import {AppStateContext} from "../containers/AppState";


export function useAppState() {
    return React.useContext(AppStateContext);
}