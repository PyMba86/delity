import {CommonProps, DelityNumberSize, DelitySize, useTheme} from "../../theme";
import React from "react";
import useStyles from './Paper.styles';
import cx from "clsx";

export interface PaperProps extends CommonProps, React.ComponentPropsWithoutRef<'div'> {
    /** Padding value */
    padding?: DelityNumberSize;

    /** box-shadow */
    shadow?: DelitySize;

    /** border-radius */
    radius?: DelityNumberSize;

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