import {createMemoStyles, Theme, ThemeNumberSize} from "../../theme";
import React from "react";
import {ThemeColorKeys} from "../../theme/colors";
import {getThemeColor} from "../../utils/theme/getThemeColor";
import {getSizeValue} from "../../utils/theme/getSizeValue";

interface DividerStylesProps {
    theme: Theme;
    size: ThemeNumberSize;
    margins: ThemeNumberSize;
    variant: React.CSSProperties['borderTopStyle'];
    color?: ThemeColorKeys;
}

export const sizes = {
    xs: 1,
    sm: 2,
    md: 3,
    lg: 4,
    xl: 5,
};

export default createMemoStyles({
    withLabel: {
        borderTop: '0',
    },

    left: {
        '&::before': {
            display: 'none',
        },
    },

    right: {
        '&::after': {
            display: 'none',
        },
    },
    center: {

    },

    label: ({ theme, color, variant }: DividerStylesProps) => ({
        display: 'flex',
        alignItems: 'center',
        color: color === 'dark' ? theme.colors.dark[1] : getThemeColor({ theme, color, shade: 6 }),

        '&::before': {
            content: '""',
            flex: 1,
            height: 1,
            borderTop: `1px ${variant} ${getThemeColor({
                theme,
                color,
                shade: theme.colorScheme === 'dark' ? 3 : 4,
            })}`,
            marginRight: theme.spacing.xs,
        },

        '&::after': {
            content: '""',
            flex: 1,
            borderTop: `1px ${variant} ${getThemeColor({
                theme,
                color,
                shade: theme.colorScheme === 'dark' ? 3 : 4,
            })}`,
            marginLeft: theme.spacing.xs,
        },
    }),

    horizontal: ({ theme, size, variant, color, margins }: DividerStylesProps) => ({
        border: 0,
        borderTopWidth: getSizeValue({ size, sizes }),
        borderTopColor: getThemeColor({ theme, color, shade: theme.colorScheme === 'dark' ? 3 : 4 }),
        borderTopStyle: variant,
        margin: 0,
        marginTop: getSizeValue({ size: margins, sizes: theme.spacing }),
        marginBottom: getSizeValue({ size: margins, sizes: theme.spacing }),
    }),

    vertical: ({ theme, size, variant, color, margins }: DividerStylesProps) => ({
        border: 0,
        borderLeftWidth: getSizeValue({ size, sizes }),
        borderLeftColor: getThemeColor({ theme, color, shade: 4 }),
        borderLeftStyle: variant,
        marginLeft: getSizeValue({ size: margins, sizes: theme.spacing }),
        marginRight: getSizeValue({ size: margins, sizes: theme.spacing }),
    }),
});