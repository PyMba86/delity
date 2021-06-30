import React from "react";
import {AppThemeContext} from "../components/AppTheme";

export function useAppTheme() {
    return React.useContext(AppThemeContext);
}