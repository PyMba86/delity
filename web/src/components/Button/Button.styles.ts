import {createMemoStyles, DelityNumberSize, DelitySize, DelityTheme} from "../../theme";
import {CSSProperties} from "react";
import {getFocusStyles} from "../../utils/theme";
import {getFontStyles} from "../../utils/theme/getFontStyles";
import {DelityColorKeys} from "../../theme/colors";
import {getSizeValue} from "../../utils/theme/getSizeValue";
import {getThemeColor} from "../../utils/theme/getThemeColor";
import {hexToRgba} from "../../utils/theme/hexToRgba";

interface ButtonStylesProps {
    color?: DelityColorKeys;
    size: DelitySize;
    radius: DelityNumberSize;
    theme: DelityTheme;
    fullWidth: boolean;
}

const sizes = {
    xs: {
        fontSize: 10,
        height: 22,
        padding: [0, 11],
    },

    sm: {
        fontSize: 11,
        height: 26,
        padding: [0, 13],
    },

    md: {
        fontSize: 13,
        height: 30,
        padding: [0, 15],
    },

    lg: {
        fontSize: 14,
        height: 36,
        padding: [0, 18],
    },

    xl: {
        fontSize: 16,
        height: 44,
        padding: [0, 22],
    },
};

const getWidthStyles = (fullWidth: boolean): CSSProperties => ({
    display: fullWidth ? 'block' : 'inline-block',
    width: fullWidth ? '100%' : 'auto'
})

export default createMemoStyles(
    {
        icon: {
            display: 'flex',
            alignItems: 'center'
        },

        leftIcon: {
            marginRight: 10
        },

        rightIcon: {
            marginLeft: 10
        },

        inner: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%'
        },

        label: {
            display: 'block',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis'
        },

        shared: ({size, theme, fullWidth}: ButtonStylesProps) => ({
            ...sizes[size],
            ...getFontStyles(theme),
            ...getFocusStyles(theme),
            ...getWidthStyles(fullWidth),
            WebkitTapHighlightColor: 'transparent',
            userSelect: 'none',
            boxSizing: 'border-box',
            textDecoration: 'none',
            cursor: 'pointer',
            appearance: 'none',
            WebkitAppearance: 'none'
        }),

        outline: ({ color, radius, theme }: ButtonStylesProps) => ({
            backgroundColor: 'transparent',
            borderRadius: getSizeValue({ size: radius, sizes: theme.radius }),
            fontWeight: 'bold',
            color: getThemeColor({ theme, color, shade: theme.colorScheme === 'dark' ? 4 : 8 }),
            border: `1px solid ${hexToRgba(
                getThemeColor({ theme, color, shade: theme.colorScheme === 'dark' ? 3 : 4 }),
                theme.colorScheme === 'dark' ? 0.45 : 1
            )}`,

            '&:not(:disabled):active': {
                transform: 'translateY(1px)',
            },

            '&:disabled': {
                borderColor: 'transparent',
                backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[2],
                color: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[5],
                cursor: 'not-allowed',
            },
        }),

        light: ({ color, size, radius, theme }: ButtonStylesProps) => ({
            border: '1px solid transparent',
            borderRadius: getSizeValue({ size: radius, sizes: theme.radius }),
            fontWeight: 'bold',
            backgroundColor: hexToRgba(
                getThemeColor({ theme, color, shade: theme.colorScheme === 'dark' ? 9 : 0 }),
                theme.colorScheme === 'dark' ? 0.3 : 1
            ),
            color: getThemeColor({ theme, color, shade: theme.colorScheme === 'dark' ? 3 : 9 }),

            '& $inner': {
                height: sizes[size].height - 2,
            },

            '&:hover': {
                backgroundColor: hexToRgba(
                    getThemeColor({ theme, color, shade: theme.colorScheme === 'dark' ? 8 : 1 }),
                    theme.colorScheme === 'dark' ? 0.35 : 1
                ),
            },

            '&:not(:disabled):active': {
                transform: 'translateY(1px)',
            },

            '&:disabled': {
                borderColor: 'transparent',
                backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[2],
                color: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[5],
                textShadow: 'none',
                cursor: 'not-allowed',
            },
        }),

        filled: ({color, size, radius, theme}: ButtonStylesProps) => ({
            border: '1px solid transparent',
            borderRadius: getSizeValue({size: radius, sizes: theme.radius}),
            fontWeight: 'bold',
            backgroundColor: hexToRgba(
                getThemeColor({theme, color, shade: 7}),
                theme.colorScheme === 'dark' ? 0.65 : 1
            ),
            textShadow: theme.colorScheme === 'dark'
                ? 'none'
                : `1px 1px 0 ${getThemeColor({theme, color, shade: 8})}`,

            color: theme.white,

            '& $inner': {
                height: sizes[size].height - 2
            },

            '&:hover': {
                backgroundColor: hexToRgba(
                    getThemeColor({ theme, color, shade: 8 }),
                    theme.colorScheme === 'dark' ? 0.95 : 1
                ),
            },

            '&:not(:disabled):active': {
                transform: 'translateY(1px)',
            },

            '&:disabled': {
                borderColor: 'transparent',
                backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[2],
                color: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[5],
                textShadow: 'none',
                cursor: 'not-allowed',
            },
        }),

        link: ({color, radius, theme}: ButtonStylesProps) => ({
            padding: 0,
            borderRadius: getSizeValue({size: radius, sizes: theme.radius}),
            backgroundColor: 'transparent',
            border: 0,
            display: 'inline-block',
            color: getThemeColor({
                theme, color, shade: theme.colorScheme === 'dark' ? 6 : 4
            }),
            cursor: 'pointer',
            lineHeight: theme.lineHeight,

            '&:hover': {
                textDecoration: 'underline'
            },

            '&:disabled': {
                color: theme.colors.gray[5],
                cursor: 'not-allowed',

                '&:hover': {
                    textDecoration: 'none'
                }
            }
        })
    }
)