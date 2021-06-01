import {CommonProps, DelityNumberSize, DelitySize, useTheme} from "../../theme";
import React, {ButtonHTMLAttributes} from "react";
import useStyles from './Button.styles';
import cx from 'clsx';
import {DelityColorKeys} from "../../theme/colors";

export interface ButtonBaseProps extends CommonProps {
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

export function Button(
    {
        className,
        size = 'md',
        color,
        type = 'button',
        disabled = false,
        children,
        leftIcon,
        rightIcon,
        fullWidth = false,
        variant = 'filled',
        radius = 'sm',
        colorScheme,
        ...props
    }: ButtonBaseProps & ButtonHTMLAttributes<HTMLButtonElement>) {

    const theme = useTheme(colorScheme);

    const classes = useStyles(colorScheme, {
        radius,
        color,
        size,
        fullWidth,
        theme
    });

    return (
        <button {...props}
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
        </button>
    )
}