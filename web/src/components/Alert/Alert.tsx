import {CommonProps, ThemeSize, useTheme} from "../../theme";
import React from "react";
import {ThemeColorKeys} from "../../theme/colors";
import useStyles from './Alert.styles';
import {Paper} from "../Paper";
import cx from "clsx";
import {Text} from "../Text";

export interface AlertProps extends CommonProps, React.ComponentPropsWithoutRef<'div'> {
    /** Optional alert title */
    label?: React.ReactNode;

    /** Alert message */
    children: React.ReactNode;

    /** Alert title and line colors from theme */
    color?: ThemeColorKeys;

    /** Predefined box-shadow */
    shadow?: ThemeSize;
}

export function Alert(
    {
        className,
        colorScheme,
        label,
        children,
        color,
        shadow,
        ...props
    }: AlertProps) {

    const theme = useTheme(colorScheme);

    const classes = useStyles(colorScheme, {
        color,
        theme
    });

    return (
        <Paper
            shadow={shadow}
            className={cx(classes.alert, className)}
            {...props}>

            {label && (
                <Text colorScheme={colorScheme}
                      weight={700}
                      className={classes.label}>
                    {label}
                </Text>
            )}

            <div className={classes.body}>
                {children}
            </div>

        </Paper>
    )
}