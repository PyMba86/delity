import {createUseStyles} from "react-jss";
import {Theme, theming} from "../../../theme";

export default createUseStyles((theme: Theme) => ({
    mainPanel: {
        [theme.breakpoints.down("sm")]: {
            padding: theme.spacing.md
        },
        background: theme.colorScheme === 'dark'
            ? theme.colors.dark[8] : theme.colors.gray[0],
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        justifyContent: "center",
        padding: theme.spacing.sm,
        width: "100%"
    },
    mainPanelContent: {
        [theme.breakpoints.up("xs")]: {
            width: "100%"
        },
        [theme.breakpoints.up("sm")]: {
            width: 328
        },
        [theme.breakpoints.up(1440)]: {
            width: 464
        },
        margin: "auto",
        width: "100%"
    },
    root: {
        [theme.breakpoints.up("lg")]: {
            gridTemplateColumns: "376px 1fr"
        },
        [theme.breakpoints.up(1440)]: {
            gridTemplateColumns: "520px 1fr"
        },
        display: "grid",
        gridTemplateColumns: "1fr",
        height: "100vh",
        overflow: "hidden",
        width: "100vw"
    },
    sidebar: {
        [theme.breakpoints.up("lg")]: {
            display: "block"
        },
        display: "none",
        background: theme.colorScheme === 'dark'
            ? theme.colors.dark[7] : theme.colors.gray[3],
    },
}), {theming});