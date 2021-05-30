import {createContext} from "react";
import {createTheming} from "react-jss";
import {DelityColorScheme, DelityTheme} from "./types";
import {mergeColorScheme} from "../utils/theme/scheme";

const ThemeContext = createContext({});

export const theming = createTheming(ThemeContext);

export const {ThemeProvider, useTheme: useTheming} = theming;

export function useTheme(colorScheme?: DelityColorScheme): DelityTheme {
    return mergeColorScheme(
        {...useTheming<DelityTheme>()}, colorScheme);
}