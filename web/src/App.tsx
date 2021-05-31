import React, {useState} from 'react';
import {DelityColorScheme, ThemeProvider, useTheme} from "./theme";
import {Button} from "./components/Button/Button";

function App() {

    const [colorScheme, setColorScheme] =
        useState<DelityColorScheme>('light');

    const theme = useTheme(colorScheme, true);

    return (
        <ThemeProvider theme={theme}>
            <div style={{
                backgroundColor:
                    theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
                minHeight: "100vh",
                padding: theme.spacing.lg
            }}>
                <Button variant={'light'} style={{marginRight: 10}}
                        onClick={() => setColorScheme('dark')}>
                    Сохранить
                </Button>
                <Button variant={'filled'} color={'red'}
                        onClick={() => setColorScheme('light')}>
                    Удалить
                </Button>
            </div>
        </ThemeProvider>
    );
}

export default App;
