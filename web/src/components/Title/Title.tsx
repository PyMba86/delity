import {CommonProps, useTheme} from "../../theme";
import React from "react";
import useStyles from './Title.styles';
import cx from "clsx";


export interface TitleProps extends CommonProps, React.ComponentPropsWithoutRef<'h1'> {
    /** Define component will be used */
    order?: 1 | 2 | 3 | 4 | 5 | 6;
}

export function Title(
    {
        className,
        colorScheme,
        order = 1,
        children,
        ...props
    }: TitleProps) {

    const element = `h${order}` as const;

    const theme = useTheme(colorScheme);

    const classes = useStyles(colorScheme, {
        element,
        theme
    });

    return React.createElement(
        element,
        {
            className: cx(classes.title, className),
            ...props
        },
        children
    )

}