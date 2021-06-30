import {Theme, theming} from "../../theme";
import {createUseStyles} from "react-jss";
import {HEADER_HEIGHT} from "../AppHeader/AppHeader.styles";

export default createUseStyles((theme: Theme) => ({
    layout: {},
    main: {
        scrollMarginTop: HEADER_HEIGHT,
        flex: 1,
        marginTop: HEADER_HEIGHT,
        marginBottom: theme.spacing.xl * 2,
        paddingTop: theme.spacing.lg,
        paddingBottom: theme.spacing.md
    },
    content: {
        minHeight: 'calc(100vh - 280px)'
    },
    container: {
        display: 'grid',
        gap: '1rem',
        [theme.breakpoints.up("sm")]: {
            gridTemplateColumns: "1fr 5fr"
        },
        gridTemplateColumns: "1fr"
    }
}), {theming});