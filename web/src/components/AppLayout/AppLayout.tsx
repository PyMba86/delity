import React, {useState} from "react";
import useStyles from "./AppLayout.styles";
import {AppHeader} from "../AppHeader";

interface AppLayoutProps {
    children?: React.ReactNode;
}

export function AppLayout(
    {
        children
    }: AppLayoutProps) {

    const classes = useStyles();

    const [navbarOpened, setNavbarState] = useState(false);

    return (
        <div className={classes.layout}>

            <AppHeader navbarOpened={navbarOpened}
                       toggleNavbar={() => setNavbarState(o => !o)}/>

            <main className={classes.main}>
                <div className={classes.content}>
                    {children}
                </div>
            </main>
        </div>
    )
}