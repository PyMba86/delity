import useStyles from './AppHeader.styles';
import {Burger} from "../Burger";

interface AppHeaderProps {
    navbarOpened: boolean;
    toggleNavbar: () => void;
}

export function AppHeader({navbarOpened, toggleNavbar}: AppHeaderProps) {

    const classes = useStyles();

    const burgerTitle = navbarOpened ? 'Hide navigation' : 'Open navigation';

    return (
        <div className={classes.header}>
            <div className={classes.mainSection}>
                <Burger opened={navbarOpened}
                        className={classes.burger}
                        size={'sm'}
                        onClick={toggleNavbar}
                        title={burgerTitle}
                        aria-label={burgerTitle}/>

                <div className={classes.logoWrapper}>
                    <div className={classes.logo}>
                        delity
                    </div>
                </div>
            </div>
        </div>
    )
}