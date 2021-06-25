import React from "react";
import useStyles from './FormSpacer.styles';
import {CommonProps, ThemeSize, useTheme} from "../../theme";
import cx from "clsx";

interface FormSpacerProps extends CommonProps {
    children?: React.ReactNode;
    size?: ThemeSize;
}

export function FormSpacer(
    {
        children,
        size = 'md',
        colorScheme,
        className
    }: FormSpacerProps) {

    const theme = useTheme(colorScheme);

    const classes = useStyles(colorScheme, {
        theme,
        size
    });

    return (
        <div className={cx(classes.spacer, className)}>
            {children}
        </div>
    )
}