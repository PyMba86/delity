import {DelityColorScheme, DelityTheme} from "../../theme/types";


export function mergeColorScheme(
    currentTheme: DelityTheme,
    colorScheme?: DelityColorScheme
): DelityTheme {

    return colorScheme ? {...currentTheme, colorScheme} : currentTheme;
}