import {DelityColorScheme, DelityTheme} from "../../theme";

export function mergeColorScheme(
    currentTheme: DelityTheme,
    colorScheme?: DelityColorScheme
): DelityTheme {

    return colorScheme ? {...currentTheme, colorScheme} : currentTheme;
}