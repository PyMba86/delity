import {CommonProps, ThemeNumberSize, useTheme} from "../../theme";
import React from "react";
import {getSizeValue} from "../../utils/theme/getSizeValue";

export function isValidSpan(span: number) {
    return span > 0 && span % 1 === 0;
}

export interface ColProps extends CommonProps, React.ComponentPropsWithoutRef<'div'> {
    span: number;
    columns?: number;
    offset?: number;
    gutter?: ThemeNumberSize;
    grow?: boolean;
}

export function Col(
    {
        colorScheme,
        children,
        span,
        gutter = 'md',
        offset = 0,
        grow,
        style,
        columns = 12,
        ...props
    }: ColProps) {

    const theme = useTheme(colorScheme);

    const spacing = getSizeValue({size: gutter, sizes: theme.spacing});

    if (!isValidSpan(span) || span > columns) {
        return null;
    }

    const styles: React.CSSProperties = {
        ...style,
        boxSizing: 'border-box',
        flex: `${grow ? '1' : '0'} 0 calc(${100 / (columns / span)}% - ${spacing}px)`,
        margin: spacing / 2
    };

    if (isValidSpan(offset)) {
        styles.marginLeft = `calc(${100 / (columns / offset)}% + ${spacing / 2}px)`;
    }

    return (
        <div style={styles} {...props}>
            {children}
        </div>
    )
}
