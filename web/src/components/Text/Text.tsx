import {CommonProps, ThemeSize, useTheme} from "../../theme";
import React from "react";
import cx from "clsx";
import {ThemeColorKeys} from "../../theme/colors";
import useStyles, {TextVariant} from "./Text.styles";
import {ComponentPassThrough} from "../../types";

export interface TextProps extends CommonProps {
    /** Text itself */
    children?: React.ReactNode;

    /** font-size */
    size?: ThemeSize;

    /** Text color from theme */
    color?: ThemeColorKeys;

    /** font-weight */
    weight?: React.CSSProperties['fontWeight'];

    /** text-transform  */
    transform?: 'capitalize' | 'uppercase' | 'lowercase';

    /** text-align */
    align?: 'left' | 'center' | 'right';

    /** link or text variant */
    variant?: TextVariant;
}

export const TextElementType = 'div';

export function Text<T extends React.ElementType = typeof TextElementType, U = HTMLDivElement>(
    {
        className,
        children,
        component,
        size = 'md',
        weight,
        transform,
        style,
        color,
        align,
        variant = 'text',
        elementRef,
        colorScheme,
        ...others
    }:  ComponentPassThrough<T, TextProps> & { elementRef?: React.ForwardedRef<U> }) {

    const theme = useTheme(colorScheme);

    const classes = useStyles(colorScheme, {
        variant,
        color,
        size,
        theme
    });

    return React.createElement(
        component || TextElementType,
        {
            className: cx(classes.text, className),
            style: {fontWeight: weight, textTransform: transform, textAlign: align, ...style},
            ref: elementRef,
            ...others,
        },
        children
    );
}