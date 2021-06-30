import {Paper} from "../../../components/Paper";
import {Title} from "../../../components/Title";
import {Text} from "../../../components/Text";
import {Loader} from "../../../components/Loader";
import React from "react";

export function HomePage() {
    return (
        <div>
            <Title order={1}>
                Привет, PyMba86
            </Title>
            <Text color={'gray'}>
                Вот некоторые сведения, которые мы собрали о вашем бюджете
            </Text>
            <Paper shadow={'xs'} padding={'md'} style={{marginTop: 12, display: 'flex', justifyContent: 'center'}}>
                <Loader size={"xs"}/>
            </Paper>
        </div>
    )
}