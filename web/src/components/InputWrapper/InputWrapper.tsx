import React, {createElement} from "react";
import {CommonProps, useTheme} from "../../theme";
import useStyles from './InputWrapper.styles';
import cx from "clsx";
import {Text} from "../Text";

export interface InputWrapperBaseProps {

    /** Input label, displayed before input */
    label?: React.ReactNode;

    /** Input description, displayed after label */
    description?: React.ReactNode;

    /** Displays error message after input */
    error?: React.ReactNode;

    /** Adds red asterisk */
    required?: boolean;
}

export interface InputWrapperProps extends CommonProps, InputWrapperBaseProps,
    React.ComponentPropsWithoutRef<'div'> {

    /** Input that should be wrapped */
    children: React.ReactNode;

    /** htmlFor label */
    id?: string;

    /** Render label as label */
    labelElement?: 'label' | 'div';
}

export function InputWrapper(
    {
        className,
        label,
        children,
        required,
        id,
        error,
        description,
        colorScheme,
        labelElement = 'label',
        ...props
    }: InputWrapperProps) {

    const theme = useTheme(colorScheme);

    const classes = useStyles(colorScheme, {
        theme
    });

    const labelProps = labelElement === 'label' ? {htmlFor: id} : {};

    const inputLabel = createElement(
        labelElement,
        {...labelProps, className: classes.label},
        <>
            {label}
            {required && (
                <span className={classes.required}>
                    {' '} *
                </span>
            )}
        </>
    );

    return (
        <div className={cx(classes.inputWrapper, className)} {...props}>
            {label && inputLabel}
            {description && (
                <Text colorScheme={colorScheme} color={"gray"} size={'xs'}
                      className={classes.description}>
                    {description}
                </Text>
            )}

            {children}

            {typeof error !== "boolean" && error && (
                <Text colorScheme={colorScheme} color={'red'} size={"sm"}
                      className={classes.error}>
                    {error}
                </Text>
            )}

        </div>
    )

}