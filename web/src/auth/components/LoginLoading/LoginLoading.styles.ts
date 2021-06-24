import {createUseStyles} from "react-jss";
import {Theme, theming} from "../../../theme";

export default createUseStyles((theme: Theme) => ({
    root: {
        background: theme.colorScheme === 'dark'
            ? theme.colors.dark[8] : theme.colors.gray[0],
        alignItems: "center",
        display: "flex",
        height: "100vh",
        justifyContent: "center"
    }
}), {theming});