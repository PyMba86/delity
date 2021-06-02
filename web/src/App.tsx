import React, {useState} from 'react';
import {DelityColorScheme, ThemeProvider, useTheme} from "./theme";
import {Button} from "./components/Button";
import {Avatar} from "./components/Avatar";
import {Text} from "./components/Text";
import {Title} from "./components/Title";
import {Col, Grid} from "./components/Grid";
import {createUseStyles, JssProvider} from "react-jss";
import {create} from 'jss';
import preset from 'jss-preset-default';

const jss = create(preset());

const useStyles = createUseStyles({
    '@global': {
        body: {
            margin: 0
        }
    }
});

function App() {

    const [colorScheme, setColorScheme] =
        useState<DelityColorScheme>('light');

    const theme = useTheme(colorScheme, true);

    useStyles();

    return (
        <JssProvider jss={jss}>
            <ThemeProvider theme={theme}>
                <div style={{
                    backgroundColor:
                        theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
                    minHeight: "100vh",
                }}>
                    <Grid gutter={0} justify={'center'} style={{padding: theme.spacing.lg}}>
                        <Col span={1}>
                            <Avatar color="red">VR</Avatar>

                        </Col>
                        <Col span={3}>
                            <Title order={1}>delity application</Title>
                            <Text weight={700}>Light and fast management</Text>
                        </Col>
                        <Col span={2}>
                            <Button variant={'light'} style={{marginRight: 10}}
                                    onClick={() => setColorScheme('dark')}>
                                Сохранить
                            </Button>
                            <Button variant={'filled'} color={'red'}
                                    onClick={() => setColorScheme('light')}>
                                Удалить
                            </Button>
                        </Col>
                    </Grid>
                </div>
            </ThemeProvider>
        </JssProvider>
    );
}

export default App;
