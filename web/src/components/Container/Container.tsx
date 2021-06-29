import {CommonProps, ThemeNumberSize, useTheme} from "../../theme";
import useStyles from './Container.styles';
import React from "react";
import {ThemeBreakpoint} from "../../theme/breakpoints";
import cx from "clsx";

export interface ContainerProps extends CommonProps,
    React.ComponentPropsWithoutRef<'div'> {

    /** Horizontal padding */
    padding?: ThemeNumberSize;

    /** Predefined container max-width in px*/
    size?: ThemeBreakpoint;
}

export function Container(
    {
        className,
        colorScheme,
        padding,
        size,
        title,
        ...props
    }: ContainerProps) {

    const theme = useTheme(colorScheme);

    const classes = useStyles(colorScheme, {
        size,
        theme,
        padding
    });

    return <div className={cx(classes.container, className)} {...props}/>
}