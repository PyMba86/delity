import {Theme, theming} from "../../theme";
import {getFontStyles} from "../../utils/theme/getFontStyles";
import {createUseStyles} from "react-jss";

export default createUseStyles((theme: Theme) => ({
    '@global': {
        body: {
            ...getFontStyles(theme),
            backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
            color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,
            lineHeight: theme.lineHeight,
            margin: 0
        },
        '*, *::before, *::after': {
            boxSizing: 'inherit',
        },
    }
}),  { theming })