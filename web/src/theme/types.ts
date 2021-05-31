import {CSSProperties} from "react";
import {DeepPartial} from "../types";
import {DelityColorKeys, DelityColors} from "./colors";

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
    primary: DelityColorKeys;
    colors: DelityColors;
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

export interface CommonProps {
    className?: string;
    style?: CSSProperties;
    colorScheme?: DelityColorScheme;
}