import {createMemoStyles, Theme, ThemeNumberSize} from "../../theme";
import {ThemeColorKeys} from "../../theme/colors";
import {getSizeValue} from "../../utils/theme/getSizeValue";
import {getThemeColor} from "../../utils/theme/getThemeColor";

export const sizes = {
    xs: 3,
    sm: 5,
    md: 8,
    lg: 12,
    xl: 16
};

interface ProgressStylesProps {
    theme: Theme;
    color?: ThemeColorKeys;
    radius: ThemeNumberSize;
    reduceMotion: boolean;
    size: ThemeNumberSize;
}

export default createMemoStyles({
    progress: ({radius, size, theme}: ProgressStylesProps) => ({
        height: getSizeValue({size, sizes}),
        backgroundColor: theme.colorScheme === 'dark'
            ? theme.colors.dark[4] : theme.colors.gray[2],
        borderRadius: getSizeValue({size: radius, sizes: theme.radius}),
        overflow: 'hidden'
    }),

    bar: ({theme, color, radius, reduceMotion}: ProgressStylesProps) => ({
        height: '100%',
        backgroundColor: getThemeColor({
            theme, color, shade: theme.colorScheme === 'dark' ? 4 : 6}),
        borderRadius: getSizeValue({size: radius, sizes: theme.radius}),
        transition: reduceMotion ? 'none' : `width 200ms ${theme.transitionTimingFunction}`,
        backgroundSize: [theme.spacing.md, theme.spacing.md]
    })
})