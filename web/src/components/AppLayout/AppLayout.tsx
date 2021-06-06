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
import useStyles from "./AppLayout.styles";

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

    const classes = useStyles();

    return (
        <div className={classes.root}>
            <div className={classes.sidebar}/>
            <div className={classes.mainPanel}>
                <div className={classes.mainPanelContent}>

                    <Grid justify={'center'}>
                        <Col span={2}>
                            <Avatar color="red">DT</Avatar>
                        </Col>
                        <Col span={10}>
                            <Button variant={'light'} style={{marginRight: 10}}
                                    onClick={() => setColorScheme('dark')}>
                                Сохранить
                            </Button>
                            <Button variant={'filled'} color={'red'}
                                    onClick={() => setColorScheme('light')}>
                                Удалить
                            </Button>
                        </Col>
                        <Col span={12}>
                            <Paper padding={"md"} shadow="xs">
                                <Title order={1}>delity application</Title>
                                <Text>Light and fast management</Text>
                                <Badge color={'indigo'} size={'lg'} variant={'dot'}>Payments</Badge>
                                {children}
                            </Paper>
                        </Col>
                    </Grid>
                </div>
            </div>

        </div>
    )
}