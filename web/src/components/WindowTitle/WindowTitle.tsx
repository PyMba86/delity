import React from "react";
import {Helmet} from "react-helmet";


interface WindowTitleProps {
    title: string;
}

export function WindowTitle(
    {
        title
    }: WindowTitleProps) {

    return (
        <Helmet title={title}/>
    )
}