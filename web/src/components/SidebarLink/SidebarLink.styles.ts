import {createUseStyles} from 'react-jss';
import {Theme, theming} from "../../theme";
import {getFocusStyles} from "../../utils/theme";
import {getThemeColor} from "../../utils/theme/getThemeColor";

export default createUseStyles(
    (theme: Theme) => ({
        mainLink: {
            ...getFocusStyles(theme),
            display: 'flex',
            alignItems: 'center',
            textDecoration: 'none',
            color: theme.colorScheme === 'dark'
                ? theme.colors.dark[1] : theme.colors.gray[7],
            fontWeight: 500,
            fontSize: theme.fontSizes.sm,
            padding: 8,
            borderRadius: theme.radius.sm,
            userSelect: 'none',

            '&:hover': {
                backgroundColor: theme.colorScheme === 'dark' ? 'transparent' :
                    getThemeColor({
                        theme,
                        color: 'gray',
                        shade: 1
                    })
            }
        },

        active: {
            color: theme.colorScheme === 'dark'
                ? theme.white : theme.black,
            backgroundColor: theme.colorScheme === 'dark'
                ? theme.colors.dark[6] : theme.white,
        },

        body: {
            marginLeft: theme.spacing.xs,
        },
        icon: {
            width: 20,
            height: 20
        }
    }),
    {theming}
);