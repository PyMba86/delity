import {CSSProperties} from "react";
import {DeepPartial, Tuple} from "../types";

export type DelitySize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export type DelityNumberSize = DelitySize | number;

type HeadingStyle = {
    readonly fontSize: CSSProperties['fontSize'];
    readonly lineHeight: CSSProperties['lineHeight'];
}

export type DelitySizes = Record<DelitySize, number>;

export type DelityColorScheme = 'light' | 'dark';

export interface DelityTheme {

    colorScheme: DelityColorScheme;
    white: string;
    black: string;
    colors: Record<string, Tuple<string, 10>>;
    fontFamily: CSSProperties['fontFamily'];
    lineHeight: CSSProperties['lineHeight'];
    fontFamilyMonospace: CSSProperties['fontFamily'];
    fontSizes: DelitySizes;
    radius: DelitySizes;
    spacing: DelitySizes;
    shadows: Record<DelitySize, string>;

    headings: {
        fontFamily: CSSProperties['fontFamily'];
        fontWeight: CSSProperties['fontWeight'];

        sizes: {
            h1: HeadingStyle;
            h2: HeadingStyle;
            h3: HeadingStyle;
            h4: HeadingStyle;
            h5: HeadingStyle;
            h6: HeadingStyle;
        }
    }
}

export type DelityThemeOverride = DeepPartial<DelityTheme>;