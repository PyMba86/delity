import {createMemoStyles, Theme, ThemeSize} from "../../theme";
import {getSizeValue} from "../../utils/theme/getSizeValue";

interface FormSpacerStylesProps {
    theme: Theme;
    size: ThemeSize;
}

export default createMemoStyles({
    spacer: ({theme, size}: FormSpacerStylesProps) => ({
        marginTop: getSizeValue({size, sizes: theme.spacing})
    })
})