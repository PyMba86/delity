import {CommonProps, ThemeNumberSize, useTheme} from "../../theme";
import React from "react";
import {ThemeColorKeys} from "../../theme/colors";
import useStyles from './Burger.styles';
import cx from "clsx";
import {useReducedMotion} from "../../hooks/useReducedMotion";

export interface BurgerProps extends CommonProps, React.ComponentPropsWithoutRef<'button'> {
    /** Burger state: true for cross, false for burger */
    opened: boolean;

    /** Burger color from theme */
    color?: ThemeColorKeys;

    /** Predefined burger size or number to set width and height in px */
    size?: ThemeNumberSize;

    /** Get element ref */
    elementRef?: React.ForwardedRef<HTMLButtonElement>;
}

export function Burger(
    {
        className,
        opened,
        color = 'gray',
        size = 'md',
        colorScheme,
        elementRef,
        ...others
    }: BurgerProps) {

    const theme = useTheme(colorScheme);

    const classes = useStyles(colorScheme, {
        color,
        size,
        theme,
        reduceMotion: useReducedMotion()
    });

    return (
        <button type="button"
                className={cx(classes.wrapper, className)}
                ref={elementRef} {...others}>
            <div className={cx(classes.burger, {[classes.opened]: opened})}/>
        </button>
    );
}