import {createMemoStyles, Theme, ThemeNumberSize} from "../../theme";
import {ThemeBreakpoint} from "../../theme/breakpoints";
import {getSizeValue} from "../../utils/theme/getSizeValue";

interface ContainerStylesProps {
    size?: ThemeBreakpoint;
    theme: Theme;
    padding?: ThemeNumberSize;
}

export default createMemoStyles({
    container: ({size, padding, theme}: ContainerStylesProps) => ({
        maxWidth: size ? theme.breakpoints.width(size) : '100%',
        width: '100%',
        marginLeft: 'auto',
        marginRight: 'auto',
        paddingLeft: getSizeValue(
            {size: padding, sizes: theme.spacing}),
        paddingRight: getSizeValue(
            {size: padding, sizes: theme.spacing})
    })
})