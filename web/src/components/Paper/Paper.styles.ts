import {createMemoStyles, DelityNumberSize, DelitySize, DelityTheme} from "../../theme";
import {getSizeValue} from "../../utils/theme/getSizeValue";


interface PaperStylesProps {
    theme: DelityTheme;
    radius: DelityNumberSize;
    shadow?: DelitySize;
    padding: DelityNumberSize;
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