import {CommonProps, ThemeSize, useTheme} from "../../theme";
import React from "react";
import {ThemeColorKeys} from "../../theme/colors";
import {Paper} from "../Paper";
import cx from "clsx";
import {Text} from "../Text";
import useStyles from './Alert.styles';

export interface AlertProps extends CommonProps,
    Omit<React.ComponentPropsWithoutRef<'div'>, 'title'> {

    /** Optional alert title */
    title?: React.ReactNode;

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
        title,
        children,
        color,
        shadow = 'sm',
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

            {title && (
                <Text colorScheme={colorScheme}
                      weight={700}
                      className={classes.label}>
                    {title}
                </Text>
            )}

            <div className={classes.body}>
                {children}
            </div>

        </Paper>
    )
}