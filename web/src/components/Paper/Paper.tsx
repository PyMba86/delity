import {CommonProps, ThemeNumberSize, ThemeSize, useTheme} from "../../theme";
import React from "react";
import useStyles from './Paper.styles';
import cx from "clsx";

export interface PaperProps extends CommonProps, React.ComponentPropsWithoutRef<'div'> {
    /** Padding value */
    padding?: ThemeNumberSize;

    /** box-shadow */
    shadow?: ThemeSize;

    /** border-radius */
    radius?: ThemeNumberSize;

    /** element ref */
    elementRef?: React.ForwardedRef<HTMLDivElement>;
}

export function Paper(
    {
        className,
        children,
        padding = 0,
        radius = 'sm',
        shadow,
        colorScheme,
        elementRef,
        ...props
    }: PaperProps) {

    const theme = useTheme(colorScheme);

    const classes = useStyles(colorScheme, {
        radius,
        shadow,
        padding,
        theme
    });

    return (
        <div className={cx(classes.paper, className)} ref={elementRef} {...props}>
            {children}
        </div>
    )

}