import {ThemeColorScheme, Theme} from "../../theme";

export function mergeColorScheme(
    currentTheme: Theme,
    colorScheme?: ThemeColorScheme
): Theme {

    return colorScheme ? {...currentTheme, colorScheme} : currentTheme;
}