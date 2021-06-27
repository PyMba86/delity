import React from 'react';
import {CommonProps, ThemeNumberSize, useTheme} from "../../theme";
import {ComponentPassThrough} from "../../types";
import useStyles from './Input.styles';
import cx from "clsx";

export interface InputProps extends CommonProps {
    /** Sets border color to red */
    invalid?: boolean;

    /** Adds icon on the left side of input */
    icon?: React.ReactNode;

    /** Right section of input, similar to icon but on the right */
    rightSection?: React.ReactNode;

    rightSectionWidth?: number;

    /** Add className to input element */
    inputClassName?: string;

    /** Adds style to input element */
    inputStyle?: React.CSSProperties;

    /** Set required on input element */
    required?: boolean;

    /** Input border-radius from theme or number */
    radius?: ThemeNumberSize;

    /** Defines input appearance */
    variant?: 'default' | 'filled' | 'unstyled';

    /** Get element ref */
    elementRef?: React.ForwardedRef<HTMLInputElement>
}

export const InputElementType = 'input';

export function Input<T extends React.ElementType = typeof InputElementType>(
    {
        component,
        className,
        invalid = false,
        required = false,
        variant = 'default',
        rightSectionWidth = 36,
        icon,
        style,
        rightSection,
        radius = 'sm',
        inputClassName,
        inputStyle,
        colorScheme,
        elementRef,
        ...props
    }: ComponentPassThrough<T, InputProps>) {

    const theme = useTheme(colorScheme);

    const classes = useStyles(colorScheme, {
        radius, theme
    });

    const Element = component || InputElementType;

    return (
        <div className={cx(classes.inputWrapper, {
            [classes.invalid]: invalid,
        }, classes[variant], className)} style={style}>
            {icon && (
                <div className={classes.icon}>
                    {icon}
                </div>
            )}

            <Element {...props}
                     ref={elementRef}
                     aria-required={required}
                     aria-invalid={invalid}
                     className={cx({
                         [classes.withIcon]: icon
                     }, classes.input, inputClassName)}
                     style={{
                         paddingRight: rightSection ? rightSectionWidth : theme.spacing.md,
                         ...inputStyle,
                     }}/>

            {rightSection && (
                <div
                    style={{ width: rightSectionWidth }}
                    className={cx(classes.rightSection)}>
                    {rightSection}
                </div>
            )}
        </div>
    )
}