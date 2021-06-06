import {Theme} from "../../theme";
import {CSSProperties} from "react";

export function getFontStyles(theme: Theme): CSSProperties {
    return {
        WebkitFontSmoothing: 'antialiased',
        MozOsxFontSmoothing: 'grayscale',
        fontFamily: theme.fontFamily || 'sans-serif',
        boxSizing: 'border-box',
        WebkitTextSizeAdjust: '100%',
    }
}