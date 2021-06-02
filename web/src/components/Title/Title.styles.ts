import {createMemoStyles, DelityTheme} from "../../theme";
import {getFontStyles} from "../../utils/theme/getFontStyles";

export type HeadingElement = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

interface TitleStylesProps {
    theme: DelityTheme;
    element: HeadingElement;
}

export default createMemoStyles({
    title: ({theme, element}: TitleStylesProps) => ({
        ...getFontStyles(theme),
        fontFamily: theme.headings.fontFamily,
        fontWeight: theme.headings.fontWeight,
        fontSize: theme.headings.sizes[element].fontSize,
        lineHeight: theme.headings.sizes[element].lineHeight,
        margin: 0,
        color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black
    })
})