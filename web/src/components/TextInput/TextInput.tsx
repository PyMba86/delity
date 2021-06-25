import {CommonProps} from "../../theme";
import {Input, InputProps} from "../Input";
import {InputWrapper, InputWrapperBaseProps} from "../InputWrapper";
import React from "react";
import {useId} from "../../hooks/useId";

export interface TextInputProps extends CommonProps, InputProps, InputWrapperBaseProps,
    React.ComponentPropsWithoutRef<'input'> {

    /** id is used to bind input and label */
    id?: string;

    /** Adds icon on the left */
    icon?: React.ReactNode;

    /** Element type */
    type?: 'text' | 'password' | 'email' | 'search' | 'tel' | 'url' | 'number';

    /** Get element ref */
    elementRef?: React.ForwardedRef<HTMLInputElement>;
}

export function TextInput(
    {
        className,
        id,
        label,
        error,
        required,
        type = "text",
        style,
        icon,
        description,
        colorScheme,
        elementRef,
        ...props
    }: TextInputProps) {

    const uuid = useId(id);

    return (
        <InputWrapper
            required={required}
            id={uuid}
            label={label}
            error={error}
            description={description}
            className={className}
            style={style}
            colorScheme={colorScheme}
            {...props}
        >
            <Input<'input'>
                {...props}
                required={required}
                elementRef={elementRef}
                id={uuid}
                type={type}
                invalid={!!error}
                icon={icon}
                colorScheme={colorScheme}
            />
        </InputWrapper>
    )
}