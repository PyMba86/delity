import React, {useRef, useState} from "react";
import {TextInput} from "../TextInput";
import {ActionIcon} from "../ActionIcon";
import {PasswordToggleIcon} from "../../icons/PasswordToggleIcon";

export interface PasswordInputProps
    extends Omit<React.ComponentPropsWithoutRef<typeof TextInput>, 'rightSection'> {
    /** Title for visibility toggle */
    showPasswordLabel?: string;

    /** Title for visibility  toggle*/
    hidePasswordLabel?: string;

    /** Focus input when toggle button is pressed */
    focusInputOnToggle?: boolean;
}

export function PasswordInput(
    {
        radius,
        disabled,
        hidePasswordLabel,
        showPasswordLabel,
        focusInputOnToggle = false,
        colorScheme,
        elementRef,
        ...props
    }: PasswordInputProps) {

    const inputRef = useRef<HTMLInputElement>();

    const [reveal, setReveal] = useState(false);

    const toggleReveal = () => {
        setReveal(current => !current);
        if (focusInputOnToggle) {
            inputRef.current?.focus();
        }
    }

    const rightSection = (
        <ActionIcon
            onClick={toggleReveal}
            colorScheme={colorScheme}
            title={reveal ? hidePasswordLabel : showPasswordLabel}
            radius={radius}>
            <PasswordToggleIcon reveal={reveal}/>
        </ActionIcon>
    )

    return (
        <TextInput
            {...props}
            disabled={disabled}
            colorScheme={colorScheme}
            type={reveal ? 'text' : 'password'}
            rightSection={disabled ? null : rightSection}
            radius={radius}
        />
    )
}