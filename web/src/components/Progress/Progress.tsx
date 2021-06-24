import {CommonProps, ThemeNumberSize, useTheme} from "../../theme";
import React from "react";
import {ThemeColorKeys} from "../../theme/colors";
import useStyle from './Progress.styles';
import {useReducedMotion} from "../../hooks/useReducedMotion";
import cx from "clsx";

export interface ProgressProps extends CommonProps, React.ComponentPropsWithoutRef<'div'> {
    /** Percent of filled bar (0-100)*/
    value: number;

    /** Progress color from theme */
    color?: ThemeColorKeys;

    /** Predefined progress height */
    size?: ThemeNumberSize;

    /** Predefined progress radius */
    radius?: ThemeNumberSize;
}

export function Progress(
    {
        className,
        value,
        color,
        size = 'sm',
        radius = 'sm',
        colorScheme,
        ...props

    }: ProgressProps) {

    const theme = useTheme(colorScheme);

    const reduceMotion = useReducedMotion();

    const classes = useStyle(colorScheme, {
        reduceMotion,
        theme,
        color,
        radius,
        size
    });

    return (
        <div className={cx(classes.progress, className)} {...props}>
            <div role={'progressbar'}
                 className={classes.bar}
                 style={{width: `${value}%`}}
            />
        </div>
    )
}