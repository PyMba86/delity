import {DelityTheme} from "../../theme";


export function getFocusStyles(theme: DelityTheme) {
    console.log(theme);
    return {
        '&:focus': {
            outline: 'none',
            boxShadow: `0 0 0 2px ${
                theme.colorScheme === 'dark' ? theme.colors.dark[9] : theme.white
            }, 0 0 0 4px ${theme.colors[theme.primary][theme.colorScheme === 'dark' ? 7 : 5]}`
        },

        '&:focus:not(:focus-visible)': {
            boxShadow: 'none'
        }
    }
}