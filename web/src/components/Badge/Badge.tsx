import {CommonProps, DelityNumberSize, DelitySize, useTheme} from "../../theme";
import {DelityColorKeys} from "../../theme/colors";
import React from "react";
import {ComponentPassThrough} from "../../types";
import useStyles from './Badge.styles';
import cx from "clsx";

export interface BadgeProps extends CommonProps {
    /** Badge color from theme */
    color?: DelityColorKeys;

    /** Controls badge background */
    variant?: 'light' | 'filled' | 'outline' | 'dot';

    /** Defines badge height and font-size */
    size?: DelitySize;

    /** Predefined border-radius */
    radius?: DelityNumberSize;

    /** Sets badge width to 100% */
    fullWidth?: boolean;

    /** Section rendered on the left side of label */
    leftSection?: React.ReactNode;

    /** Section rendered on the right side of label */
    rightSection?: React.ReactNode;

    children?: React.ReactNode;
}

export const BadgeElementType = 'div';

export function Badge<T extends React.ElementType = typeof BadgeElementType>(
    {
        component,
        className,
        color,
        variant = 'light',
        fullWidth = false,
        children,
        colorScheme,
        size = 'md',
        leftSection,
        rightSection,
        radius = 'xl',
        ...props

    }: ComponentPassThrough<T, BadgeProps>) {

    const theme = useTheme(colorScheme);

    const classes = useStyles(colorScheme, {
        size,
        fullWidth,
        color,
        radius,
        theme
    });

    const Element = component || BadgeElementType;

    return (
        <Element {...props} className={cx(classes.badge, classes[variant], className)}>
            {leftSection && (
                <span className={classes.leftSection}>
                    {leftSection}
                </span>
            )}

            <span className={classes.inner}>
                {children}
            </span>

            {rightSection && (
                <span className={classes.rightSection}>
                    {rightSection}
                </span>
            )}
        </Element>
    )
}