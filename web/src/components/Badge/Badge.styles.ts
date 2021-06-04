import {createMemoStyles, DelityNumberSize, DelitySize, DelityTheme} from "../../theme";
import {DelityColorKeys} from "../../theme/colors";
import {getFocusStyles} from "../../utils/theme";
import {getFontStyles} from "../../utils/theme/getFontStyles";
import {getSizeValue} from "../../utils/theme/getSizeValue";
import {hexToRgba} from "../../utils/theme/hexToRgba";
import {getThemeColor} from "../../utils/theme/getThemeColor";


interface BadgeStylesProps {
    color?: DelityColorKeys;
    theme: DelityTheme;
    size: DelitySize;
    radius: DelityNumberSize;
    fullWidth: boolean;
}

const sizes = {
    xs: {
        fontSize: 9,
        height: 16,
    },
    sm: {
        fontSize: 10,
        height: 18,
    },
    md: {
        fontSize: 11,
        height: 20,
    },
    lg: {
        fontSize: 13,
        height: 26,
    },
    xl: {
        fontSize: 16,
        height: 32,
    },
};

const dotSizes = {
    xs: 4,
    sm: 4,
    md: 6,
    lg: 8,
    xl: 10,
};

export default createMemoStyles({
    leftSection: ({theme}: BadgeStylesProps) => ({
        marginRight: theme.spacing.xs / 2,
    }),

    rightSection: ({theme}: BadgeStylesProps) => ({
        marginLeft: theme.spacing.xs / 2
    }),

    inner: {
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis'
    },

    badge: ({theme, size, fullWidth, radius}) => {
        const {fontSize, height} = size in sizes ? sizes[size] : sizes.md;

        return {
            ...getFocusStyles(theme),
            ...getFontStyles(theme),
            fontSize,
            height,
            WebkitTapHighlightColor: 'transparent',
            lineHeight: `${height - 2}px`,
            border: '1px solid transparent',
            textDecoration: 'none',
            padding: [0, getSizeValue(
                {size, sizes: theme.spacing}) / 1.5],
            boxSizing: 'border-box',
            display: fullWidth ? 'flex' : 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: fullWidth ? '100' : 'auto',
            borderRadius: getSizeValue(
                {size: radius, sizes: theme.radius}),
            fontWeight: 700,
            letterSpacing: 0.25,
            cursor: 'default',
            textOverflow: 'ellipsis',
            overflow: 'hidden'
        }
    },

    light: ({theme, color}: BadgeStylesProps) => ({
        backgroundColor: hexToRgba(
            getThemeColor(
                {theme, color, shade: theme.colorScheme === 'dark' ? 9 : 0}),
            theme.colorScheme === 'dark' ? 0.3 : 1
        ),
        color: getThemeColor(
            {theme, color, shade: theme.colorScheme === 'dark' ? 3 : 9})
    }),

    filled: ({theme, color}: BadgeStylesProps) => ({
        backgroundColor: hexToRgba(
            getThemeColor({theme, color, shade: 7}),
            theme.colorScheme === 'dark' ? 0.65 : 1
        ),
        color: theme.white
    }),

    outline: ({theme, color}: BadgeStylesProps) => ({
        backgroundColor: 'transparent',
        color: getThemeColor(
            {theme, color, shade: theme.colorScheme === 'dark' ? 3: 8}),
        borderColor: hexToRgba(
            getThemeColor(
                { theme, color, shade: theme.colorScheme === 'dark' ? 3 : 8 }),
            0.55
        ),
    }),

    dot: ({ theme, color, size }: BadgeStylesProps) => {
        const dotSize = getSizeValue({ size, sizes: dotSizes });

        return {
            backgroundColor: 'transparent',
            color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[7],
            borderColor: theme.colorScheme === 'dark' ? theme.colors.dark[3] : theme.colors.gray[3],
            paddingLeft: getSizeValue(
                { size, sizes: theme.spacing }) / 1.5 - dotSize / 2,

            '&::before': {
                content: '""',
                display: 'block',
                width: dotSize,
                height: dotSize,
                borderRadius: dotSize,
                backgroundColor: getThemeColor(
                    { theme, color, shade: theme.colorScheme === 'dark' ? 4 : 6 }),
                marginRight: dotSize,
            },
        };
    },
})