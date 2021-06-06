import {createMemoStyles, ThemeNumberSize, Theme} from "../../theme";
import {ThemeColorKeys} from "../../theme/colors";
import {getSizeValue} from "../../utils/theme/getSizeValue";
import {getFontStyles} from "../../utils/theme/getFontStyles";
import {getThemeColor} from "../../utils/theme/getThemeColor";
import {hexToRgba} from "../../utils/theme/hexToRgba";

export const sizes: Record<ThemeNumberSize, number> = {
    xs: 16,
    sm: 26,
    md: 38,
    lg: 56,
    xl: 84,
};

interface AvatarStylesProps {
    size: ThemeNumberSize;
    radius: ThemeNumberSize;
    theme: Theme;
    color: ThemeColorKeys;
}

export default createMemoStyles({
    avatar: ({size, radius, theme}: AvatarStylesProps) => ({
        boxSizing: 'border-box',
        position: 'relative',
        userSelect: 'none',
        overflow: 'hidden',
        width: getSizeValue({size, sizes}),
        height: getSizeValue({size, sizes}),
        borderRadius: radius ? getSizeValue({size: radius, sizes: theme.radius}) : size
    }),

    image: {
        objectFit: 'cover',
        width: '100%',
        height: '100%'
    },

    placeholder: ({theme, size, color}: AvatarStylesProps) => ({
        ...getFontStyles(theme),
        fontSize: sizes[size] / 2.5,
        color: getThemeColor({theme, color, shade: theme.colorScheme === 'dark' ? 0 : 6}),
        fontWeight: 700,
        backgroundColor: hexToRgba(
            getThemeColor({theme, color, shade: theme.colorScheme === 'dark' ? 8 : 1}),
            theme.colorScheme === 'dark' ? 0.5 : 1
        ),
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '100%',
        userSelect: 'none'
    }),

    placeholderIcon: ({theme, color}: AvatarStylesProps) => ({
        width: '70%',
        height: '70%',
        color: getThemeColor({theme, color, shade: theme.colorScheme === 'dark' ? 0 : 6})
    })
})