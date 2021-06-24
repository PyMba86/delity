import React from "react";
import useStyles from "./LoginLoading.styles";
import {Loader} from "../../../components/Loader";

export function LoginLoading() {

    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Loader size={"lg"}/>
        </div>
    )
}