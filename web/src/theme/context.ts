import {createContext} from "react";
import {createTheming} from "react-jss";
import {DelityColorScheme, DelityTheme} from "./types";
import {mergeColorScheme} from "../utils/theme/mergeColorScheme";
import {theme} from "./theme";

const ThemeContext = createContext({});

export const theming = createTheming(ThemeContext);

export const {ThemeProvider, useTheme: useTheming} = theming;

export function useTheme(colorScheme?: DelityColorScheme, boot?: boolean): DelityTheme {

    const internalTheme = {...useTheming<DelityTheme>()};

    return mergeColorScheme(
        boot ? theme : internalTheme, colorScheme);
}