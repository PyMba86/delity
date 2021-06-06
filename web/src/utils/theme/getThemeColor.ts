import {Theme} from "../../theme";
import {ThemeColorKeys} from "../../theme/colors";

export function getThemeColor(
    {
        theme,
        color,
        shade
    }: {
        theme: Theme;
        color?: ThemeColorKeys;
        shade: number;
    }) {
    return color ? theme.colors[color][shade] : theme.colors[theme.primary][shade];
}