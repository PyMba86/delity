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

    const primaryShades = theme.colors[theme.primary];

    return color ? theme.colors[color][shade] : primaryShades[shade];
}