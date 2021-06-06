import React from "react";
import useStyles from "./AppTheme.styles";

export interface AppThemeProps {
    children?: React.ReactNode;
}

export function AppTheme({children}: AppThemeProps) {

    useStyles();

    return (
        <React.Fragment>
            {children}
        </React.Fragment>
    )
}