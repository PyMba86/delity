import {Theme, theming} from "../../theme";
import {createUseStyles} from "react-jss";
import {getFocusStyles} from "../../utils/theme";

export const HEADER_HEIGHT = 60;

export default createUseStyles((theme: Theme) => ({
    header: {
        top: 0,
        left: 0,
        right: 0,
        height: HEADER_HEIGHT,
        zIndex: 6,
        position: 'fixed',
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
        borderBottom: `1px solid ${
            theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[2]
        }`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    container: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'nowrap'
    },
    logo: {
        ...getFocusStyles(theme),
        paddingRight: theme.spacing.xs,
        paddingLeft: theme.spacing.xs,
        height: HEADER_HEIGHT,
        display: 'flex',
        fontWeight: 'bold',
        alignItems: 'center',
        textDecoration: 'none',
        userSelect: 'none',
        color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    },
    logoWrapper: {
        display: 'flex',
        alignItems: 'center',
    },
    item: {
        marginRight: theme.spacing.xs,
    },
    burger: {
        display: 'none',

        [theme.breakpoints.down("sm")]: {
            display: 'block',
        },
    },
    logoSection: {
        [theme.breakpoints.down("sm")]: {
            paddingRight: theme.spacing.xs,
            paddingLeft: theme.spacing.xs,
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            position: 'relative',
        },
    },
    mainSection: {
        flex: 1,
        marginLeft: theme.spacing.xl,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        paddingRight: theme.spacing.xs,
    },
    title: {
        display: 'flex',
        flexDirection: 'column',
        flexWrap: 'nowrap',
        whiteSpace: 'nowrap'
    }
}), {theming});