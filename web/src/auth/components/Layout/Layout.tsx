import React from "react";
import useStyles from "./Layout.styles";

interface LayoutProps {
    children?: React.ReactNode;
}

export function Layout(
    {
        children
    }: LayoutProps) {

    const classes = useStyles();

    return (
        <div className={classes.root}>
            <div className={classes.sidebar}/>
            <div className={classes.mainPanel}>
                <div className={classes.mainPanelContent}>
                    {children}
                </div>
            </div>

        </div>
    )
}