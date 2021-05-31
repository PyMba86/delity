import React, {useState} from 'react';
import {DelityColorScheme, ThemeProvider, useTheme} from "./theme";
import {Button} from "./components/Button/Button";

function App() {

    const [colorScheme, setColorScheme] =
        useState<DelityColorScheme>('light');

    const theme = useTheme(colorScheme, true);

    return (
        <ThemeProvider theme={theme}>
            <div className="App">
                <header className="App-header">
                    <Button variant={'light'} style={{marginRight: 10}}>
                        Сохранить
                    </Button>
                    <Button variant={'filled'} color={'red'}>
                        Удалить
                    </Button>
                </header>
            </div>
        </ThemeProvider>
    );
}

export default App;
