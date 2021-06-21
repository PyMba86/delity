import {CommonProps, ThemeNumberSize, useTheme} from "../../theme";
import React from "react";
import {ThemeColorKeys} from "../../theme/colors";
import {ComponentPassThrough} from "../../types";
import useStyles from './ActionIcon.styles';
import {ButtonElementType} from "../Button";
import cx from "clsx";

export interface ActionIconProps extends CommonProps, React.ComponentPropsWithoutRef<'button'> {
    /** Icon rendered inside button */
    children: React.ReactNode;

    /** Controls appearance */
    variant?: 'transparent' | 'hover' | 'filled' | 'outline' | 'light';

    /** Button hover, active and icon colors from theme */
    color?: ThemeColorKeys;

    /** Button border-radius */
    radius?: ThemeNumberSize;

    /** Predefined icon size */
    size?: ThemeNumberSize;

    /** Get element ref */
    elementRef?: React.ForwardedRef<HTMLButtonElement>;
}

export const ActionIconElementType = 'button';

export function ActionIcon<T extends React.ElementType = typeof ActionIconElementType>(
    {
        className,
        color = 'gray',
        children,
        radius = 'sm',
        size = 'md',
        variant = 'hover',
        colorScheme,
        elementRef,
        component,
        ...props
    }: ComponentPassThrough<T, ActionIconProps>) {

    const theme = useTheme(colorScheme);

    const classes = useStyles(colorScheme, {
        size,
        radius,
        color,
        theme
    });

    const Element = component || ButtonElementType;

    return (
        <Element {...props}
                 className={cx(classes.actionIcon, classes[variant], className)}
                 type={"button"}
                 ref={elementRef}>
            {children}
        </Element>
    )
}