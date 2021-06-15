import {CommonProps, ThemeNumberSize, useTheme} from "../../theme";
import React from "react";
import {ThemeColorKeys} from "../../theme/colors";
import useStyles from './ThemeIcon.styles';
import cx from "clsx";


export interface ThemeIconProps extends CommonProps, React.ComponentProps<'div'> {
    /** Icon */
    children: React.ReactNode;

    /** Predefined width and height or number for width and height */
    size?: ThemeNumberSize;

    /** Predefined border-radius */
    radius?: ThemeNumberSize;

    /** Icon color from theme */
    color?: ThemeColorKeys;

    /** Controls appearance */
    variant?: 'filled' | 'light';
}

export function ThemeIcon(
    {
        className,
        size = 'md',
        radius = 'sm',
        variant = 'filled',
        color,
        children,
        colorScheme,
        ...props
    }: ThemeIconProps) {

    const theme = useTheme(colorScheme);

    const classes = useStyles(colorScheme, {
        theme,
        radius,
        color,
        size
    });

    return (
        <div className={cx(classes.themeIcon, classes[variant], className)}
             {...props}>
            {children}
        </div>
    )
}