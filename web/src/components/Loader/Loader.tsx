import {CommonProps, ThemeNumberSize, useTheme} from "../../theme";
import React from "react";
import {ThemeColorKeys} from "../../theme/colors";
import {getSizeValue} from "../../utils/theme/getSizeValue";
import {getThemeColor} from "../../utils/theme/getThemeColor";

export const LOADER_SIZES = {
    xs: 18,
    sm: 22,
    md: 36,
    lg: 44,
    xl: 58
};

export interface LoaderProps extends CommonProps, React.ComponentPropsWithoutRef<'svg'> {
    /** Define width of loader */
    size?: ThemeNumberSize;

    /** Loader color from theme */
    color?: ThemeColorKeys;
}

export function Loader(
    {
        color,
        size = 'md',
        colorScheme,
        ...props
    }: LoaderProps
) {

    const theme = useTheme(colorScheme);

    return (
        <svg
            width={`${getSizeValue({size, sizes: LOADER_SIZES})}px`}
            fill={getThemeColor({
                    theme, color, shade: theme.colorScheme === 'dark' ? 4 : 6
                }
            )}
            viewBox={"0 0 135 140"}
            xmlns={"http://www.w3.org/2000/svg"}
            role={"presentation"}
            {...props}>

            <rect y="10" width="15" height="120" rx="6">
                <animate
                    attributeName="height"
                    begin="0.5s"
                    dur="1s"
                    values="120;110;100;90;80;70;60;50;40;140;120"
                    calcMode="linear"
                    repeatCount="indefinite"
                />
                <animate
                    attributeName="y"
                    begin="0.5s"
                    dur="1s"
                    values="10;15;20;25;30;35;40;45;50;0;10"
                    calcMode="linear"
                    repeatCount="indefinite"
                />
            </rect>
            <rect x="30" y="10" width="15" height="120" rx="6">
                <animate
                    attributeName="height"
                    begin="0.25s"
                    dur="1s"
                    values="120;110;100;90;80;70;60;50;40;140;120"
                    calcMode="linear"
                    repeatCount="indefinite"
                />
                <animate
                    attributeName="y"
                    begin="0.25s"
                    dur="1s"
                    values="10;15;20;25;30;35;40;45;50;0;10"
                    calcMode="linear"
                    repeatCount="indefinite"
                />
            </rect>
            <rect x="60" width="15" height="140" rx="6">
                <animate
                    attributeName="height"
                    begin="0s"
                    dur="1s"
                    values="120;110;100;90;80;70;60;50;40;140;120"
                    calcMode="linear"
                    repeatCount="indefinite"
                />
                <animate
                    attributeName="y"
                    begin="0s"
                    dur="1s"
                    values="10;15;20;25;30;35;40;45;50;0;10"
                    calcMode="linear"
                    repeatCount="indefinite"
                />
            </rect>
            <rect x="90" y="10" width="15" height="120" rx="6">
                <animate
                    attributeName="height"
                    begin="0.25s"
                    dur="1s"
                    values="120;110;100;90;80;70;60;50;40;140;120"
                    calcMode="linear"
                    repeatCount="indefinite"
                />
                <animate
                    attributeName="y"
                    begin="0.25s"
                    dur="1s"
                    values="10;15;20;25;30;35;40;45;50;0;10"
                    calcMode="linear"
                    repeatCount="indefinite"
                />
            </rect>
            <rect x="120" y="10" width="15" height="120" rx="6">
                <animate
                    attributeName="height"
                    begin="0.5s"
                    dur="1s"
                    values="120;110;100;90;80;70;60;50;40;140;120"
                    calcMode="linear"
                    repeatCount="indefinite"
                />
                <animate
                    attributeName="y"
                    begin="0.5s"
                    dur="1s"
                    values="10;15;20;25;30;35;40;45;50;0;10"
                    calcMode="linear"
                    repeatCount="indefinite"
                />
            </rect>
        </svg>
    )
}