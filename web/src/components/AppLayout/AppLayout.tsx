import React, {useContext} from "react";
import {useAppState} from "../../hooks/useAppState";
import {Col, Grid} from "../Grid";
import {Avatar} from "../Avatar";
import {Paper} from "../Paper";
import {Title} from "../Title";
import {Text} from "../Text";
import {Badge} from "../Badge";
import {Button} from "../Button";
import {useTheme} from "../../theme";
import {AppThemeContext} from "../AppTheme";

interface AppLayoutProps {
    children?: React.ReactNode;
}

export function AppLayout(
    {
        children
    }: AppLayoutProps) {

    const [appState, dispatchAppState] = useAppState();

    const {colorScheme, setColorScheme} = useContext(AppThemeContext);

    const theme = useTheme(colorScheme);

    return (

        <div style={{
            backgroundColor:
                theme.colorScheme === "dark" ? theme.colors.dark[8] : theme.colors.gray[0],
            minHeight: "100vh",
            padding: theme.spacing.lg
        }}>
            <Grid justify={'center'} style={{padding: theme.spacing.lg}}>
                <Col span={1}>
                    <Avatar color="red">DT</Avatar>
                </Col>
                <Col span={3}>
                    <Paper padding={"md"} shadow="xs">
                        <Title order={1}>delity application</Title>
                        <Text>Light and fast management</Text>
                        <Badge color={'indigo'} size={'lg'} variant={'dot'}>Payments</Badge>
                        {children}
                    </Paper>
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
    )
}