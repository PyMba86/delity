import {Burger} from "../Burger";
import {AppSearch} from "../AppSearch/AppSearch";
import {ThemeIcon} from "../ThemeIcon";
import {Container} from "../Container";
import {Text} from "../Text";
import {FramerIcon} from "../../icons/FramerIcon";
import {Avatar} from "../Avatar";
import {ActionIcon} from "../ActionIcon";
import useStyles from './AppHeader.styles';
import {BellIcon} from "../../icons/BellIcon";
import {SunIcon} from "../../icons/SunIcon";
import {EditIcon} from "../../icons/EditIcon";
import {CopyIcon} from "../../icons/CopyIcon";
import {useAppTheme} from "../../hooks/useAppTheme";

interface AppHeaderProps {
    navbarOpened: boolean;
    toggleNavbar: () => void;
}

export function AppHeader({navbarOpened, toggleNavbar}: AppHeaderProps) {

    const classes = useStyles();

    const {colorScheme, setColorScheme} = useAppTheme();

    const burgerTitle = navbarOpened ? 'Hide navigation' : 'Open navigation';

    return (
        <div className={classes.header}>
            <Container size={'lg'} className={classes.container}>
                <div className={classes.logoSection}>
                    <Burger opened={navbarOpened}
                            className={classes.burger}
                            size={'sm'}
                            onClick={toggleNavbar}
                            title={burgerTitle}
                            aria-label={burgerTitle}/>

                    <div className={classes.logoWrapper}>
                        <div className={classes.logo}>
                            <ThemeIcon radius="xl" size="xl">
                                <FramerIcon/>
                            </ThemeIcon>
                        </div>
                        <div className={classes.title}>
                            <Text weight={700} >Мой бюджет</Text>
                            <Text weight={600} color={'gray'} size={'xs'}>RUB</Text>
                        </div>
                    </div>
                </div>
                <div className={classes.mainSection}>
                    <ActionIcon size={'lg'}
                                className={classes.item}>
                        <EditIcon/>
                    </ActionIcon>
                    <ActionIcon size={'lg'}
                                className={classes.item}>
                        <CopyIcon/>
                    </ActionIcon>
                    <AppSearch className={classes.item}/>
                    <ActionIcon size={'lg'}
                                color={colorScheme === 'dark' ? 'yellow' : 'blue'}
                                className={classes.item}
                                onClick={() => setColorScheme(
                                    colorScheme === 'dark' ? 'light' : 'dark')}>
                        <SunIcon/>
                    </ActionIcon>
                    <ActionIcon size={'lg'}
                                className={classes.item}>
                        <BellIcon/>
                    </ActionIcon>
                    <Avatar radius={'xl'} color={'teal'}/>
                </div>
            </Container>
        </div>
    )
}