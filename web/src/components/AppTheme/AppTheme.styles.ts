import {createMemoStyles, DelityTheme} from "../../theme";
import {getFontStyles} from "../../utils/theme/getFontStyles";

export default createMemoStyles((theme: DelityTheme) => ({
    '@global': {
        body: {
            ...getFontStyles(theme),
            backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
            color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,
            lineHeight: theme.lineHeight,
            margin: 0
        },
        '*, *::before, *::after': {
            boxSizing: 'inherit',
        },
    }
}))