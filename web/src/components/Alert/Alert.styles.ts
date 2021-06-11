import {ThemeColorKeys} from "../../theme/colors";
import {createMemoStyles, Theme} from "../../theme";
import {getThemeColor} from "../../utils/theme/getThemeColor";
import {getFontStyles} from "../../utils/theme/getFontStyles";


interface AlertStylesProps {
    color?: ThemeColorKeys;
    theme: Theme;
}

const LINE_WIDTH = 4;

export default createMemoStyles({
    alert: ({color, theme}: AlertStylesProps) => ({
        position: 'relative',
        padding: [theme.spacing.xs, theme.spacing.md],
        paddingLeft: theme.spacing.md + theme.spacing.xs / 2 + LINE_WIDTH,
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.white,
        border: `1px solid ${
            theme.colorScheme === 'dark'
                ? theme.colors.dark[6] : theme.colors.gray[2]}`,

        '&::before': {
            content: '""',
            display: 'block',
            position: 'absolute',
            top: theme.spacing.xs,
            bottom: theme.spacing.xs,
            left: theme.spacing.xs,
            width: LINE_WIDTH,
            borderRadius: LINE_WIDTH,
            backgroundColor: getThemeColor({
                theme,
                color,
                shade: theme.colorScheme === 'dark' ? 4 : 6
            })
        }
    }),

    label: ({color, theme}: AlertStylesProps) => ({
        boxSizing: 'border-box',
        color: getThemeColor({
            theme,
            color,
            shade: theme.colorScheme === 'dark' ? 4 : 6
        }),
        margin: 0,
        marginBottom: theme.spacing.xs / 2,
        textOverflow: 'ellipsis',
        overflow: 'hidden'
    }),

    body: ({theme}: AlertStylesProps) => ({
        ...getFontStyles(theme),
        lineHeight: theme.lineHeight,
        borderBottomLeftRadius: theme.spacing.sm,
        borderBottomRightRadius: theme.radius.sm,
        textOverflow: 'ellipsis',
        overflow: 'hidden',
        fontSize: theme.fontSizes.sm,
        color: theme.colorScheme === 'dark'
            ? theme.colors.dark[0] : theme.black,

        '&:only-child': {
            borderTopRightRadius: theme.radius.sm,
            borderTopLeftRadius: theme.radius.sm
        }
    })
})