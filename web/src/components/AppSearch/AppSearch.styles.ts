import {createUseStyles} from "react-jss";
import {theming} from "../../theme";

export default createUseStyles({
    wrapper: {
        flex: 1,
        maxWidth: 480,
        position: 'relative',
    },
    input: {
        position: 'relative',
        zIndex: 2,
    },
}, {theming});