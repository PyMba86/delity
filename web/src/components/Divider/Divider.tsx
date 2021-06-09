import {CommonProps, ThemeNumberSize, useTheme} from "../../theme";
import React from "react";
import {ThemeColorKeys} from "../../theme/colors";
import useStyles from './Divider.styles';
import cx from "clsx";
import {Text} from "../Text";

export interface DividerProps extends CommonProps, React.ComponentPropsWithoutRef<'hr'> {
    /** Line color from theme */
    color?: ThemeColorKeys;

    /** Line orientation */
    orientation?: 'horizontal' | 'vertical';

    /** Sets height in horizontal orientation */
    size?: ThemeNumberSize;

    /** Adds text after line in horizontal orientation */
    label?: React.ReactNode;

    /** Label position */
    labelPosition?: 'left' | 'center' | 'right';

    /** border style */
    variant?: 'solid' | 'dashed' | 'dotted';

    /** Top and bottom margins for horizontal variant */
    margins?: ThemeNumberSize;
}

export function Divider(
    {
        colorScheme,
        color,
        className,
        orientation = 'horizontal',
        size = 'xs',
        label,
        labelPosition = 'left',
        variant = 'solid',
        margins = 0,
        ...props
    }: DividerProps) {

    const theme = useTheme(colorScheme);

    const classes = useStyles(colorScheme, {
        color,
        margins,
        size,
        variant,
        theme
    });

    return (
        <div className={cx({
            [classes.vertical]: orientation === 'vertical',
            [classes.horizontal]: orientation === 'horizontal',
            [classes.withLabel]: !!label && orientation === 'horizontal'
        }, className)} {...props}>
            {!!label && orientation === 'horizontal' && (
                <Text color={color} size={'xs'} style={{marginTop: 2}}
                      className={cx(classes.label, classes[labelPosition])}>
                    {label}
                </Text>
            )}
        </div>
    )
}