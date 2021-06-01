import {DelityTheme} from "../../theme";
import {DelityColorKeys} from "../../theme/colors";

export function getThemeColor(
    {
        theme,
        color,
        shade
    }: {
        theme: DelityTheme;
        color?: DelityColorKeys;
        shade: number;
    }) {
    return color ? theme.colors[color][shade] : theme.colors[theme.primary][shade];
}