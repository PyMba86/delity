import {Theme, theming} from "../../theme";
import {createUseStyles} from "react-jss";
import {HEADER_HEIGHT} from "../AppHeader/AppHeader.styles";

export default createUseStyles((theme: Theme) => ({
    layout: {
    },
    main: {
        scrollMarginTop: HEADER_HEIGHT,
        flex: 1,
        paddingTop: HEADER_HEIGHT - theme.spacing.xl - 2,
        paddingBottom: theme.spacing.xl * 2
    },
    content: {
        minHeight: 'calc(100vh - 280px)'
    }
}), {theming});