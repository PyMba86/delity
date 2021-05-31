import {DelityTheme} from "../../theme";
import {CSSProperties} from "react";

export function getFontStyles(theme: DelityTheme): CSSProperties {
    return {
        WebkitFontSmoothing: 'antialiased',
        MozOsxFontSmoothing: 'grayscale',
        fontFamily: theme.fontFamily || 'sans-serif'
    }
}