import {createContext} from "react";
import {createTheming} from "react-jss";
import {Theme, ThemeColorScheme} from "./types";
import {mergeColorScheme} from "../utils/theme/mergeColorScheme";
import {defaultTheme} from "./theme";

const ThemeContext = createContext<Theme>(defaultTheme);

export const theming = createTheming<Theme>(ThemeContext);

export const {ThemeProvider, useTheme: useTheming} = theming;

export function useTheme(colorScheme?: ThemeColorScheme, theme?: Theme): Theme {

    const internalTheme = {...useTheming<Theme>()};

    return mergeColorScheme(
        theme ? theme : internalTheme, colorScheme);
}