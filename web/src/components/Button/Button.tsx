import {CommonProps, DelityNumberSize, DelitySize, useTheme} from "../../theme";
import React from "react";
import useStyles from './Button.styles';
import cx from 'clsx';
import {DelityColorKeys} from "../../theme/colors";
import {ComponentPassThrough} from "../../types";

export interface ButtonBaseProps<U> extends CommonProps {
    /** Predefined button size */
    size?: DelitySize;

    /** Button type attribute */
    type?: 'submit' | 'button' | 'reset';

    /** Button color from theme */
    color?: DelityColorKeys;

    /** Adds icon before button label  */
    leftIcon?: React.ReactNode;

    /** Adds icon after button label  */
    rightIcon?: React.ReactNode;

    /** Sets button width to 100% of parent element */
    fullWidth?: boolean;

    /** Button border-radius from theme or number to set border-radius in px */
    radius?: DelityNumberSize;

    /** Controls button appearance */
    variant?: 'link' | 'filled' | 'outline' | 'light';
}

export const ButtonElementType = 'button';

export function Button<T extends React.ElementType = typeof ButtonElementType,
    U extends HTMLElement = HTMLButtonElement>(
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
        elementRef,
        ...props
    }: ComponentPassThrough<T, ButtonBaseProps<U>>) {

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