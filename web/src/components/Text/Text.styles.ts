import {createMemoStyles, ThemeSize, Theme} from "../../theme";
import {ThemeColorKeys} from "../../theme/colors";
import {getFocusStyles} from "../../utils/theme";
import {getFontStyles} from "../../utils/theme/getFontStyles";

export type TextVariant = 'text' | 'link';

interface TextStylesProps {
    theme: Theme;
    color?: ThemeColorKeys;
    variant: TextVariant;
    size: ThemeSize;
}

export default createMemoStyles({
    text: ({theme, color, variant, size}: TextStylesProps) => ({
        ...getFontStyles(theme),
        ...getFocusStyles(theme),
        color:
            color
                ? theme.colors[color][theme.colorScheme === 'dark' ? 4 : 6]
                : variant === 'link'
                ? theme.colors[theme.primary][theme.colorScheme === 'dark' ? 4 : 6]
                : theme.colorScheme === 'dark'
                    ? theme.colors.dark[0]
                    : theme.black,
        fontSize: theme.fontSizes[size],
        lineHeight: theme.lineHeight,
        textDecoration: 'none',
        WebkitTapHighlightColor: 'transparent',

        '&:hover': {
            textDecoration: variant === 'link' ? 'underline' : 'none',
        },
    }),
})