import {createUseStyles} from "react-jss";
import {Theme, theming} from "../../theme";
import {HEADER_HEIGHT} from "../AppHeader/AppHeader.styles";

export const SIDEBAR_WIDTH = 190;

export default createUseStyles(
    (theme: Theme) => ({
        sidebar: {
            boxSizing: 'border-box',
            backgroundColor: theme.colorScheme === 'dark'
                ? theme.colors.dark[8] : theme.colors.gray[0],
            zIndex: 5,
            top: 0,
            bottom: 0,
            left: 0,
            position: 'sticky',
            width: SIDEBAR_WIDTH,

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
            paddingBottom: theme.spacing.xl * 2,
            paddingTop: HEADER_HEIGHT + theme.spacing.xl
        }
    }),
    {theming}
);