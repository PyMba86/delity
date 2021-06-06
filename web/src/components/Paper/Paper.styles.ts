import {createMemoStyles, ThemeNumberSize, ThemeSize, Theme} from "../../theme";
import {getSizeValue} from "../../utils/theme/getSizeValue";


interface PaperStylesProps {
    theme: Theme;
    radius: ThemeNumberSize;
    shadow?: ThemeSize;
    padding: ThemeNumberSize;
}

export default createMemoStyles({
    paper: ({theme, radius, shadow, padding}: PaperStylesProps) => ({
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
        boxSizing: 'border-box',
        borderRadius: getSizeValue({size: radius, sizes: theme.radius}),
        boxShadow: shadow ? theme.shadows[shadow] : 'none',
        padding: getSizeValue({size: padding, sizes: theme.spacing})
    })
})