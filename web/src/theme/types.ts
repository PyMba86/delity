import {CSSProperties} from "react";
import {DeepPartial} from "../types";
import {ThemeColorKeys, ThemeColors} from "./colors";
import {Breakpoints} from "./breakpoints";

export type ThemeSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export type ThemeNumberSize = ThemeSize | number;

type HeadingStyle = {
    readonly fontSize: CSSProperties['fontSize'];
    readonly lineHeight: CSSProperties['lineHeight'];
}

export type ThemeSizes = Record<ThemeSize, number>;

export type ThemeColorScheme = 'light' | 'dark';

export interface Theme {

    colorScheme: ThemeColorScheme;
    white: string;
    black: string;
    primary: ThemeColorKeys;
    colors: ThemeColors;
    fontFamily: CSSProperties['fontFamily'];
    lineHeight: CSSProperties['lineHeight'];
    fontFamilyMonospace: CSSProperties['fontFamily'];

    fontSizes: ThemeSizes;
    radius: ThemeSizes;
    spacing: ThemeSizes;
    shadows: Record<ThemeSize, string>;

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
    },

    transitionTimingFunction: CSSProperties['transitionTimingFunction'];

    breakpoints: Breakpoints;
}

export type ThemeOverride = DeepPartial<Theme>;

export interface CommonProps {
    className?: string;
    style?: CSSProperties;
    colorScheme?: ThemeColorScheme;
}