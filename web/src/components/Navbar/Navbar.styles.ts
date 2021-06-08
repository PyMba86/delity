import {createUseStyles} from "react-jss";
import {Theme, theming} from "../../theme";
import {HEADER_HEIGHT} from "../AppHeader/AppHeader.styles";

export const NAVBAR_WIDTH = 260;

export default createUseStyles(
    (theme: Theme) => ({
        navbar: {
            boxSizing: 'border-box',
            backgroundColor: theme.colorScheme === 'dark'
                ? theme.colors.dark[8] : theme.colors.gray[0],
            zIndex: 5,
            top: 0,
            bottom: 0,
            left: 0,
            width: NAVBAR_WIDTH,

            [theme.breakpoints.down("sm")]: {
                display: 'none',
            },
        },

        opened: {
            [theme.breakpoints.down("sm")]: {
                display: 'block',
                width: '100%',
                right: 0,
            },
        },

        body: {
            paddingRight: theme.spacing.md,
            paddingBottom: theme.spacing.xl * 2,
            paddingLeft: theme.spacing.md,
            paddingTop: HEADER_HEIGHT + theme.spacing.md,

            [theme.breakpoints.down("sm")]: {
                paddingBottom: 120,
            },
        }
    }),
    {theming}
);