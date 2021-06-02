import {CommonProps, DelityNumberSize, useTheme} from "../../theme";
import React, {Children} from "react";
import {getSizeValue} from "../../utils/theme/getSizeValue";

export interface GridProps extends CommonProps, React.ComponentPropsWithoutRef<'div'> {
    /** Col components only */
    children: React.ReactNode;

    /** Spacing between columns */
    gutter?: DelityNumberSize;

    /** Should columns in the last row take 100% */
    grow?: boolean;

    /** Set grid justify-content property */
    justify?: React.CSSProperties['justifyContent'];

    /** Set grid align-content property */
    align?: React.CSSProperties['alignContent'];

    /** Amount of columns in each row */
    columns?: number;
}

export function Grid(
    {
        colorScheme,
        gutter = 'md',
        children,
        grow = false,
        justify = 'flex-start',
        align = 'stretch',
        style,
        columns = 12,
        ...props
    }: GridProps) {

    const theme = useTheme(colorScheme);

    const spacing = getSizeValue({size: gutter, sizes: theme.spacing});

    const cols = (Children.toArray(children) as React.ReactElement[])
        .map((col, index) =>
            React.cloneElement(col, {gutter, grow, columns, key: index}))

    return (
        <div
            style={{
                margin: -spacing / 2,
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: justify,
                alignItems: align,
                ...style,
            }}
            {...props}
        >
            {cols}
        </div>
    );
}