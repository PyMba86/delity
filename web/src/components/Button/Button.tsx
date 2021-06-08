import {CommonProps, ThemeNumberSize, ThemeSize, useTheme} from "../../theme";
import React from "react";
import useStyles from './Button.styles';
import cx from 'clsx';
import {ThemeColorKeys} from "../../theme/colors";
import {ComponentPassThrough} from "../../types";

export interface ButtonBaseProps extends CommonProps {
    /** Predefined button size */
    size?: ThemeSize;

    /** Button type attribute */
    type?: 'submit' | 'button' | 'reset';

    /** Button color from theme */
    color?: ThemeColorKeys;

    /** Adds icon before button label  */
    leftIcon?: React.ReactNode;

    /** Adds icon after button label  */
    rightIcon?: React.ReactNode;

    /** Sets button width to 100% of parent element */
    fullWidth?: boolean;

    /** Button border-radius from theme or number to set border-radius in px */
    radius?: ThemeNumberSize;

    /** Controls button appearance */
    variant?: 'link' | 'filled' | 'outline' | 'light';

    children?: React.ReactNode;
}

export const ButtonElementType = 'button';

export function Button<T extends React.ElementType = typeof ButtonElementType>(
    {
        className,
        size = 'md',
        color,
        type = 'button',
        disabled = false,
        component,
        children,
        leftIcon,
        rightIcon,
        fullWidth = false,
        variant = 'filled',
        radius = 'sm',
        colorScheme,
        ...props
    }: ComponentPassThrough<T, ButtonBaseProps>) {

    const theme = useTheme(colorScheme);

    const classes = useStyles(colorScheme, {
        radius,
        color,
        size,
        fullWidth,
        theme
    });

    const Element = component || ButtonElementType;

    return (
        <Element {...props}
                 className={cx(classes.shared, classes[variant], className)}
                 type={type}
                 disabled={disabled}>

            <div className={classes.inner}>
                {leftIcon && (
                    <span className={cx(classes.icon, classes.leftIcon)}>
                        {leftIcon}
                    </span>
                )}

                <span className={classes.label}>
                    {children}
                </span>

                {rightIcon && (
                    <span className={cx(classes.icon, classes.rightIcon)}>
                        {rightIcon}
                    </span>
                )}
            </div>
        </Element>
    )
}