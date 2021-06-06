import React, {createContext} from "react";
import {defaultTheme, ThemeProvider, useTheme} from "../../theme";
import {useLocalStorageValue} from "../../hooks/useLocalStorageValue";
import {AppTheme} from "./AppTheme";

export type AppColorScheme = 'light' | 'dark';

interface AppThemeContextProps {
    colorScheme: AppColorScheme;
    setColorScheme: (colorScheme: AppColorScheme) => void;
}

export const AppThemeContext = createContext<AppThemeContextProps>({
    colorScheme: 'light',
    setColorScheme: () => undefined
})

interface AppThemeProviderProps {
    children?: React.ReactNode;
}

const THEME_KEY = 'AppTheme.ColorScheme';

export const AppThemeProvider: React.FC<AppThemeProviderProps> = (
    {
        children
    }) => {

    const [colorScheme, setColorScheme]
        = useLocalStorageValue<AppColorScheme>(THEME_KEY, 'light');

    const theme = useTheme(colorScheme, defaultTheme);

    return (
        <AppThemeContext.Provider value={{colorScheme, setColorScheme}}>
            <ThemeProvider theme={theme}>
                <AppTheme>
                    {children}
                </AppTheme>
            </ThemeProvider>
        </AppThemeContext.Provider>
    )
}